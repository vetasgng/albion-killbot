/**
 * Discord API text limits for messages, embeds, and UI components.
 */

/** Regular message `content` (not counting embeds). */
const DISCORD_MESSAGE_CONTENT_MAX = 2000;

/** Embed `fields[].value` (code fences and formatting count toward this). */
const DISCORD_EMBED_FIELD_VALUE_MAX = 1024;

const ELLIPSIS = "...";

/** Truncates text to a Discord limit, appending an ASCII ellipsis. */
function truncateDiscordText(text, maxLength) {
  if (text.length <= maxLength) return text;
  const take = Math.max(0, maxLength - ELLIPSIS.length);
  return `${text.slice(0, take)}${ELLIPSIS}`;
}

module.exports = {
  DISCORD_EMBED_FIELD_VALUE_MAX,
  DISCORD_MESSAGE_CONTENT_MAX,
  truncateDiscordText,
};
