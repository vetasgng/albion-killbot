import {
  EmptyStateRoot,
  EmptyStateText,
  EmptyStateTitle,
} from "components/layout/ContentPanel";
import { PremiumLink } from "components/subscriptions/styles";
import { Link } from "react-router-dom";

const ServerSubscriptionEmptyState = () => {
  return (
    <EmptyStateRoot>
      <EmptyStateTitle>No subscription for this server</EmptyStateTitle>
      <EmptyStateText>
        This server does not have an active premium subscription. Visit the{" "}
        <PremiumLink as={Link} to="/premium">
          Premium page
        </PremiumLink>{" "}
        to choose a plan and assign it to this server.
      </EmptyStateText>
    </EmptyStateRoot>
  );
};

export default ServerSubscriptionEmptyState;
