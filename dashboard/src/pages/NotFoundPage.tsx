import { ContentPanelRoot, PageTitle } from "components/layout/ContentPanel";
import { Button, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundMessage = styled.p`
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.subtleText};
  font-size: 0.95rem;
  line-height: 1.5;
`;

const NotFoundPage = () => {
  return (
    <Container fluid className="py-3">
      <ContentPanelRoot>
        <Stack gap={3} className="align-items-center py-4">
          <PageTitle>Page not found</PageTitle>
          <NotFoundMessage>
            The page you are looking for does not exist or may have been moved.
          </NotFoundMessage>
          <Stack
            direction="horizontal"
            gap={2}
            className="flex-wrap justify-content-center"
          >
            <Link to="/">
              <Button variant="secondary">Home</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="primary">Dashboard</Button>
            </Link>
          </Stack>
        </Stack>
      </ContentPanelRoot>
    </Container>
  );
};

export default NotFoundPage;
