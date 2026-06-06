const path = require("node:path");
const { digitsFormatter } = require("../../../helpers/utils");
const { assetsPath, loadImage, drawImage } = require("../canvas");
const {
  STROKE_COLORS,
  BAR_SEGMENT_COLORS,
  getContrastTextStyle,
  createParticipantBarGlossGradient,
} = require("../theme/colors");
const { applyInfoTextStyle, drawInfoText } = require("../theme/textStyles");

const PARTICIPANT_BAR_TYPE = {
  DAMAGE: "DAMAGE",
  HEALING: "HEALING",
};

const PARTICIPANT_BAR_TYPES = {
  [PARTICIPANT_BAR_TYPE.DAMAGE]: {
    label: "Damage",
    icon: "damage.png",
    valueStyleType: "damageDone",
    getValue: (participant) => participant.DamageDone,
    colors: BAR_SEGMENT_COLORS.damage,
  },
  [PARTICIPANT_BAR_TYPE.HEALING]: {
    label: "Healing",
    icon: "healing.png",
    valueStyleType: "healingDone",
    getValue: (participant) => participant.SupportHealingDone,
    colors: BAR_SEGMENT_COLORS.healing,
  },
};

const compareParticipantsByGuildId = (a, b) => {
  const guildIdA = a.GuildId || "";
  const guildIdB = b.GuildId || "";
  const hasGuildA = Boolean(guildIdA);
  const hasGuildB = Boolean(guildIdB);

  if (hasGuildA !== hasGuildB) {
    return hasGuildA ? -1 : 1;
  }

  return guildIdA.localeCompare(guildIdB);
};

const compareParticipantsByValue = (getValue) => (a, b) => {
  const valueDiff = getValue(b) - getValue(a);
  if (valueDiff !== 0) return valueDiff;
  return compareParticipantsByGuildId(a, b);
};

const getActiveParticipants = (participants, type) => {
  const { getValue } = PARTICIPANT_BAR_TYPES[type];
  return participants.filter((participant) => getValue(participant) > 0).sort(compareParticipantsByValue(getValue));
};

const BAR_LABEL_MIN_WIDTH = 40;
const BAR_LABEL_FONT = "bold 28px Roboto";
const BAR_LABEL_PILL_THRESHOLD = 70;

const drawRoundedRect = (ctx, rectX, rectY, rectWidth, rectHeight, rectRadius) => {
  ctx.beginPath();
  ctx.moveTo(rectX + rectRadius, rectY);
  ctx.lineTo(rectX + rectWidth - rectRadius, rectY);
  ctx.quadraticCurveTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + rectRadius);
  ctx.lineTo(rectX + rectWidth, rectY + rectHeight - rectRadius);
  ctx.quadraticCurveTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - rectRadius, rectY + rectHeight);
  ctx.lineTo(rectX + rectRadius, rectY + rectHeight);
  ctx.quadraticCurveTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - rectRadius);
  ctx.lineTo(rectX, rectY + rectRadius);
  ctx.quadraticCurveTo(rectX, rectY, rectX + rectRadius, rectY);
  ctx.closePath();
};

const drawBarSegmentLabel = (ctx, segment, barY, barHeight) => {
  const { barX, barWidth, color, valuePercent } = segment;
  if (barWidth < BAR_LABEL_MIN_WIDTH) return;

  const { fill, stroke, pill } = getContrastTextStyle(color);
  const barText = Math.round(valuePercent) + "%";

  ctx.font = BAR_LABEL_FONT;
  const barTextWidth = ctx.measureText(barText).width;
  const barTextX = barX + barWidth / 2 - barTextWidth / 2;
  const barTextY = barY + barHeight / 2 + 10;

  if (barWidth <= BAR_LABEL_PILL_THRESHOLD) {
    const pillPaddingX = 8;
    const pillPaddingY = 4;
    const pillWidth = barTextWidth + pillPaddingX * 2;
    const pillHeight = 28 + pillPaddingY * 2;
    const pillX = barX + barWidth / 2 - pillWidth / 2;
    const pillY = barY + barHeight / 2 - pillHeight / 2 + 2;

    drawRoundedRect(ctx, pillX, pillY, pillWidth, pillHeight, pillHeight / 2);
    ctx.fillStyle = pill;
    ctx.fill();
  }

  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;
  ctx.strokeText(barText, barTextX, barTextY);
  ctx.fillText(barText, barTextX, barTextY);
};

