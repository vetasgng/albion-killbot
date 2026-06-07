import { getSubscriptionStatus } from "helpers/subscriptions";
import { Card, Stack } from "react-bootstrap";
import { ISubscriptionExtended } from "types/subscription";
import SubscriptionAdmin from "./SubscriptionAdmin";
import SubscriptionAssign from "./SubscriptionAssign";
import {
  SubscriptionDateRow,
  SubscriptionOwnerRow,
  SubscriptionServerRow,
  SubscriptionStatusRow,
} from "./SubscriptionCardDetails";
import { SubscriptionCardRoot, SubscriptionDetailGrid } from "./styles";

interface Props {
  subscription: ISubscriptionExtended;
}

const SubscriptionCard = ({ subscription }: Props) => {
  const { owner, server } = subscription;

  return (
    <SubscriptionCardRoot>
      <Card.Body>
        <SubscriptionDetailGrid>
          <SubscriptionStatusRow status={getSubscriptionStatus(subscription)} />

          {subscription.expires !== "never" && (
            <SubscriptionDateRow
              label="Period End:"
              date={subscription.expires}
            />
          )}

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

          <SubscriptionAssign
            currentServerId={server?.id}
            subscription={subscription}
          />
        </Stack>
      </Card.Footer>
    </SubscriptionCardRoot>
  );
};

export default SubscriptionCard;
