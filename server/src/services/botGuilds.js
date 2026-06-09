const { countDocuments, deleteOne, getCollection } = require("../ports/database");

const BOT_GUILDS_COLLECTION = "botGuilds";
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;
const SYNC_BATCH_SIZE = 500;

let indexesReady = false;

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const toBotGuild = (guild) => ({
  id: guild.id,
  name: guild.name,
  icon: guild.icon || null,
  updatedAt: new Date(),
});

const buildSearchFilter = (search) => {
  const term = search?.trim().replace("#", "");
  if (!term) return {};

  const escaped = escapeRegex(term);
  return {
    $or: [{ id: { $regex: `^${escaped}` } }, { name: { $regex: escaped, $options: "i" } }],
  };
};

async function upsertBotGuild(guild) {
  const collection = getCollection(BOT_GUILDS_COLLECTION);
  await collection.updateOne({ id: guild.id }, { $set: toBotGuild(guild) }, { upsert: true });
  return toBotGuild(guild);
}

async function removeBotGuild(guildId) {
  return await deleteOne(BOT_GUILDS_COLLECTION, { id: guildId });
}

async function ensureIndexes() {
  if (indexesReady) return;

  const collection = getCollection(BOT_GUILDS_COLLECTION);
  await collection.createIndex({ id: 1 }, { unique: true });
  await collection.createIndex({ name: 1, id: 1 });
  indexesReady = true;
}

async function syncBotGuilds(guilds = []) {
  if (guilds.length === 0) return 0;

  await ensureIndexes();

  const collection = getCollection(BOT_GUILDS_COLLECTION);
  const updatedAt = new Date();
  const operations = guilds.map((guild) => ({
    updateOne: {
      filter: { id: guild.id },
      update: {
        $set: {
          id: guild.id,
          name: guild.name,
          icon: guild.icon || null,
          updatedAt,
        },
      },
      upsert: true,
    },
  }));

  let synced = 0;
  for (let offset = 0; offset < operations.length; offset += SYNC_BATCH_SIZE) {
    const batch = operations.slice(offset, offset + SYNC_BATCH_SIZE);
    const result = await collection.bulkWrite(batch, { ordered: false });
    synced += result.upsertedCount + result.modifiedCount + result.matchedCount;
  }

  return synced;
}

async function findBotGuilds({ search, page = 1, pageSize = DEFAULT_PAGE_SIZE } = {}) {
  await ensureIndexes();

  const filter = buildSearchFilter(search);
  const limit = Math.min(MAX_PAGE_SIZE, Math.max(1, Number.parseInt(pageSize, 10) || DEFAULT_PAGE_SIZE));
  const currentPage = Math.max(1, Number.parseInt(page, 10) || 1);
  const skip = (currentPage - 1) * limit;
  const collection = getCollection(BOT_GUILDS_COLLECTION);

  const [items, total] = await Promise.all([
    collection
      .find(filter)
      .sort({ name: 1, id: 1 })
      .skip(skip)
      .limit(limit)
      .project({ _id: 0, id: 1, name: 1, icon: 1 })
      .toArray(),
    countDocuments(BOT_GUILDS_COLLECTION, filter),
  ]);

  return {
    items,
    total,
    page: currentPage,
    pageSize: limit,
  };
}

module.exports = {
  ensureIndexes,
  findBotGuilds,
  removeBotGuild,
  syncBotGuilds,
  upsertBotGuild,
};
