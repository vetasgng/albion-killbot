const { transformChannel } = require("../../../helpers/discord");
const logger = require("../../../helpers/logger");

const DEFAULT_FETCH_LIMIT = 100;

async function fetchRecentMessages(channel, { limit = DEFAULT_FETCH_LIMIT } = {}) {
  if (!channel?.messages?.fetch) return [];

  try {
    const messages = await channel.messages.fetch({ limit });
    return [...messages.values()];
  } catch (error) {
    logger.warn(`Unable to fetch messages: ${error.message}.`, {
      channel: transformChannel(channel),
      error,
    });
    return [];
  }
}

async function deleteMessages(channel, messages, { reason } = {}) {
  for (const message of messages) {
    try {
      await message.delete();
      logger.debug(`Deleted message${reason ? ` (${reason})` : ""}.`, {
        channel: transformChannel(channel),
        messageId: message.id,
      });
    } catch (error) {
      logger.warn(`Unable to delete message ${message.id}: ${error.message}.`, { error });
    }
  }
}

async function deleteMatchingMessages(channel, predicate, { limit, reason } = {}) {
  const botId = channel.client?.user?.id;
  if (!botId) return;

  const messages = await fetchRecentMessages(channel, { limit });
  const toDelete = messages.filter((message) => message.author?.id === botId && predicate(message));
  await deleteMessages(channel, toDelete, { reason });
}

module.exports = {
  deleteMatchingMessages,
  deleteMessages,
  fetchRecentMessages,
};
