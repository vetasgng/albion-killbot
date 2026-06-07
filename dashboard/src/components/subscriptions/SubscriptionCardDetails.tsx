import { getServerPictureUrl, getUserPictureUrl } from "helpers/discord";
import { Link } from "react-router-dom";
import { ServerBase } from "types/server";
import { User } from "types/user";
import SubscriptionStatusBadge from "./SubscriptionStatusBadge";
import {
  SubscriptionAvatar,
  SubscriptionDetailLabel,
  SubscriptionDetailValue,
  SubscriptionEntityRow,
} from "./styles";

export const formatSubscriptionDate = (date: Date | string | number) => {
  return new Date(date).toLocaleDateString(undefined, {
    day: "2-digit",
    weekday: "long",
    month: "short",
    year: "numeric",
  });
};

interface SubscriptionStatusRowProps {
  status: string;
}

export const SubscriptionStatusRow = ({
  status,
}: SubscriptionStatusRowProps) => (
  <>
    <SubscriptionDetailLabel>Status:</SubscriptionDetailLabel>
    <SubscriptionDetailValue>
      <SubscriptionStatusBadge status={status} />
    </SubscriptionDetailValue>
  </>
);

interface SubscriptionOwnerRowProps {
  owner: User;
}

export const SubscriptionOwnerRow = ({ owner }: SubscriptionOwnerRowProps) => (
  <>
    <SubscriptionDetailLabel>Owner:</SubscriptionDetailLabel>
    <SubscriptionDetailValue>
      <SubscriptionEntityRow>
        <SubscriptionAvatar
          roundedCircle
          src={getUserPictureUrl(owner)}
          alt={owner.username}
        />
        <span>{owner.username || owner.id}</span>
      </SubscriptionEntityRow>
    </SubscriptionDetailValue>
  </>
);

interface SubscriptionServerRowProps {
  server: ServerBase;
}

export const SubscriptionServerRow = ({
  server,
}: SubscriptionServerRowProps) => (
  <>
    <SubscriptionDetailLabel>Server:</SubscriptionDetailLabel>
    <SubscriptionDetailValue>
      <Link to={`/dashboard/${server.id}/subscription`}>
        <SubscriptionEntityRow>
          <SubscriptionAvatar
            roundedCircle
            src={getServerPictureUrl(server, true)}
            alt={server.name}
          />
          <span>{server.name}</span>
        </SubscriptionEntityRow>
      </Link>
    </SubscriptionDetailValue>
  </>
);

interface SubscriptionDateRowProps {
  label: string;
  date: Date | string | number;
}

export const SubscriptionDateRow = ({
  label,
  date,
}: SubscriptionDateRowProps) => (
  <>
    <SubscriptionDetailLabel>{label}</SubscriptionDetailLabel>
    <SubscriptionDetailValue>
      {formatSubscriptionDate(date)}
    </SubscriptionDetailValue>
  </>
);
