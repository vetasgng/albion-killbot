import LoadError from "components/LoadError";
import Settings from "components/Settings";
import Loader from "components/common/Loader";
import BattlesSettingsForm from "components/dashboard/BattlesSettingsForm";
import { useParams } from "react-router-dom";
import { useFetchServerQuery, useGetConstantsQuery } from "store/api";

const BattlesPage = () => {
  const { serverId = "" } = useParams();
  const constants = useGetConstantsQuery();
  const server = useFetchServerQuery(serverId);

  if (server.isFetching || constants.isFetching) return <Loader />;
  if (!server.data || !constants.data) return <LoadError />;

  return (
    <Settings>
      <BattlesSettingsForm
        serverId={serverId}
        channels={server.data.channels}
        providers={constants.data.providers}
      />
    </Settings>
  );
};

export default BattlesPage;
