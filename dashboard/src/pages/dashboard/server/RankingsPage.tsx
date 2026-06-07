import LoadError from "components/LoadError";
import Settings from "components/Settings";
import Loader from "components/common/Loader";
import RankingsSettingsForm from "components/dashboard/RankingsSettingsForm";
import { useParams } from "react-router-dom";
import { useFetchServerQuery, useGetConstantsQuery } from "store/api";

const RankingsPage = () => {
  const { serverId = "" } = useParams();
  const constants = useGetConstantsQuery();
  const server = useFetchServerQuery(serverId);

  if (server.isFetching || constants.isFetching) return <Loader />;
  if (!server.data || !constants.data) return <LoadError />;

  return (
    <Settings>
      <RankingsSettingsForm
        serverId={serverId}
        channels={server.data.channels}
        rankingModes={constants.data.rankingModes}
      />
    </Settings>
  );
};

export default RankingsPage;
