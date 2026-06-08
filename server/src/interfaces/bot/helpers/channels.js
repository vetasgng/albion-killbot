const logger = require("../../../helpers/logger");

async function resolveChannel(client, channelId) {
  const cached = client.channels.cache.get(channelId);
  if (cached) return cached;

  try {
    return await client.channels.fetch(channelId);
  } catch (error) {
    logger.warn(`Unable to resolve channel ${channelId}: ${error.message}.`, { error });
    return null;
  }
}

module.exports = {
  resolveChannel,
};
