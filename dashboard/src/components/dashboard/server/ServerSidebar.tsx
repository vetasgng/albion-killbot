import { ServerBase } from "types/server";
import ServerNavContent from "./ServerNavContent";
import { SidebarColumn, SidebarPanel } from "./styles";

interface ServerSidebarProps {
  server: ServerBase;
}

const ServerSidebar = ({ server }: ServerSidebarProps) => {
  return (
    <SidebarColumn>
      <SidebarPanel>
        <ServerNavContent server={server} />
      </SidebarPanel>
    </SidebarColumn>
  );
};

export default ServerSidebar;
