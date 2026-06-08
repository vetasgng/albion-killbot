import DashboardManageableServerCard from "components/dashboard/DashboardManageableServerCard";
import DashboardOtherServers from "components/dashboard/DashboardOtherServers";
import DashboardEmptyState from "components/dashboard/DashboardEmptyState";
import {
  DashboardContent,
  DashboardEyebrow,
  DashboardHeader,
  DashboardIntro,
  DashboardSection,
  DashboardSectionCount,
  DashboardSectionDivider,
  DashboardSectionHeader,
  DashboardSectionTitle,
  DashboardServerGrid,
} from "components/dashboard/styles";
import Loader from "components/common/Loader";
import Page from "components/Page";
import { getServerInviteUrl } from "helpers/discord";
import { partitionUserServers } from "helpers/servers";
import { useNavigate } from "react-router-dom";
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

  const { manageableServers, otherServers } = partitionUserServers(
    servers.data ?? []
  );

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

  return (
    <Page title="Dashboard">
      <DashboardContent>
        <DashboardHeader>
          <DashboardEyebrow>Server management</DashboardEyebrow>
          <DashboardIntro>
            Choose a server to configure Albion Killbot, or invite the bot to a
            server you manage.
          </DashboardIntro>
        </DashboardHeader>

        {manageableServers.length > 0 ? (
          <DashboardSection>
            <DashboardSectionHeader>
              <DashboardSectionTitle>Your servers</DashboardSectionTitle>
              <DashboardSectionCount>
                {manageableServers.length}
              </DashboardSectionCount>
            </DashboardSectionHeader>

            <DashboardServerGrid>
              {manageableServers.map((server) => (
                <DashboardManageableServerCard
                  key={server.id}
                  server={server}
                  onInvite={inviteToServer}
                />
              ))}
            </DashboardServerGrid>
          </DashboardSection>
        ) : (
          <DashboardEmptyState />
        )}

        {manageableServers.length > 0 && otherServers.length > 0 && (
          <DashboardSectionDivider />
        )}

        <DashboardOtherServers servers={otherServers} />
      </DashboardContent>
    </Page>
  );
};

export default DashboardPage;
