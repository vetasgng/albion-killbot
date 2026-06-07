const path = require("node:path");
const { createCanvas } = require("canvas");
const { optimizeImage } = require("../../../helpers/images");
const { fileSizeFormatter } = require("../../../helpers/utils");
const logger = require("../../../helpers/logger");
const { memoize } = require("../../../helpers/cache");
const { SECOND } = require("../../../helpers/constants");
const { assetsPath, drawImage } = require("../canvas");
const { getInventorySectionHeight, drawInventorySection } = require("../draw/inventory");

async function generateInventoryImage(event, { splitLootValue = false } = {}) {
  return memoize(
    `eventVictimInventoryImage-${event.EventId}`,
    async () => {
      const inventory = event.Victim.Inventory.filter((i) => i != null);
      const sectionHeight = getInventorySectionHeight(inventory, { splitLootValue, lootValue: event.lootValue });

      let canvas = createCanvas(1600, sectionHeight);
      const ctx = canvas.getContext("2d");

      await drawImage(ctx, path.join(assetsPath, "background.png"), 0, 0);
      await drawInventorySection(ctx, inventory, 0, { splitLootValue, lootValue: event.lootValue });

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
