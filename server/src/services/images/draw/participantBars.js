const path = require("node:path");
const { assetsPath, loadImage } = require("../canvas");

const PARTICIPANT_BAR_TYPE = {
  DAMAGE: "DAMAGE",
  HEALING: "HEALING",
};

const PARTICIPANT_BAR_TYPES = {
  [PARTICIPANT_BAR_TYPE.DAMAGE]: {
    label: "Damage",
    getValue: (participant) => participant.DamageDone,
    colors: ["#730b0b", "#7e3400", "#835400", "#817306", "#79902c", "#6aad56", "#4fc987", "#00e3bf"],
  },
  [PARTICIPANT_BAR_TYPE.HEALING]: {
    label: "Healing",
    getValue: (participant) => participant.SupportHealingDone,
    colors: ["#1a6638", "#33a855", "#56c96a", "#5ed4a8", "#3ecfb0", "#2ab8c9", "#3a9fd9", "#4a78d4"],
  },
};

const getActiveParticipants = (participants, type) => {
  const { getValue } = PARTICIPANT_BAR_TYPES[type];
  return participants.filter((participant) => getValue(participant) > 0);
};

const drawParticipantBar = async (ctx, participants, x, y, width, height, radius, type) => {
  const { label, getValue, colors } = PARTICIPANT_BAR_TYPES[type];
  const activeParticipants = getActiveParticipants(participants, type);
  if (activeParticipants.length === 0) return;

  let px = x;
  let py = y;

  ctx.font = "28px Roboto";
  ctx.fillStyle = "#EEEEEE";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
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

  ctx.strokeStyle = "#111111";
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.clip();

  const totalValue = activeParticipants.reduce((sum, participant) => sum + getValue(participant), 0);

  activeParticipants.forEach((participant, i) => {
    const value = getValue(participant);
    const valuePercent = (value / totalValue) * 100;
    const color = colors[i % colors.length];
    const barWidth = Math.round((valuePercent / 100) * width);
    ctx.beginPath();
    ctx.rect(px, py, barWidth, height);
    ctx.fillStyle = color;
    ctx.fill();

    if (barWidth > 50) {
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.font = "26px Roboto";
      const barText = Math.round(valuePercent) + "%";
      const barTextWidth = ctx.measureText(barText).width;
      const barTextX = px + barWidth / 2 - barTextWidth / 2;
      const barTextY = py + height / 2 + 9;
      ctx.strokeText(barText, barTextX, barTextY);
      ctx.fillText(barText, barTextX, barTextY);
    }

    ctx.closePath();
    px += barWidth;
  });

  const barGradient = ctx.createLinearGradient(x + width / 2, py, x + width / 2, py + height);
  barGradient.addColorStop(0, "rgba(200, 200, 200, 0.5)");
  barGradient.addColorStop(0.15, "rgba(200, 200, 200, 0.25)");
  barGradient.addColorStop(0.5, "rgba(100, 100, 100, 0.15)");
  barGradient.addColorStop(0.85, "rgba(100, 100, 100, 0.1)");
  barGradient.addColorStop(1, "rgba(0, 0, 0, 0.25)");

  ctx.beginPath();
  ctx.rect(x, py, width, height);
  ctx.fillStyle = barGradient;
  ctx.fill();
  ctx.closePath();

  ctx.restore();

  const swatchSize = 35;
  px = x;
  py += height + 15;
  activeParticipants.forEach((participant, i) => {
    const color = colors[i % colors.length];
    const text = `${participant.Name} [${Math.round(participant.AverageItemPower)}]`;

    ctx.beginPath();
    ctx.font = "22px Roboto";
    const captionWidth = ctx.measureText(text).width;

    if (px + swatchSize + 10 + captionWidth + 20 > x + width) {
      px = x;
      py += 38;
    }
    ctx.rect(px, py, swatchSize, swatchSize);

    ctx.fillStyle = color;
    ctx.fill();

    ctx.strokeStyle = "#111111";
    ctx.lineWidth = 3;
    ctx.stroke();

    px += swatchSize + 10;

    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    ctx.strokeText(text, px, py + 24);
    ctx.fillText(text, px, py + 24);
    px += captionWidth;

    px += 20;
  });

  return height + py;
};

const drawParticipantBars = async (ctx, participants, canvasWidth, y, { margin, gap, height, radius }) => {
  const fullWidth = canvasWidth - margin * 2;
  const activeTypes = [PARTICIPANT_BAR_TYPE.DAMAGE, PARTICIPANT_BAR_TYPE.HEALING].filter(
    (type) => getActiveParticipants(participants, type).length > 0,
  );
  if (activeTypes.length === 0) return;

  const barWidth = activeTypes.length === 1 ? fullWidth : (fullWidth - gap) / 2;

  for (let i = 0; i < activeTypes.length; i++) {
    await drawParticipantBar(
      ctx,
      participants,
      margin + i * (barWidth + gap),
      y,
      barWidth,
      height,
      radius,
      activeTypes[i],
    );
  }
};

module.exports = {
  drawParticipantBars,
};
