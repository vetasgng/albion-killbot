import { faChevronLeft, faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SERVER_NAV_SECTIONS } from "constants/serverNav";
import { getServerPictureUrl } from "helpers/discord";
import theme from "helpers/theme";
import { ServerBase } from "types/server";
import {
  ChangeServerLink,
  NavItemLabel,
  NavItemLink,
  NavSection,
  NavSectionLabel,
  NavSections,
  ServerIcon,
  ServerIdentity,
  ServerName,
} from "./styles";

interface ServerNavContentProps {
  server: ServerBase;
  showIdentity?: boolean;
  onNavigate?: () => void;
}

const ServerNavContent = ({
  server,
  showIdentity = true,
  onNavigate,
}: ServerNavContentProps) => {
  return (
    <>
      <ChangeServerLink to="/dashboard" onClick={onNavigate}>
        <FontAwesomeIcon icon={faChevronLeft} className="nav-icon" />
        Dashboard
      </ChangeServerLink>

      {showIdentity && (
        <ServerIdentity>
          <ServerIcon
            src={getServerPictureUrl(server, true)}
            alt={server.name}
          />
          <ServerName title={server.name}>{server.name}</ServerName>
        </ServerIdentity>
      )}

      <NavSections>
        {SERVER_NAV_SECTIONS.map((section) => (
          <NavSection key={section.id}>
            <NavSectionLabel>{section.label}</NavSectionLabel>
            {section.items.map((item) => (
              <NavItemLink key={item.path} to={item.path} onClick={onNavigate}>
                <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                <NavItemLabel>{item.name}</NavItemLabel>
                {item.premium && (
                  <FontAwesomeIcon icon={faCrown} color={theme.primary} />
                )}
              </NavItemLink>
            ))}
          </NavSection>
        ))}
      </NavSections>
    </>
  );
};

export default ServerNavContent;
