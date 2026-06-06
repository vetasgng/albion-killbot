const config = require("config");
const path = require("node:path");
const { existsSync } = require("node:fs");
const { transformTrait } = require("../../../helpers/albion");
const { assetsPath, loadImage } = require("../canvas");
const { drawItem } = require("./items");
const { applyInfoTextStyle, drawInfoText } = require("../theme/textStyles");
const { BAR_COLORS } = require("../theme/colors");

const drawTrait = async (ctx, trait, x, y) => {
  const { name, type, value, unit, relativeValue } = transformTrait(trait);
  ctx.save();

  if (config.get("features.events.displayTraitIcons")) {
    const iconSrc = path.join(assetsPath, "traits", `${type}.png`);
    if (existsSync(iconSrc)) {
      const icon = await loadImage(iconSrc);
      ctx.drawImage(icon, x, y - 25, 50, 50);
    }
    x += 70;
  }

  applyInfoTextStyle(ctx, "overlay", {
    font: config.get("features.events.displayTraitIcons") ? "26px Roboto" : "30px Roboto",
  });
  ctx.strokeText(`+${value}${unit} ${name}`, x, y);
  ctx.fillText(`+${value}${unit} ${name}`, x, y);
  y += 20;

  const maxBarWidth = config.get("features.events.displayTraitIcons") ? 350 : 420;
  const barHeight = 10;
  ctx.fillStyle = ctx.createPattern(await loadImage(path.join(assetsPath, "assistBarBg.png")), "repeat");
  ctx.fillRect(x, y, maxBarWidth, barHeight);
  ctx.fillStyle = BAR_COLORS.trait;
  ctx.fillRect(x, y, relativeValue * maxBarWidth, barHeight);

  const barGradient = ctx.createLinearGradient(x + maxBarWidth / 2, y, x + maxBarWidth / 2, y + barHeight);
  barGradient.addColorStop(0, "rgba(255, 255, 255, 0.85)");
  barGradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
  barGradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
  ctx.fillStyle = barGradient;
  ctx.fillRect(x, y, relativeValue * maxBarWidth, barHeight);

  ctx.restore();
};

const drawAwakening = async (ctx, weapon, x, y, { size = 145, attunedPlayerName } = {}) => {
  x += 30;
  await drawItem(ctx, weapon, x, y + 60, { size, attunedPlayerName });

  x += size + 15;
  y += 40;

  if (weapon.LegendarySoul.traits.length === 0) {
    drawInfoText(ctx, "overlay", "<No traits>", x + 100, y + 100, { font: "38px Roboto" });
  }

  for (const trait of weapon.LegendarySoul.traits) {
    drawTrait(ctx, trait, x, y);
    y += 80;
  }
};

const drawPlayer = async (ctx, player, x, y, { showAttunement } = {}) => {
  const BLOCK_SIZE = 217;

  ctx.beginPath();

  let guild = "";
  if (player.GuildName) guild = player.GuildName;
  if (player.AllianceName) guild = `[${player.AllianceName}] ${guild}`;
  applyInfoTextStyle(ctx, "guildAlliance", { fill: "#FFFFFF", font: "35px Roboto", lineWidth: 3 });
  let tw = ctx.measureText(guild).width;
  let th = ctx.measureText("M").width;
  y += th * 2;
  ctx.strokeText(guild, x + BLOCK_SIZE * 1.5 - tw / 2, y);
  ctx.fillText(guild, x + BLOCK_SIZE * 1.5 - tw / 2, y);
  y += th * 2;

  const name = `${player.Name}`;
  applyInfoTextStyle(ctx, "playerName", { font: "60px Roboto", lineWidth: 6 });
  tw = ctx.measureText(name).width;
  th = ctx.measureText("M").width;
  ctx.strokeText(name, x + BLOCK_SIZE * 1.5 - tw / 2, y);
  ctx.fillText(name, x + BLOCK_SIZE * 1.5 - tw / 2, y);
  y += th - 5;

  const ip = `IP: ${Math.round(player.AverageItemPower)}`;
  applyInfoTextStyle(ctx, "itemPower");
  tw = ctx.measureText(ip).width;
  th = ctx.measureText("M").width;
  ctx.strokeText(ip, x + BLOCK_SIZE * 1.5 - tw / 2, y);
  ctx.fillText(ip, x + BLOCK_SIZE * 1.5 - tw / 2, y);
  y += th;

  const equipment = player.Equipment;
  await drawItem(ctx, equipment.Head, x + BLOCK_SIZE, y);
  await drawItem(ctx, equipment.Armor, x + BLOCK_SIZE, y + BLOCK_SIZE);
  await drawItem(ctx, equipment.MainHand, x, y + BLOCK_SIZE, { attunedPlayerName: player.Name });
  if (equipment.MainHand && equipment.MainHand.Type.split("_")[1] == "2H") {
    ctx.globalAlpha = 0.2;
    await drawItem(ctx, equipment.MainHand, x + BLOCK_SIZE * 2, y + BLOCK_SIZE);
    ctx.globalAlpha = 1;
  } else {
    await drawItem(ctx, equipment.OffHand, x + BLOCK_SIZE * 2, y + BLOCK_SIZE);
  }
  await drawItem(ctx, equipment.Shoes, x + BLOCK_SIZE, y + BLOCK_SIZE * 2);
  await drawItem(ctx, equipment.Bag, x, y);
  await drawItem(ctx, equipment.Cape, x + BLOCK_SIZE * 2, y);
  await drawItem(ctx, equipment.Mount, x + BLOCK_SIZE, y + BLOCK_SIZE * 3);
  await drawItem(ctx, equipment.Potion, x, y + BLOCK_SIZE * 2);
  await drawItem(ctx, equipment.Food, x + BLOCK_SIZE * 2, y + BLOCK_SIZE * 2);

  y += BLOCK_SIZE * 4;

  if (showAttunement && equipment.MainHand?.LegendarySoul) {
    await drawAwakening(ctx, equipment.MainHand, x, y, { attunedPlayerName: player.Name });
  }

  ctx.closePath();
};

module.exports = {
  drawPlayer,
};
