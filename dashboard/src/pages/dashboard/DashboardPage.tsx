import Loader from "components/common/Loader";
import DashboardEmptyState from "components/dashboard/DashboardEmptyState";
import Page from "components/Page";
import ServerCard from "components/ServerCard";
import { getServerInviteUrl } from "helpers/discord";
import { canManageServer } from "helpers/servers";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFetchServersQuery } from "store/api";
import { ServerPartial } from "types/server";

const DashboardPage = () => {
  const servers = useFetchServersQuery();
  const navigate = useNavigate();

  if (servers.isFetching) {
    return (
      <Page title="Dashboard">
        <Loader width={500} height={500}>
          <rect x="160" y="15" rx="0" ry="0" width="210" height="20" />
          <rect x="15" y="55" rx="0" ry="0" width="160" height="120" />
          <rect x="185" y="55" rx="0" ry="0" width="160" height="120" />
          <rect x="355" y="55" rx="0" ry="0" width="160" height="120" />
          <rect x="15" y="185" rx="0" ry="0" width="160" height="120" />
        </Loader>
      </Page>
    );
  }

  let invitePopup: Window;
  const inviteToServer = (server: ServerPartial) => {
    if (!invitePopup || invitePopup.closed) {
      invitePopup = window.open(
        getServerInviteUrl(server),
        "_blank",
        "popup"
      ) as Window;

      const invitePopupTick = setInterval(function () {
        if (invitePopup.closed) {
          clearInterval(invitePopupTick);
          return navigate(server.id);
        }
      }, 1000);
    } else {
      invitePopup.focus();
    }
  };

  const renderServer = (server: ServerPartial) => {
    const manageable = canManageServer(server);

    return (
      <Col sm={6} lg={4} key={server.id}>
        <ServerCard server={server} disabled={!manageable}>
          <div className="d-flex justify-content-end">
            {!manageable ? (
              <OverlayTrigger
                overlay={
                  <Tooltip id={`no-access-${server.id}`}>
                    Owner or Administrator permission required
                  </Tooltip>
                }
              >
                <span className="d-inline-block" tabIndex={0}>
                  <Button variant="secondary" disabled style={{ pointerEvents: "none" }}>
                    No access
                  </Button>
                </span>
              </OverlayTrigger>
            ) : server.bot ? (
              <Link to={server.id}>
                <Button variant="primary">Dashboard</Button>
              </Link>
            ) : (
              <Button
                variant="secondary"
                onClick={() => inviteToServer(server)}
              >
                Invite
              </Button>
            )}
          </div>
        </ServerCard>
      </Col>
    );
  };

  return (
    <Page
      title="Dashboard"
      alerts={[
        {
          variant: "info",
          message: (
            <div>
              <b>Can't find your server?</b> Please check if you are a server
              owner or have the Administrator permissions.
            </div>
          ),
        },
      ]}
    >
      <Row className="g-4 align-self-center">
        {servers.data && servers.data.map(renderServer)}
      </Row>
      {servers.data?.length === 0 && <DashboardEmptyState />}
    </Page>
  );
};

export default DashboardPage;
