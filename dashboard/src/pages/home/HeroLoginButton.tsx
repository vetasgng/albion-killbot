import { faArrowRight, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DISCORD_OAUTH_URL } from "helpers/discord";
import {
  HeroDashboardHint,
  HeroDashboardLabel,
  HeroDashboardText,
  HeroLoginIconWrap,
  HeroLoginLink,
} from "./styles";

const HeroLoginButton = () => {
  return (
    <HeroLoginLink href={DISCORD_OAUTH_URL} rel="noreferrer">
      <HeroLoginIconWrap aria-hidden>
        <FontAwesomeIcon icon={faRightToBracket} />
      </HeroLoginIconWrap>
      <HeroDashboardText>
        <HeroDashboardLabel>
          Login
          <FontAwesomeIcon icon={faArrowRight} />
        </HeroDashboardLabel>
        <HeroDashboardHint>Access your dashboard</HeroDashboardHint>
      </HeroDashboardText>
    </HeroLoginLink>
  );
};

export default HeroLoginButton;
