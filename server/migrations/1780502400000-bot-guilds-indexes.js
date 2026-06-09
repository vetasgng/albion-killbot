const logger = require("../src/helpers/logger");
const botGuildsService = require("../src/services/botGuilds");

async function run() {
  try {
    await botGuildsService.ensureIndexes();
  } catch (error) {
    logger.error(`[bot-guilds-indexes] Migration failed: ${error.message}`, { error });
    throw error;
  }
}

module.exports = {
  run,
};
