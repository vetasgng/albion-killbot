import UnsavedChangesBar from "components/dashboard/UnsavedChangesBar";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import React, { ReactNode, useEffect } from "react";
import { Alert, Card, Form, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFetchServerQuery, useUpdateSettingsMutation } from "store/api";
import { loadSettings } from "store/settings";
import { ISettings } from "types/settings";

interface PageAlert {
  show?: boolean;
  variant: string;
  message: ReactNode;
}

interface SettingsPageProps {
  alerts?: PageAlert[];
  children?: ReactNode;
}

const Settings = ({ alerts, children }: SettingsPageProps) => {
  const { serverId = "" } = useParams();

  const server = useFetchServerQuery(serverId);
  const [dispatchUpdateSettings, updateSettings] = useUpdateSettingsMutation();
  const { changed, ...settings } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (server?.data?.settings) {
      dispatch(loadSettings(server.data.settings));
    }
  }, [dispatch, server.data?.settings]);

  const handleSave = () => {
    dispatchUpdateSettings({ serverId, settings: settings as ISettings });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (changed) handleSave();
  };

  const renderAlert = (alert: PageAlert, index: number) => {
    if (alert.show !== undefined && !alert.show) return;
    return (
      <Alert key={index} variant={alert.variant}>
        {alert.message}
      </Alert>
    );
  };

  return (
    <Stack gap={2}>
      {alerts?.map(renderAlert)}
      <Card>
        <Form onSubmit={handleSubmit}>
          <Card.Body>{children}</Card.Body>
        </Form>
      </Card>

      <UnsavedChangesBar
        show={changed}
        isSaving={updateSettings.isLoading}
        onReset={() => {
          if (server.data?.settings)
            dispatch(loadSettings(server.data.settings));
        }}
        onSave={handleSave}
        description="Save to apply your settings on Discord."
      />
    </Stack>
  );
};

export default Settings;
