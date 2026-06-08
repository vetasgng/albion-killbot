import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AmbientPageShell from "components/layout/AmbientPageShell";
import {
  PremiumEyebrow,
  PremiumLoginPanel,
  PremiumPageContent,
  PremiumSubtitle,
  PremiumTitle,
} from "./styles";

const PremiumLoginGate = () => {
  return (
    <AmbientPageShell compact>
      <PremiumPageContent>
        <PremiumLoginPanel>
          <PremiumEyebrow>
            <FontAwesomeIcon icon={faCrown} aria-hidden />
            Albion Killbot Premium
          </PremiumEyebrow>
          <PremiumTitle>Premium plans</PremiumTitle>
          <PremiumSubtitle>
            Sign in with Discord using the button below to view available plans
            and upgrade your server.
          </PremiumSubtitle>
        </PremiumLoginPanel>
      </PremiumPageContent>
    </AmbientPageShell>
  );
};

export default PremiumLoginGate;
