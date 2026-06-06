const STROKE_COLORS = {
  text: "#000000",
  border: "#111111",
};

/** Fill colors keyed by information type shown on event/inventory images. */
const INFO_TEXT_COLORS = {
  guildAlliance: "#BBBBBB",
  playerName: "#FFFFFF",
  itemPower: "#AAAAAA",
  damageDone: "#FFAA77",
  healingDone: "#77DD99",
  sectionSeparator: "#555555",
  sectionTitle: "#EEEEEE",
  statValue: "#FFFFFF",
  statTimestamp: "#FFFFFF",
  overlay: "#FFFFFF",
};

const BAR_SEGMENT_COLORS = {
  damage: ["#730b0b", "#7e3400", "#835400", "#817306", "#79902c", "#6aad56", "#4fc987", "#00e3bf"],
  healing: ["#1a6638", "#33a855", "#56c96a", "#5ed4a8", "#3ecfb0", "#2ab8c9", "#3a9fd9", "#4a78d4"],
};

const BAR_COLORS = {
  trait: "#0dd621",
};

const PARTICIPANT_BAR_GLOSS_STOPS = [
  [0, "rgba(200, 200, 200, 0.3)"],
  [0.15, "rgba(200, 200, 200, 0.2)"],
  [0.5, "rgba(100, 100, 100, 0.12)"],
  [0.85, "rgba(100, 100, 100, 0.08)"],
  [1, "rgba(0, 0, 0, 0.2)"],
];

const getContrastTextStyle = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.55
    ? { fill: "#111111", stroke: "rgba(255, 255, 255, 0.85)", pill: "rgba(255, 255, 255, 0.55)" }
    : { fill: "#FFFFFF", stroke: "rgba(0, 0, 0, 0.75)", pill: "rgba(0, 0, 0, 0.45)" };
};

const createParticipantBarGlossGradient = (ctx, centerX, topY, bottomY) => {
  const gradient = ctx.createLinearGradient(centerX, topY, centerX, bottomY);
  for (const [stop, color] of PARTICIPANT_BAR_GLOSS_STOPS) {
    gradient.addColorStop(stop, color);
  }
  return gradient;
};

module.exports = {
  STROKE_COLORS,
  INFO_TEXT_COLORS,
  BAR_SEGMENT_COLORS,
  BAR_COLORS,
  getContrastTextStyle,
  createParticipantBarGlossGradient,
};
