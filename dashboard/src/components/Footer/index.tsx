import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DISCORD_SERVER_URL } from "helpers/discord";
import {
  FooterCopyright,
  FooterIconLink,
  FooterRoot,
  StyledFooter,
} from "./styles";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <FooterRoot>
      <StyledFooter>
        <div className="footer-spacing d-none d-lg-flex" />
        <FooterCopyright>
          <div>© {year} Black River Gaming</div>
          <div>All rights reserved</div>
        </FooterCopyright>
        <div className="footer-icons">
          <FooterIconLink
            href={DISCORD_SERVER_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Join Discord server"
          >
            <FontAwesomeIcon icon={faDiscord} size="2x" />
          </FooterIconLink>
          <FooterIconLink
            href="https://github.com/black-river-gaming/albion-killbot"
            target="_blank"
            rel="noreferrer"
            aria-label="View on GitHub"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </FooterIconLink>
        </div>
      </StyledFooter>
    </FooterRoot>
  );
};

export default Footer;
