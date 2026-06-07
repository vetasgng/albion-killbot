import {
  EmptyStateRoot,
  EmptyStateText,
  EmptyStateTitle,
} from "components/layout/ContentPanel";
import { PremiumLink } from "components/subscriptions/styles";
import { Link } from "react-router-dom";

const SubscriptionsEmptyState = () => {
  return (
    <EmptyStateRoot>
      <EmptyStateTitle>No subscriptions yet</EmptyStateTitle>
      <EmptyStateText>
        You do not have any premium subscriptions. Visit the{" "}
        <PremiumLink as={Link} to="/premium">
          Premium page
        </PremiumLink>{" "}
        to choose a plan.
      </EmptyStateText>
    </EmptyStateRoot>
  );
};

export default SubscriptionsEmptyState;
