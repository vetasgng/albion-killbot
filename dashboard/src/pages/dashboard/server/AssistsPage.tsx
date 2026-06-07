import LoadError from "components/LoadError";
import Settings from "components/Settings";
import Loader from "components/common/Loader";
import NotificationSettingsForm from "components/dashboard/NotificationSettingsForm";
import { useParams } from "react-router-dom";
import { useFetchServerQuery, useGetConstantsQuery } from "store/api";

const AssistsPage = () => {
  const { serverId = "" } = useParams();
  const constants = useGetConstantsQuery();
  const server = useFetchServerQuery(serverId);

  if (server.isFetching || constants.isFetching) return <Loader />;
  if (!server.data || !constants.data) return <LoadError />;

  return (
    <Settings>
      <NotificationSettingsForm
        type="assists"
        serverId={serverId}
        channels={server.data.channels}
        modes={constants.data.modes}
        providers={constants.data.providers}
      />
    </Settings>
  );
};

export default AssistsPage;
