const path = require("node:path");
const { createCanvas } = require("canvas");
const { optimizeImage } = require("../../../helpers/images");
const { digitsFormatter, fileSizeFormatter } = require("../../../helpers/utils");
const logger = require("../../../helpers/logger");
const { memoize } = require("../../../helpers/cache");
const { SECOND } = require("../../../helpers/constants");
const { assetsPath, drawImage } = require("../canvas");
const { drawItem } = require("../draw/items");
const { applyInfoTextStyle } = require("../theme/textStyles");

async function generateInventoryImage(event, { splitLootValue = false } = {}) {
  return memoize(
    `eventVictimInventoryImage-${event.EventId}`,
    async () => {
      const inventory = event.Victim.Inventory.filter((i) => i != null);
      const hasInventoryLootValue = splitLootValue && event.lootValue && event.lootValue.inventory;

      const BLOCK_SIZE = 130;
      const WIDTH = 1600;
      const PADDING = 20;

      let x = PADDING;
      let y = PADDING;
      const itemsPerRow = Math.floor((WIDTH - PADDING * 2) / BLOCK_SIZE);
      const rows = Math.ceil(inventory.length / itemsPerRow);

      let canvas = createCanvas(WIDTH, rows * BLOCK_SIZE + PADDING * 2 + (hasInventoryLootValue ? 35 : 0));
      const w = canvas.width;
      const ctx = canvas.getContext("2d");

      await drawImage(ctx, path.join(assetsPath, "background.png"), 0, 0);

      for (const item of inventory) {
        if (!item) continue;

        if (x + BLOCK_SIZE > WIDTH - PADDING) {
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
        const lootValueText = digitsFormatter(event.lootValue.inventory);
        const lootValueTextWidth = ctx.measureText(lootValueText).width;
        const lootValueLineHeight = ctx.measureText("M").width;
        const lootValueIconSize = 45;

        await drawImage(
          ctx,
          path.join(assetsPath, "lootValue.png"),
          w - PADDING * 2 - lootValueIconSize - PADDING * 0.5 - lootValueTextWidth,
          y,
          lootValueIconSize,
          lootValueIconSize,
        );

        ctx.strokeText(lootValueText, w - PADDING * 2 - lootValueTextWidth, y + lootValueLineHeight * 1.1);
        ctx.fillText(lootValueText, w - PADDING * 2 - lootValueTextWidth, y + lootValueLineHeight * 1.1);
      }

      const buffer = await optimizeImage(canvas.toBuffer(), 900);
      canvas = null;

      if (buffer.length > 1048576) {
        logger.warn(`Event image bigger than usual. Size: ${fileSizeFormatter(buffer.length)}`);
      }
      return buffer;
    },
    {
      timeout: 60 * SECOND,
    },
  );
}

module.exports = {
  generateInventoryImage,
};