const getParticipantCaptionSections = (participant) => {
  const sections = [];

  const guildLabel = participant.GuildName || "";
  if (participant.AllianceName) {
    const text = guildLabel ? `[${participant.AllianceName}] ${guildLabel}` : `[${participant.AllianceName}]`;
    sections.push({ parts: [{ type: "guildAlliance", text }] });
  } else if (guildLabel) {
    sections.push({ parts: [{ type: "guildAlliance", text: guildLabel }] });
  }

  const name = participant.Name || "";
  const itemPower = participant.AverageItemPower > 0 ? Math.round(participant.AverageItemPower) : null;
  const characterParts = [];
  if (name) {
    characterParts.push({ type: "playerName", text: name });
  }
  if (itemPower !== null) {
    characterParts.push({ type: "itemPower", text: `[${itemPower}]` });
  }
  if (characterParts.length > 0) {
    sections.push({ parts: characterParts });
  }

  return sections;
};

const CAPTION_ROW_HEIGHT = 42;
const CAPTION_TEXT_BASELINE_OFFSET = 32;
const CAPTION_SWATCH_SIZE = 35;
const CAPTION_SWATCH_GAP = 10;
const CAPTION_ICON_SIZE = 32;
const CAPTION_VALUE_GAP = 6;
const CAPTION_VALUE_MIN_GAP = 12;
const drawParticipantSwatch = (ctx, color, x, y) => {
  ctx.beginPath();
  ctx.rect(x, y, CAPTION_SWATCH_SIZE, CAPTION_SWATCH_SIZE);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = STROKE_COLORS.border;
  ctx.lineWidth = 3;
  ctx.stroke();
};

const measureCaptionValueWidth = (ctx, valueStyleType, valueText) => {
  applyInfoTextStyle(ctx, valueStyleType);
  return ctx.measureText(valueText).width;
};

const getCaptionRightBlockWidth = (ctx, valueStyleType, valueText) =>
  measureCaptionValueWidth(ctx, valueStyleType, valueText) + CAPTION_VALUE_GAP + CAPTION_ICON_SIZE;

const CAPTION_ELLIPSIS = "…";

const measureCaptionSectionsWidth = (ctx, sections) => {
  let width = 0;

  sections.forEach((section, sectionIndex) => {
    if (sectionIndex > 0) {
      applyInfoTextStyle(ctx, "sectionSeparator");
      width += ctx.measureText(" • ").width;
    }

    section.parts.forEach((part, partIndex) => {
      if (partIndex > 0) {
        applyInfoTextStyle(ctx, "sectionSeparator");
        width += ctx.measureText(" ").width;
      }
      applyInfoTextStyle(ctx, part.type);
      width += ctx.measureText(part.text).width;
    });
  });

  return width;
};

const cloneCaptionSections = (sections) =>
  sections.map((section) => ({
    parts: section.parts.map((part) => ({ ...part })),
  }));

const getTrimmableCaptionParts = (sections, trimmableTypes) => {
  const parts = [];
  sections.forEach((section) => {
    section.parts.forEach((part) => {
      if (trimmableTypes.has(part.type)) {
        parts.push(part);
      }
    });
  });
  return parts;
};

const shortenCaptionPart = (part) => {
  const text = part.text.endsWith(CAPTION_ELLIPSIS) ? part.text.slice(0, -CAPTION_ELLIPSIS.length) : part.text;
  if (text.length <= 1) return false;
  part.text = `${text.slice(0, -1)}${CAPTION_ELLIPSIS}`;
  return true;
};

