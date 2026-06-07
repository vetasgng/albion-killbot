import { ContentPanelRoot, PageTitle } from "components/layout/ContentPanel";
import { ReactNode } from "react";
import { Alert, Container, Stack } from "react-bootstrap";

interface IAlert {
  show?: boolean;
  variant: string;
  message: ReactNode;
}

interface PageProps {
  alerts?: IAlert[];
  title: string;
  children: ReactNode;
}

const Page = ({ alerts, title, children }: PageProps) => {
  const renderAlert = (alert: IAlert, index: number) => {
    if (alert.show !== undefined && !alert.show) return;
    return (
      <Alert key={index} variant={alert.variant} className="m-0">
        {alert.message}
      </Alert>
    );
  };

  return (
    <Container fluid className="py-3">
      <ContentPanelRoot>
        <Stack gap={3}>
          {alerts?.map(renderAlert)}
          <PageTitle>{title}</PageTitle>
          <div>{children}</div>
        </Stack>
      </ContentPanelRoot>
    </Container>
  );
};

export default Page;
