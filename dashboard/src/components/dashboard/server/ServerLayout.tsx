import { getServerNavItem } from "constants/serverNav";
import { ReactNode, useState } from "react";
import { Offcanvas } from "react-bootstrap";
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

  const activeItem = getServerNavItem(location.pathname, serverId);

  const closeNav = () => setShowNav(false);

  return (
    <>
      <LayoutRoot>
        <ServerSidebar server={server} />

        <MainColumn>
          <ContentPanel>
            <ServerPageHeader
              item={activeItem}
              onMenuClick={() => setShowNav(true)}
            />

            {subscriptionAlert && (
              <SubscriptionAlertSlot>{subscriptionAlert}</SubscriptionAlertSlot>
            )}

            <ContentStack>{children}</ContentStack>
          </ContentPanel>
        </MainColumn>
      </LayoutRoot>

      <Offcanvas
        show={showNav}
        onHide={closeNav}
        placement="start"
        className="d-lg-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{server.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ServerNavContent
            server={server}
            showIdentity={false}
            onNavigate={closeNav}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ServerLayout;
