const RANKING_EMOJIS = {
  daily: "☀️",
  weekly: "📆",
  monthly: "🗓️",
};

const DAILY_RANKING_FOOTER = `Albion Killbot • ${RANKING_EMOJIS.daily} Daily Ranking`;
const WEEKLY_RANKING_FOOTER = `Albion Killbot • ${RANKING_EMOJIS.weekly} Weekly Ranking`;
const MONTHLY_RANKING_FOOTER = `Albion Killbot • ${RANKING_EMOJIS.monthly} Monthly Ranking`;

const RANKING_FOOTERS = {
  daily: DAILY_RANKING_FOOTER,
  weekly: WEEKLY_RANKING_FOOTER,
  monthly: MONTHLY_RANKING_FOOTER,
};

function formatRankingLabel(type, label) {
  const emoji = RANKING_EMOJIS[type];
  return emoji ? `${emoji} ${label}` : label;
}

function getRankingMarkerFromContent(content) {
  if (!content) return null;

  const lines = content.split("\n");
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (!line.startsWith("-# ")) continue;

    const text = line.slice(3);
    for (const [type, footer] of Object.entries(RANKING_FOOTERS)) {
      if (text === footer) {
        return { type };
      }
    }
  }

  return null;
}

/**
 * Single namespace for bot message markers: constants, footer builders, checks, and matchers.
 */
const Markers = {
  DAILY_RANKING_FOOTER,
  WEEKLY_RANKING_FOOTER,
  MONTHLY_RANKING_FOOTER,
  RANKING_EMOJIS,

  formatRankingLabel,

  buildFooter: {
    ranking(type) {
      const footer = RANKING_FOOTERS[type];
      if (!footer) {
        throw new Error(`Unknown ranking type: ${type}`);
      }
      return footer;
    },
  },

  /**
   * Matches ranking messages sent as message `content` (footer subtext `-#`).
   * Returns false or `{ type }`. When filter is provided, returns match only if type matches.
   */
  isRankingMessage(message, filter) {
    const marker = getRankingMarkerFromContent(message.content);
    if (!marker) return false;
    if (filter?.type && marker.type !== filter.type) return false;
    return marker;
  },
};

module.exports = { Markers };
