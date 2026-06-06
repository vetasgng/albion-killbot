const path = require("node:path");
const { assetsPath, loadImage } = require("../canvas");

const BACKGROUND_SOURCE_WIDTH = 1600;
const BACKGROUND_SOURCE_HEIGHT = 1350;
const TOP_CAP = 80;
const BOTTOM_CAP_START = 1347;
const BOTTOM_CAP_HEIGHT = BACKGROUND_SOURCE_HEIGHT - BOTTOM_CAP_START;
const MIDDLE_SOURCE_HEIGHT = BOTTOM_CAP_START - TOP_CAP;

const drawEventBackground = async (ctx, width, height) => {
  const img = await loadImage(path.join(assetsPath, "background.png"));
  const middleHeight = height - TOP_CAP - BOTTOM_CAP_HEIGHT;

  ctx.drawImage(img, 0, 0, BACKGROUND_SOURCE_WIDTH, TOP_CAP, 0, 0, width, TOP_CAP);
  ctx.drawImage(img, 0, TOP_CAP, BACKGROUND_SOURCE_WIDTH, MIDDLE_SOURCE_HEIGHT, 0, TOP_CAP, width, middleHeight);
  ctx.drawImage(
    img,
    0,
    BOTTOM_CAP_START,
    BACKGROUND_SOURCE_WIDTH,
    BOTTOM_CAP_HEIGHT,
    0,
    TOP_CAP + middleHeight,
    width,
    BOTTOM_CAP_HEIGHT,
  );
};

module.exports = {
  drawEventBackground,
};
