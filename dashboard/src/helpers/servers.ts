import { ServerPartial } from "types/server";

export const canManageServer = (server: ServerPartial) =>
  server.owner || server.admin;

const sortById = (a: ServerPartial, b: ServerPartial) =>
  a.id.localeCompare(b.id, undefined, { numeric: true });

export const partitionUserServers = (servers: ServerPartial[]) => {
  const manageableServers = servers.filter(canManageServer).sort(sortById);
  const otherServers = servers
    .filter((server) => !canManageServer(server))
    .sort(sortById);

  return { manageableServers, otherServers };
};

export const sortUserServers = (servers: ServerPartial[]) => {
  const { manageableServers, otherServers } = partitionUserServers(servers);

  return [...manageableServers, ...otherServers];
};
