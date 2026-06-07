const path = require("node:path");
const { digitsFormatter } = require("../../../helpers/utils");
const { assetsPath, drawImage } = require("../canvas");
const { drawItem } = require("./items");
const { applyInfoTextStyle } = require("../theme/textStyles");

const BLOCK_SIZE = 130;
const CANVAS_WIDTH = 1600;
const PADDING = 20;

function getInventorySectionHeight(inventory, { splitLootValue = false, lootValue } = {}) {
  if (!inventory.length) return 0;

  const hasInventoryLootValue = splitLootValue && lootValue && lootValue.inventory;
  const itemsPerRow = Math.floor((CANVAS_WIDTH - PADDING * 2) / BLOCK_SIZE);
  const rows = Math.ceil(inventory.length / itemsPerRow);

  return rows * BLOCK_SIZE + PADDING * 2 + (hasInventoryLootValue ? 35 : 0);
}

async function drawInventorySection(ctx, inventory, startY, { splitLootValue = false, lootValue } = {}) {
  if (!inventory.length) return;

  const hasInventoryLootValue = splitLootValue && lootValue && lootValue.inventory;

  let x = PADDING;
  let y = startY + PADDING;

  for (const item of inventory) {
    if (!item) continue;

    if (x + BLOCK_SIZE > CANVAS_WIDTH - PADDING) {
      x = PADDING;
      y += BLOCK_SIZE;
    }
    await drawItem(ctx, item, x, y, { size: BLOCK_SIZE });
    x += BLOCK_SIZE;
  }

  if (hasInventoryLootValue) {
    y += BLOCK_SIZE;

    ctx.beginPath();
    applyInfoTextStyle(ctx, "statValue", { font: "36px Roboto" });
    const lootValueText = digitsFormatter(lootValue.inventory);
    const lootValueTextWidth = ctx.measureText(lootValueText).width;
    const lootValueLineHeight = ctx.measureText("M").width;
    const lootValueIconSize = 45;

    await drawImage(
      ctx,
      path.join(assetsPath, "lootValue.png"),
      CANVAS_WIDTH - PADDING * 2 - lootValueIconSize - PADDING * 0.5 - lootValueTextWidth,
      y,
      lootValueIconSize,
      lootValueIconSize,
    );

    ctx.strokeText(lootValueText, CANVAS_WIDTH - PADDING * 2 - lootValueTextWidth, y + lootValueLineHeight * 1.1);
    ctx.fillText(lootValueText, CANVAS_WIDTH - PADDING * 2 - lootValueTextWidth, y + lootValueLineHeight * 1.1);
  }
}

module.exports = {
  BLOCK_SIZE,
  CANVAS_WIDTH,
  PADDING,
  getInventorySectionHeight,
  drawInventorySection,
};
