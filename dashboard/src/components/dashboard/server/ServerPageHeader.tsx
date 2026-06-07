import { faBars, faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ServerNavItem } from "constants/serverNav";
import {
  PageDescription,
  PageHeaderContent,
  PageHeaderRoot,
  PageMenuButton,
  PagePremiumBadge,
  PageTitle,
  PageTitleIcon,
  PageTitleRow,
} from "./styles";

interface ServerPageHeaderProps {
  item?: ServerNavItem;
  onMenuClick?: () => void;
}

const ServerPageHeader = ({ item, onMenuClick }: ServerPageHeaderProps) => {
  return (
    <PageHeaderRoot>
      <PageHeaderContent>
        <PageTitleRow>
          {onMenuClick && (
            <PageMenuButton
              type="button"
              className="d-lg-none"
              aria-label="Open navigation menu"
              onClick={onMenuClick}
            >
              <FontAwesomeIcon icon={faBars} />
            </PageMenuButton>
          )}
          {item?.icon && (
            <PageTitleIcon aria-hidden="true">
              <FontAwesomeIcon icon={item.icon} />
            </PageTitleIcon>
          )}
          <PageTitle>{item?.name ?? "Server"}</PageTitle>
          {item?.premium && (
            <PagePremiumBadge>
              <FontAwesomeIcon icon={faCrown} />
              Premium
            </PagePremiumBadge>
          )}
        </PageTitleRow>
        {item?.description && (
          <PageDescription>{item.description}</PageDescription>
        )}
      </PageHeaderContent>
    </PageHeaderRoot>
  );
};

export default ServerPageHeader;
