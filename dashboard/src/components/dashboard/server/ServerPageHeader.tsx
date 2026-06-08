import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ServerNavItem } from "constants/serverNav";
import {
  PageDescription,
  PageHeaderContent,
  PageHeaderRoot,
  PagePremiumBadge,
  PageTitle,
  PageTitleIcon,
  PageTitleRow,
} from "./styles";

interface ServerPageHeaderProps {
  item?: ServerNavItem;
}

const ServerPageHeader = ({ item }: ServerPageHeaderProps) => {
  return (
    <PageHeaderRoot>
      <PageHeaderContent>
        <PageTitleRow>
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
