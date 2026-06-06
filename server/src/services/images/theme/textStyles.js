const { STROKE_COLORS, INFO_TEXT_COLORS } = require("./colors");

/** Canvas text styles keyed by information type. Override font or lineWidth per context when needed. */
const INFO_TEXT_STYLES = {
  guildAlliance: {
    fill: INFO_TEXT_COLORS.guildAlliance,
    font: "33px Roboto",
    stroke: STROKE_COLORS.text,
    lineWidth: 2,
  },
  playerName: {
    fill: INFO_TEXT_COLORS.playerName,
    font: "33px Roboto",
    stroke: STROKE_COLORS.text,
    lineWidth: 2,
  },
  itemPower: {
    fill: INFO_TEXT_COLORS.itemPower,
    font: "33px Roboto",
    stroke: STROKE_COLORS.text,
    lineWidth: 2,
  },
  damageDone: {
    fill: INFO_TEXT_COLORS.damageDone,
    font: "bold 33px Roboto",
    stroke: STROKE_COLORS.text,
    lineWidth: 2,
  },
  healingDone: {
    fill: INFO_TEXT_COLORS.healingDone,
    font: "bold 33px Roboto",
    stroke: STROKE_COLORS.text,
    lineWidth: 2,
  },
  sectionSeparator: {
    fill: INFO_TEXT_COLORS.sectionSeparator,
    font: "33px Roboto",
    stroke: STROKE_COLORS.text,
    lineWidth: 2,
  },
  sectionTitle: {
    fill: INFO_TEXT_COLORS.sectionTitle,
    font: "28px Roboto",
    stroke: STROKE_COLORS.text,
    lineWidth: 2,
  },
  statValue: {
    fill: INFO_TEXT_COLORS.statValue,
    font: "40px Roboto",
    stroke: STROKE_COLORS.text,
    lineWidth: 4,
  },
  statTimestamp: {
    fill: INFO_TEXT_COLORS.statTimestamp,
    font: "35px Roboto",
    stroke: STROKE_COLORS.text,
    lineWidth: 4,
  },
  overlay: {
    fill: INFO_TEXT_COLORS.overlay,
    font: "30px Roboto",
    stroke: STROKE_COLORS.text,
    lineWidth: 2,
  },
};

const applyInfoTextStyle = (ctx, type, overrides = {}) => {
  const style = INFO_TEXT_STYLES[type];
  ctx.font = overrides.font ?? style.font;
  ctx.fillStyle = overrides.fill ?? style.fill;
  ctx.strokeStyle = overrides.stroke ?? style.stroke;
  ctx.lineWidth = overrides.lineWidth ?? style.lineWidth;
};

const drawInfoText = (ctx, type, text, x, y, overrides = {}) => {
  applyInfoTextStyle(ctx, type, overrides);
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
  return x + ctx.measureText(text).width;
};

module.exports = {
  INFO_TEXT_STYLES,
  applyInfoTextStyle,
  drawInfoText,
};
