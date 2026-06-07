import Loader from "components/common/Loader";
import ServerLayout from "components/dashboard/server/ServerLayout";
import { isSubscriptionActive } from "helpers/subscriptions";
import { Alert } from "react-bootstrap";
import { Link, Navigate, Outlet, useParams } from "react-router-dom";
import { useFetchServerQuery } from "store/api";

const ServerPage = () => {
  const { serverId = "" } = useParams();
  const server = useFetchServerQuery(serverId);

  const redirectToDashboard = <Navigate to="/dashboard" replace={true} />;

  if (server.isFetching) return <Loader />;
  if (!server.data) return redirectToDashboard;

  const { subscription } = server.data;

  const subscriptionAlert =
    subscription && !isSubscriptionActive(subscription) ? (
      <Alert variant="warning">
        You server subscription has expired, please visit the{" "}
        <Link to="/premium">Premium page</Link> to verify and renew your
        subscription.
      </Alert>
    ) : undefined;

  return (
    <ServerLayout server={server.data} subscriptionAlert={subscriptionAlert}>
      <Outlet />
    </ServerLayout>
  );
};

export default ServerPage;
