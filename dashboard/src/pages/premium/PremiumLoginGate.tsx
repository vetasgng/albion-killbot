import {
  EmptyStateRoot,
  EmptyStateText,
  EmptyStateTitle,
} from "components/layout/ContentPanel";

const PremiumLoginGate = () => {
  return (
    <EmptyStateRoot>
      <EmptyStateTitle>Sign in required</EmptyStateTitle>
      <EmptyStateText>Please log in to see the available plans.</EmptyStateText>
    </EmptyStateRoot>
  );
};

export default PremiumLoginGate;
