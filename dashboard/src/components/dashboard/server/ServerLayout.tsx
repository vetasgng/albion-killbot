import { getServerNavItem } from "constants/serverNav";
import { getServerPictureUrl } from "helpers/discord";
import { useServerNavMobile } from "helpers/serverNavMobile";
import { ReactNode, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ServerBase } from "types/server";
import ServerPageHeader from "./ServerPageHeader";
import ServerSidebar from "./ServerSidebar";
import ServerNavContent from "./ServerNavContent";
import {
  ContentPanel,
  ContentStack,
  LayoutRoot,
  MainColumn,
  MobileNavOffcanvas,
  OffcanvasHeaderIdentity,
  ServerIcon,
  ServerName,
  SubscriptionAlertSlot,
} from "./styles";

interface ServerLayoutProps {
  server: ServerBase;
  subscriptionAlert?: ReactNode;
  children: ReactNode;
}

const ServerLayout = ({
  server,
  subscriptionAlert,
  children,
}: ServerLayoutProps) => {
  const { serverId = "" } = useParams();
  const location = useLocation();
  const [showNav, setShowNav] = useState(false);
  const serverNavMobile = useServerNavMobile();

  const activeItem = getServerNavItem(location.pathname, serverId);

  const closeNav = () => setShowNav(false);

  useEffect(() => {
    serverNavMobile?.registerOpenHandler(() => setShowNav(true));
    return () => serverNavMobile?.registerOpenHandler(null);
  }, [serverNavMobile]);

  return (
    <>
      <LayoutRoot>
        <ServerSidebar server={server} />

        <MainColumn>
          <ContentPanel>
            <ServerPageHeader item={activeItem} />

            {subscriptionAlert && (
              <SubscriptionAlertSlot>{subscriptionAlert}</SubscriptionAlertSlot>
            )}

            <ContentStack>{children}</ContentStack>
          </ContentPanel>
        </MainColumn>
      </LayoutRoot>

      <MobileNavOffcanvas
        show={showNav}
        onHide={closeNav}
        placement="start"
        className="d-lg-none"
      >
        <MobileNavOffcanvas.Header closeButton>
          <OffcanvasHeaderIdentity>
            <ServerIcon
              src={getServerPictureUrl(server, true)}
              alt={server.name}
            />
            <ServerName title={server.name}>{server.name}</ServerName>
          </OffcanvasHeaderIdentity>
        </MobileNavOffcanvas.Header>
        <MobileNavOffcanvas.Body>
          <ServerNavContent
            server={server}
            showIdentity={false}
            onNavigate={closeNav}
          />
        </MobileNavOffcanvas.Body>
      </MobileNavOffcanvas>
    </>
  );
};

export default ServerLayout;
