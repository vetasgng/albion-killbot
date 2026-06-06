const moment = require("moment");
const path = require("node:path");
const { digitsFormatter } = require("../../../helpers/utils");
const { assetsPath, drawImage } = require("../canvas");
const { applyInfoTextStyle } = require("../theme/textStyles");

const drawIconStat = async (ctx, { icon, text, x, y, iconSize, styleType = "statValue" }) => {
  ctx.beginPath();
  applyInfoTextStyle(ctx, styleType);
  const textWidth = ctx.measureText(text).width;
  const textHeight = ctx.measureText("M").width;
  await drawImage(ctx, path.join(assetsPath, icon), x - iconSize / 2, y, iconSize, iconSize);
  ctx.strokeText(text, x - textWidth / 2, y + iconSize + textHeight + 15);
  ctx.fillText(text, x - textWidth / 2, y + iconSize + textHeight + 15);
  ctx.closePath();
};

const drawTimestamp = async (ctx, event, x, y, { iconSize = 75 } = {}) => {
  const timestamp = moment.utc(event.TimeStamp).format("YYYY.MM.DD HH:mm");
  await drawIconStat(ctx, { icon: "time.png", text: timestamp, x, y, iconSize, styleType: "statTimestamp" });
};

const drawFame = async (ctx, event, x, y, { iconSize = 100 } = {}) => {
  const fame = digitsFormatter(event.TotalVictimKillFame);
  await drawIconStat(ctx, { icon: "fame.png", text: fame, x, y, iconSize });
};

const drawLootValue = async (ctx, lootValue, x, y, { iconSize = 100, splitLootValue } = {}) => {
  const lootSum = splitLootValue ? lootValue.equipment : lootValue.equipment + lootValue.inventory;
  if (!lootSum) return;

  const lootValueText = digitsFormatter(lootSum);
  await drawIconStat(ctx, { icon: "lootValue.png", text: lootValueText, x, y, iconSize });
};

const drawAssistCount = async (ctx, assistCount, x, y, { iconSize = 100 } = {}) => {
  const assistCountText = digitsFormatter(assistCount);
  await drawIconStat(ctx, { icon: "assists.png", text: assistCountText, x, y, iconSize });
};

module.exports = {
  drawTimestamp,
  drawFame,
  drawLootValue,
  drawAssistCount,
};
