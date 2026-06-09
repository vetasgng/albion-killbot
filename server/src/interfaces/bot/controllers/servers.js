const config = require("config");
const { Events } = require("discord.js");

const logger = require("../../../helpers/logger");
const { transformGuild } = require("../../../helpers/discord");
const { runInterval } = require("../../../helpers/scheduler");

const botGuildsService = require("../../../services/botGuilds");
const { updateLimitsCache } = require("../../../services/limits");
const { updateSettingsCache } = require("../../../services/settings");
const { updateTrackCache } = require("../../../services/track");

async function syncBotGuilds(client) {
  const guilds = client.guilds.cache.map((guild) => transformGuild(guild));
  await botGuildsService.syncBotGuilds(guilds);
}

async function refreshServerCache(client) {
  logger.debug(`Refreshing servers cache.`);
  const guildIds = client.guilds.cache.map((guild) => guild.id);

  try {
    await Promise.all([updateLimitsCache(guildIds), updateSettingsCache(guildIds), updateTrackCache(guildIds)]);
  } catch (error) {
    logger.error(`Unable to refresh servers cache: ${error.message}`, {
      error,
    });
  }
}

async function preinit({ client }) {
  try {
    await botGuildsService.ensureIndexes();
    await syncBotGuilds(client);
  } catch (error) {
    logger.error(`Unable to sync bot guilds on startup: ${error.message}`, { error });
  }

  await runInterval("Refresh cache for server settings", refreshServerCache, {
    fnOpts: [client],
    interval: config.get("bot.servers.cacheInterval"),
    runOnStart: true,
  });
}

async function init({ client }) {
  client.on(Events.GuildCreate, async (guild) => {
    try {
      await botGuildsService.upsertBotGuild(transformGuild(guild));
    } catch (error) {
      logger.error(`Unable to store joined guild #${guild.id}: ${error.message}`, { error, guildId: guild.id });
    }
  });

  client.on(Events.GuildDelete, async (guild) => {
    try {
      await botGuildsService.removeBotGuild(guild.id);
    } catch (error) {
      logger.error(`Unable to remove left guild #${guild.id}: ${error.message}`, { error, guildId: guild.id });
    }
  });
}

module.exports = {
  name: "servers",
  preinit,
  init,
};
