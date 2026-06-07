import LeaveServer from "components/LeaveServer";
import ServerCard from "components/ServerCard";
import SubscriptionDelete from "components/SubscriptionDelete";
import Loader from "components/common/Loader";
import SubscriptionEdit from "components/subscriptions/SubscriptionEdit";
import SubscriptionStatusBadge from "components/subscriptions/SubscriptionStatusBadge";
import { getSubscriptionStatus } from "helpers/subscriptions";
import { getSubscriptionUrl } from "helpers/stripe";
import {
  AdminDetailLabel,
  AdminDetailRow,
  AdminDetailSecondary,
  AdminDetailValue,
  AdminFilterFooter,
  AdminFilterPanel,
  AdminSectionTitle,
} from "pages/admin/styles";
import { Button, Card, Stack } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useFetchServerQuery } from "store/api";
import { useGetAdminSubscriptionQuery } from "store/api/admin";

const AdminSubscriptionPage = () => {
  const { subscriptionId = "" } = useParams();
  const navigate = useNavigate();
  const subscription = useGetAdminSubscriptionQuery({ id: subscriptionId });
  const server = useFetchServerQuery(subscription.data?.server || "", {
    skip: !subscription.data?.server,
  });

  if (subscription.isFetching) return <Loader />;
  if (!subscription.data) return <Navigate to=".." replace={true} />;

  const {
    owner,
    server: subscriptionServer,
    expires,
    limits,
    stripe,
  } = subscription.data;

  const expiryText =
    expires === "never"
      ? "Never expires"
      : `${
          new Date(expires).getTime() > new Date().getTime()
            ? "Active until"
            : "Expired at"
        } ${new Date(expires).toLocaleString()}`;

  return (
    <Stack gap={3}>
      <AdminSectionTitle>Subscription details</AdminSectionTitle>

      <AdminFilterPanel>
        <Card.Body>
          <Stack gap={2}>
            {owner && (
              <AdminDetailRow>
                <AdminDetailLabel>Owner</AdminDetailLabel>
                <AdminDetailValue>{owner}</AdminDetailValue>
              </AdminDetailRow>
            )}

            {subscriptionServer && (
              <AdminDetailRow>
                <AdminDetailLabel>Server</AdminDetailLabel>
                <AdminDetailValue>{subscriptionServer}</AdminDetailValue>
              </AdminDetailRow>
            )}

            {stripe && (
              <AdminDetailRow>
                <AdminDetailLabel>Stripe</AdminDetailLabel>
                <AdminDetailValue>
                  <a
                    href={getSubscriptionUrl(stripe)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {stripe}
                  </a>
                </AdminDetailValue>
              </AdminDetailRow>
            )}

            <AdminDetailRow>
              <AdminDetailLabel>Status</AdminDetailLabel>
              <SubscriptionStatusBadge
                status={getSubscriptionStatus(subscription.data)}
              />
              <AdminDetailSecondary>{expiryText}</AdminDetailSecondary>
              {stripe && (
                <AdminDetailSecondary>
                  (Auto-managed by Stripe)
                </AdminDetailSecondary>
              )}
            </AdminDetailRow>

            <AdminDetailRow>
              <AdminDetailLabel>Track limits</AdminDetailLabel>
              <AdminDetailValue>
                {limits ? "Custom" : "Default"}
              </AdminDetailValue>
            </AdminDetailRow>

            {limits && (
              <Stack as="ul" gap={1} className="mb-0 ps-3">
                <li>Players: {limits.players}</li>
                <li>Guilds: {limits.guilds}</li>
                <li>Alliances: {limits.alliances}</li>
              </Stack>
            )}
          </Stack>
        </Card.Body>

        <AdminFilterFooter>
          <SubscriptionEdit subscription={subscription.data} />
          <SubscriptionDelete
            subscription={subscription.data}
            onDelete={() => navigate("/admin/subscriptions", { replace: true })}
          />
        </AdminFilterFooter>
      </AdminFilterPanel>

      {subscription.data.server && (
        <ServerCard
          list
          loading={server.isLoading}
          server={server.data}
          header={<Card.Header>Assigned to:</Card.Header>}
        >
          {server.data && (
            <Stack
              direction="horizontal"
              gap={2}
              className="justify-content-end"
            >
              <Link to={`/dashboard/${server.data.id}`}>
                <Button variant="primary">Dashboard</Button>
              </Link>
              <LeaveServer server={server.data} />
            </Stack>
          )}
        </ServerCard>
      )}
    </Stack>
  );
};

export default AdminSubscriptionPage;
