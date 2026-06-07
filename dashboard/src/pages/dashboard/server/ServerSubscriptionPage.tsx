import Loader from "components/common/Loader";
import NoData from "components/common/NoData";
import ServerSubscriptionEmptyState from "components/subscriptions/ServerSubscriptionEmptyState";
import SubscriptionCard from "components/subscriptions/SubscriptionCard";
import SubscriptionCardStripe from "components/subscriptions/SubscriptionCardStripe";
import { useParams } from "react-router-dom";
import { useGetServerSubscriptionQuery } from "store/api/server";

const ServerSubscriptionPage = () => {
  const { serverId = "" } = useParams();
  const subscription = useGetServerSubscriptionQuery({ serverId });

  if (subscription.isLoading) return <Loader />;

  const isNotFoundError =
    subscription.error &&
    "status" in subscription.error &&
    subscription.error.status === "PARSING_ERROR" &&
    subscription.error.originalStatus === 404;

  if (subscription.error && !isNotFoundError) {
    return <NoData />;
  }

  if (!subscription.data) {
    return <ServerSubscriptionEmptyState />;
  }

  if (subscription.data.stripe) {
    return <SubscriptionCardStripe subscription={subscription.data} />;
  }

  return <SubscriptionCard subscription={subscription.data} />;
};

export default ServerSubscriptionPage;
