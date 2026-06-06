const path = require("node:path");
const { createCanvas } = require("canvas");
const { hasAwakening } = require("../../helpers/albion");
const { optimizeImage } = require("../../helpers/images");
const { fileSizeFormatter } = require("../../helpers/utils");
const logger = require("../../helpers/logger");
const { memoize } = require("../../helpers/cache");
const { SECOND } = require("../../helpers/constants");
const { assetsPath, drawImage } = require("./canvas");
const { drawPlayer } = require("./draw/player");
const { drawTimestamp, drawFame, drawLootValue, drawAssistCount } = require("./draw/stats");
const { drawParticipantBars } = require("./draw/participantBars");

const CANVAS_WIDTH = 1600;
const BASE_HEIGHT = 1250;
const ATTUNEMENT_HEIGHT = 250;
const PARTICIPANT_BARS_Y = 1100;

async function generateEventImage(event, { showAttunement = true, splitLootValue = false } = {}) {
  return memoize(
    `eventImage-${event.EventId}`,
    async () => {
      showAttunement = showAttunement && hasAwakening(event);
      const attunementHeight = showAttunement ? ATTUNEMENT_HEIGHT : 0;

      let canvas = createCanvas(CANVAS_WIDTH, BASE_HEIGHT + attunementHeight);
      const w = canvas.width;
      const ctx = canvas.getContext("2d");

      await drawImage(ctx, path.join(assetsPath, "background.png"), -1, -1, 1602, 1554);
      await drawPlayer(ctx, event.Killer, 15, 0, { showAttunement });
      await drawPlayer(ctx, event.Victim, 935, 0, { showAttunement });
      await drawTimestamp(ctx, event, w / 2, 50);
      const assistCount = Math.max(event.GroupMembers.length, event.Participants.length);
      if (assistCount > 1) await drawAssistCount(ctx, assistCount, w / 2, 290, { iconSize: 80 });
      await drawFame(ctx, event, w / 2, 470);
      if (event.lootValue) await drawLootValue(ctx, event.lootValue, w / 2, 675, { splitLootValue });

      await drawParticipantBars(ctx, event.Participants, w, PARTICIPANT_BARS_Y + attunementHeight, {
        margin: 35,
        gap: 30,
        height: 50,
        radius: 25,
      });

      const buffer = await optimizeImage(canvas.toBuffer(), 580);
      canvas = null;

      if (buffer.length > 2 * 1048576) {
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
  generateEventImage,
};
