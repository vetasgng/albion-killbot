import { faBug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoadErrorMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.subtleText};
  font-size: 0.95rem;
  line-height: 1.5;
`;

const LoadError = () => {
  return (
    <Stack gap={3} className="justify-content-center align-items-center py-5">
      <FontAwesomeIcon size="3x" icon={faBug} />
      <LoadErrorMessage>
        Failed to load this page. Refresh to try again, or return to the
        dashboard.
      </LoadErrorMessage>
      <Link to="/dashboard">
        <Button variant="secondary" size="sm">
          Back to Dashboard
        </Button>
      </Link>
    </Stack>
  );
};

export default LoadError;
