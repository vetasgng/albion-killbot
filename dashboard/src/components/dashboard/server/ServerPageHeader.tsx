import { faBars, faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ServerNavItem } from "constants/serverNav";
import { Badge, Button } from "react-bootstrap";
import {
  PageDescription,
  PageHeaderContent,
  PageHeaderRoot,
  PageTitle,
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
            <Button
              variant="secondary"
              className="d-lg-none"
              aria-label="Open navigation menu"
              onClick={onMenuClick}
            >
              <FontAwesomeIcon icon={faBars} />
            </Button>
          )}
          <PageTitle>{item?.name ?? "Server"}</PageTitle>
          {item?.premium && (
            <Badge bg="primary">
              <FontAwesomeIcon icon={faCrown} className="me-1" />
              Premium
            </Badge>
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
