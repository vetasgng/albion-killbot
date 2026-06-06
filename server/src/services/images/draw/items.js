const path = require("node:path");
const { getItemFile } = require("../../../ports/albion");
const logger = require("../../../helpers/logger");
const { assetsPath, drawImage } = require("../canvas");

const drawItem = async (ctx, item, x, y, { size = 217, attunedPlayerName } = {}) => {
  if (!item) return await drawImage(ctx, path.join(assetsPath, "slot.png"), x, y, size, size);
  const itemImage = await getItemFile(item);

  if (!itemImage)
    logger.warn(`Missing item image: ${item.Type}_Q${item.Quality}`, {
      item,
    });
  await drawImage(ctx, itemImage, x, y, size, size);

  if (
    attunedPlayerName &&
    item.LegendarySoul?.attunedPlayerName &&
    item.LegendarySoul?.attunedPlayerName !== attunedPlayerName
  ) {
    const notAttunedSize = size / 3.5;
    await drawImage(
      ctx,
      path.join(assetsPath, "notAttuned.png"),
      x + size - notAttunedSize - size * 0.15,
      y + size * 0.15,
      notAttunedSize,
      notAttunedSize,
    );
  }

  ctx.save();
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.round(size / 40);
  ctx.font = `${Math.round(size / 7.5)}px Roboto`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeText(item.Count, x + size * 0.76, y + size * 0.73);
  ctx.fillText(item.Count, x + size * 0.76, y + size * 0.73);
  ctx.restore();
};

module.exports = {
  drawItem,
};
