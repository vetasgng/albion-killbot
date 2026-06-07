import { faCrown, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContentPanelRoot, PageTitle } from "components/layout/ContentPanel";
import { Container, Nav, Stack } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { AdminNav } from "./styles";

const AdminPage = () => {
  return (
    <Container fluid className="py-3">
      <ContentPanelRoot>
        <Stack gap={3}>
          <PageTitle>Admin</PageTitle>

          <AdminNav variant="pills">
            <Nav.Item>
              <Nav.Link as={NavLink} to="servers">
                <FontAwesomeIcon icon={faList} size="sm" />
                <span>Servers</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={NavLink} to="subscriptions">
                <FontAwesomeIcon icon={faCrown} size="sm" />
                <span>Subscriptions</span>
              </Nav.Link>
            </Nav.Item>
          </AdminNav>

          <Outlet />
        </Stack>
      </ContentPanelRoot>
    </Container>
  );
};

export default AdminPage;
