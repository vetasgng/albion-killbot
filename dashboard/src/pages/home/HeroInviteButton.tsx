import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerInviteUrl } from "helpers/discord";
import {
  HeroInviteHint,
  HeroInviteIconWrap,
  HeroInviteLabel,
  HeroInviteLink,
  HeroInviteText,
} from "./styles";

interface HeroInviteButtonProps {
  label?: string;
  hint?: string;
}

const HeroInviteButton = ({
  label = "Invite to Discord",
  hint = "Free · add bot in one click",
}: HeroInviteButtonProps) => {
  return (
    <HeroInviteLink href={getServerInviteUrl()} rel="noreferrer">
      <HeroInviteIconWrap aria-hidden>
        <FontAwesomeIcon icon={faDiscord} />
      </HeroInviteIconWrap>
      <HeroInviteText>
        <HeroInviteLabel>
          {label}
          <FontAwesomeIcon icon={faArrowRight} />
        </HeroInviteLabel>
        <HeroInviteHint>{hint}</HeroInviteHint>
      </HeroInviteText>
    </HeroInviteLink>
  );
};

export default HeroInviteButton;
