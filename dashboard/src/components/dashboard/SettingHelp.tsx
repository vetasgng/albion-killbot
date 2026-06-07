import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import styled from "styled-components";

const HelpImage = styled.img`
  max-width: 100%;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
`;

interface SettingHelpProps {
  title: string;
  children: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

const SettingHelp = ({
  title,
  children,
  imageSrc,
  imageAlt,
}: SettingHelpProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        className="btn-icon"
        variant="secondary"
        size="sm"
        type="button"
        aria-label={`Help: ${title}`}
        onClick={() => setShow(true)}
      >
        <FontAwesomeIcon icon={faQuestionCircle} />
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={3}>
            <div>{children}</div>
            {imageSrc && <HelpImage src={imageSrc} alt={imageAlt ?? title} />}
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Got it
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettingHelp;