const trimCaptionPartsUntilFit = (ctx, sections, maxWidth, trimmableTypes) => {
  const trimmableParts = getTrimmableCaptionParts(sections, trimmableTypes);
  while (measureCaptionSectionsWidth(ctx, sections) > maxWidth) {
    let widestPart = null;
    let widestWidth = 0;

    for (const part of trimmableParts) {
      applyInfoTextStyle(ctx, part.type);
      const partWidth = ctx.measureText(part.text).width;
      if (partWidth > widestWidth) {
        widestWidth = partWidth;
        widestPart = part;
      }
    }

    if (!widestPart || !shortenCaptionPart(widestPart)) break;
  }
};

const fitCaptionSections = (ctx, sections, maxWidth) => {
  const fittedSections = cloneCaptionSections(sections);
  if (measureCaptionSectionsWidth(ctx, fittedSections) <= maxWidth) return fittedSections;

  trimCaptionPartsUntilFit(ctx, fittedSections, maxWidth, new Set(["guildAlliance"]));
  trimCaptionPartsUntilFit(ctx, fittedSections, maxWidth, new Set(["playerName"]));

  return fittedSections;
};

const drawParticipantCaption = (ctx, participant, x, y, maxWidth) => {
  const sections = fitCaptionSections(ctx, getParticipantCaptionSections(participant), maxWidth);
  let cursorX = x;

  sections.forEach((section, sectionIndex) => {
    if (sectionIndex > 0) {
      cursorX = drawInfoText(ctx, "sectionSeparator", " • ", cursorX, y);
    }

    section.parts.forEach((part, partIndex) => {
      if (partIndex > 0) {
        cursorX = drawInfoText(ctx, "sectionSeparator", " ", cursorX, y);
      }
      cursorX = drawInfoText(ctx, part.type, part.text, cursorX, y);
    });
  });
};

const PARTICIPANT_BAR_LAYOUT = {
  margin: 35,
  gap: 30,
  height: 50,
  radius: 25,
};

const PARTICIPANT_BARS_BOTTOM_PADDING = 35;

const getParticipantBarsBottom = (participants, y, layout = PARTICIPANT_BAR_LAYOUT) => {
  const { height } = layout;
  const activeTypes = [PARTICIPANT_BAR_TYPE.DAMAGE, PARTICIPANT_BAR_TYPE.HEALING].filter(
    (type) => getActiveParticipants(participants, type).length > 0,
  );
  if (activeTypes.length === 0) return y;

  const captionStart = y + 18 + height + 15;
  let maxBottom = captionStart;

  for (const type of activeTypes) {
    const count = getActiveParticipants(participants, type).length;
    maxBottom = Math.max(maxBottom, captionStart + count * CAPTION_ROW_HEIGHT);
  }

  return maxBottom;
};

