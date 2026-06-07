import { faStripe } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/common/Loader";
import { getCurrency } from "helpers/utils";
import { Button, Card, Stack } from "react-bootstrap";
import { useFetchUserQuery } from "store/api";
import { useDoSubscriptionManageMutation } from "store/api/subscriptions";
import { ISubscriptionExtended } from "types/subscription";
import SubscriptionAdmin from "./SubscriptionAdmin";
import SubscriptionAssign from "./SubscriptionAssign";
import {
  SubscriptionDateRow,
  SubscriptionOwnerRow,
  SubscriptionServerRow,
  SubscriptionStatusRow,
} from "./SubscriptionCardDetails";
import {
  PriceRecurrence,
  SubscriptionCardRoot,
  SubscriptionDetailGrid,
  SubscriptionDetailLabel,
  SubscriptionDetailValue,
} from "./styles";

interface Props {
  subscription: ISubscriptionExtended;
}

const SubscriptionCardStripe = ({ subscription }: Props) => {
  const user = useFetchUserQuery();
  const [dispatchManageSubscription, manageSubscription] =
    useDoSubscriptionManageMutation();

  if (manageSubscription.isLoading) {
    return (
      <Loader width={500} height={115}>
        <rect cx="0" cy="0" width="500" height="115" rx={3} ry={3} />
      </Loader>
    );
  }
  if (manageSubscription.isSuccess && manageSubscription.data) {
    window.location.href = manageSubscription.data.url;
  }

  if (!subscription.stripe) return <div>Invalid subscription data</div>;

  const { owner, expires, server, stripe } = subscription;
  const { price } = stripe;

  return (
    <SubscriptionCardRoot>
      <Card.Body>
        <SubscriptionDetailGrid>
          <SubscriptionStatusRow status={stripe.status} />

          <SubscriptionDateRow label="Period End:" date={expires} />

          <SubscriptionDateRow
            label="Next Renew:"
            date={stripe.current_period_end * 1000}
          />

          <SubscriptionDetailLabel>Amount:</SubscriptionDetailLabel>
          <SubscriptionDetailValue>
            <Stack direction="horizontal" gap={1}>
              <span>
                {getCurrency(price.price / 100, {
                  currency: price.currency,
                })}
              </span>
              <span>/</span>
              <PriceRecurrence>
                {price.recurrence.count} {price.recurrence.interval}
              </PriceRecurrence>
            </Stack>
          </SubscriptionDetailValue>

          {owner && <SubscriptionOwnerRow owner={owner} />}

          {server && <SubscriptionServerRow server={server} />}
        </SubscriptionDetailGrid>
      </Card.Body>

      <Card.Footer>
        <Stack
          aria-label="subscription-actions"
          direction="horizontal"
          gap={2}
          className="justify-content-end"
        >
          <SubscriptionAdmin subscription={subscription} />

          <Button
            disabled={subscription.owner?.id !== user.data?.id}
            variant="danger"
            onClick={() =>
              dispatchManageSubscription({
                subscriptionId: subscription.id,
                customerId: stripe.customer,
                serverId: subscription.server?.id,
              })
            }
          >
            <FontAwesomeIcon icon={faStripe} className="s-2" />
            <div>Manage</div>
          </Button>

          <SubscriptionAssign
            currentServerId={server?.id}
            subscription={subscription}
          />
        </Stack>
      </Card.Footer>
    </SubscriptionCardRoot>
  );
};

export default SubscriptionCardStripe;
