import {
  EmptyStateRoot,
  EmptyStateText,
  EmptyStateTitle,
} from "components/layout/ContentPanel";

interface NoDataProps {
  title?: string;
  message?: string;
}

const NoData = ({
  title = "No data available",
  message = "Please refresh the page and try again.",
}: NoDataProps) => {
  return (
    <EmptyStateRoot>
      <EmptyStateTitle>{title}</EmptyStateTitle>
      <EmptyStateText>{message}</EmptyStateText>
    </EmptyStateRoot>
  );
};

export default NoData;