const drawParticipantBar = async (ctx, participants, x, y, width, height, radius, type) => {
  const { label, getValue, colors, icon, valueStyleType } = PARTICIPANT_BAR_TYPES[type];
  const activeParticipants = getActiveParticipants(participants, type);
  if (activeParticipants.length === 0) return;

  let px = x;
  let py = y;

  applyInfoTextStyle(ctx, "sectionTitle");
  const pw = ctx.measureText(label).width;
  const textX = px + width / 2 - pw / 2;
  ctx.strokeText(label, textX, py);
  ctx.fillText(label, textX, py);

  px = x;
  py += 18;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(px + radius, py);
  ctx.lineTo(px + width - radius, py);
  ctx.quadraticCurveTo(px + width, py, px + width, py + radius);
  ctx.lineTo(px + width, py + height - radius);
  ctx.quadraticCurveTo(px + width, py + height, px + width - radius, py + height);
  ctx.lineTo(px + radius, py + height);
  ctx.quadraticCurveTo(px, py + height, px, py + height - radius);
  ctx.lineTo(px, py + radius);
  ctx.quadraticCurveTo(px, py, px + radius, py);
  ctx.closePath();

  ctx.fillStyle = ctx.createPattern(await loadImage(path.join(assetsPath, "assistBarBg.png")), "repeat");
  ctx.fill();

  ctx.strokeStyle = STROKE_COLORS.border;
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.clip();

  const totalValue = activeParticipants.reduce((sum, participant) => sum + getValue(participant), 0);
  const segments = [];

  activeParticipants.forEach((participant, i) => {
    const value = getValue(participant);
    const valuePercent = (value / totalValue) * 100;
    const color = colors[i % colors.length];
    const segmentWidth = Math.round((valuePercent / 100) * width);

    ctx.beginPath();
    ctx.rect(px, py, segmentWidth, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    segments.push({ barX: px, barWidth: segmentWidth, color, valuePercent });
    px += segmentWidth;
  });

  const barGradient = createParticipantBarGlossGradient(ctx, x + width / 2, py, py + height);

  ctx.beginPath();
  ctx.rect(x, py, width, height);
  ctx.fillStyle = barGradient;
  ctx.fill();
  ctx.closePath();

  segments.forEach((segment) => drawBarSegmentLabel(ctx, segment, py, height));

  ctx.restore();

  px = x;
  py += height + 15;
  for (let i = 0; i < activeParticipants.length; i++) {
    const participant = activeParticipants[i];
    const color = colors[i % colors.length];
    const valueText = digitsFormatter(Math.round(getValue(participant)));
    const rightBlockWidth = getCaptionRightBlockWidth(ctx, valueStyleType, valueText);
    const captionMaxWidth = width - CAPTION_SWATCH_SIZE - CAPTION_SWATCH_GAP - rightBlockWidth - CAPTION_VALUE_MIN_GAP;

    const swatchY = py + (CAPTION_ROW_HEIGHT - CAPTION_SWATCH_SIZE) / 2;
    drawParticipantSwatch(ctx, color, px, swatchY);
    drawParticipantCaption(
      ctx,
      participant,
      px + CAPTION_SWATCH_SIZE + CAPTION_SWATCH_GAP,
      py + CAPTION_TEXT_BASELINE_OFFSET,
      captionMaxWidth,
    );

    const iconX = px + width - CAPTION_ICON_SIZE;
    const iconY = py + (CAPTION_ROW_HEIGHT - CAPTION_ICON_SIZE) / 2;
    await drawImage(ctx, path.join(assetsPath, icon), iconX, iconY, CAPTION_ICON_SIZE, CAPTION_ICON_SIZE);

    const valueWidth = measureCaptionValueWidth(ctx, valueStyleType, valueText);
    const valueX = iconX - CAPTION_VALUE_GAP - valueWidth;
    drawInfoText(ctx, valueStyleType, valueText, valueX, py + CAPTION_TEXT_BASELINE_OFFSET);

    py += CAPTION_ROW_HEIGHT;
  }

  return py;
};

const drawParticipantBars = async (ctx, participants, canvasWidth, y, layout = PARTICIPANT_BAR_LAYOUT) => {
  const { margin, gap, height, radius } = layout;
  const fullWidth = canvasWidth - margin * 2;
  const activeTypes = [PARTICIPANT_BAR_TYPE.DAMAGE, PARTICIPANT_BAR_TYPE.HEALING].filter(
    (type) => getActiveParticipants(participants, type).length > 0,
  );
  if (activeTypes.length === 0) return y;

  const barWidth = activeTypes.length === 1 ? fullWidth : (fullWidth - gap) / 2;
  let maxBottom = y;

  for (let i = 0; i < activeTypes.length; i++) {
    const bottom = await drawParticipantBar(
      ctx,
      participants,
      margin + i * (barWidth + gap),
      y,
      barWidth,
      height,
      radius,
      activeTypes[i],
    );
    maxBottom = Math.max(maxBottom, bottom);
  }

  return maxBottom;
};

module.exports = {
  PARTICIPANT_BAR_LAYOUT,
  PARTICIPANT_BARS_BOTTOM_PADDING,
  drawParticipantBars,
  getParticipantBarsBottom,
};
