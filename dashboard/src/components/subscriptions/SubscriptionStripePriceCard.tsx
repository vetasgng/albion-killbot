import { faStripe } from "@fortawesome/free-brands-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getSubscriptionPriceBanner,
  getSubscriptionPriceFeatures,
} from "helpers/subscriptions";
import { capitalize, getCurrency } from "helpers/utils";
import { Card } from "react-bootstrap";
import { SubscriptionPrice } from "types/subscription";
import {
  PriceAmountRow,
  PriceCardRoot,
  PriceCheckoutButton,
  PriceDivider,
  PriceFeatureItem,
  PriceFeatureList,
  PriceRecurrence,
  PriceTagBadge,
} from "./styles";

interface SubscriptionPriceCardProps {
  price: SubscriptionPrice;
  onSelect?: (priceId: string) => void;
}

const SubscriptionStripePriceCard = ({
  price,
  onSelect,
}: SubscriptionPriceCardProps) => {
  const { metadata } = price;
  const isPopular = metadata.tag === "popular";
  const features = getSubscriptionPriceFeatures(price);

  return (
    <PriceCardRoot $popular={isPopular}>
      <Card.Img variant="top" src={getSubscriptionPriceBanner(price)} />
      {metadata.tag && (
        <PriceTagBadge>
          {capitalize(metadata.tag, { splitWords: true })}
        </PriceTagBadge>
      )}
      <Card.Body className="pb-0">
        <PriceAmountRow>
          <h4>
            {getCurrency(price.price / 100, {
              currency: price.currency,
            })}
          </h4>
          <span>/</span>
          <PriceRecurrence>
            {price.recurrence.count} {price.recurrence.interval}
          </PriceRecurrence>
        </PriceAmountRow>
      </Card.Body>
      <PriceDivider />
      <Card.Body className="pt-0">
        <PriceFeatureList>
          {features.map((feature) => (
            <PriceFeatureItem key={feature.label}>
              <FontAwesomeIcon icon={faCircleCheck} />
              <span>{feature.label}</span>
            </PriceFeatureItem>
          ))}
        </PriceFeatureList>
      </Card.Body>

      <Card.Footer>
        <PriceCheckoutButton type="button" onClick={() => onSelect?.(price.id)}>
          <FontAwesomeIcon icon={faStripe} />
          <span>Checkout</span>
        </PriceCheckoutButton>
      </Card.Footer>
    </PriceCardRoot>
  );
};

export default SubscriptionStripePriceCard;
