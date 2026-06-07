import {
  EmptyStateRoot,
  EmptyStateText,
  EmptyStateTitle,
} from "components/layout/ContentPanel";

interface PremiumNoPlansEmptyStateProps {
  currency: string;
  availableCurrencies?: string[];
}

const PremiumNoPlansEmptyState = ({
  currency,
  availableCurrencies = [],
}: PremiumNoPlansEmptyStateProps) => {
  const normalizedCurrency = currency.toUpperCase() || "USD";
  const alternateCurrencies = availableCurrencies
    .map((item) => item.toUpperCase())
    .filter((item) => item !== normalizedCurrency);

  return (
    <EmptyStateRoot>
      <EmptyStateTitle>
        No plans available in {normalizedCurrency}
      </EmptyStateTitle>
      <EmptyStateText>
        We do not currently offer premium plans in this currency.
        {alternateCurrencies.length > 0 ? (
          <>
            {" "}
            Try selecting{" "}
            {alternateCurrencies.length === 1
              ? alternateCurrencies[0]
              : `${alternateCurrencies.slice(0, -1).join(", ")} or ${
                  alternateCurrencies[alternateCurrencies.length - 1]
                }`}{" "}
            from the currency menu above.
          </>
        ) : (
          <> Check back later or contact support if you need help.</>
        )}
      </EmptyStateText>
    </EmptyStateRoot>
  );
};

export default PremiumNoPlansEmptyState;
