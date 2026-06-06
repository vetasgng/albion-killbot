const path = require("node:path");
const { registerFont, loadImage } = require("canvas");
const logger = require("../../../helpers/logger");

const assetsPath = path.join(__dirname, "..", "..", "..", "assets");

registerFont(path.join(assetsPath, "fonts", "Roboto-Regular.ttf"), {
  family: "Roboto",
  weight: "Normal",
});

const drawImage = async (ctx, src, x, y, sw, sh) => {
  let img;
  try {
    if (!src) img = await loadImage(path.join(assetsPath, "notfound.png"));
    else img = await loadImage(src);
  } catch (error) {
    logger.error(`Error loading image: ${error.message}`, {
      src,
      error,
    });
    img = await loadImage(path.join(assetsPath, "notfound.png"));
  }
  if (sw && sh) ctx.drawImage(img, x, y, sw, sh);
  else ctx.drawImage(img, x, y);
};

module.exports = {
  assetsPath,
  drawImage,
  loadImage,
};
