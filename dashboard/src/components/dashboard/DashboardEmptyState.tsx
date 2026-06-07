import {
  EmptyStateRoot,
  EmptyStateText,
  EmptyStateTitle,
} from "components/layout/ContentPanel";

const DashboardEmptyState = () => {
  return (
    <EmptyStateRoot>
      <EmptyStateTitle>No servers available</EmptyStateTitle>
      <EmptyStateText>
        Invite the bot to a Discord server where you are an owner or
        administrator, then return here to configure it.
      </EmptyStateText>
    </EmptyStateRoot>
  );
};

export default DashboardEmptyState;
