import ChannelInput from "components/dashboard/ChannelInput";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { capitalize } from "helpers/utils";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useTestNotificationSettingsMutation } from "store/api";
import {
  setAssistsChannel,
  setAssistsEnabled,
  setAssistsMode,
  setAssistsProvider,
  setDeathsChannel,
  setDeathsEnabled,
  setDeathsMode,
  setDeathsProvider,
  setKillsChannel,
  setKillsEnabled,
  setKillsMode,
  setKillsProvider,
} from "store/settings";
import { IConstants } from "types/constants";
import { IChannel } from "types/server";

export type NotificationSettingsType = "kills" | "assists" | "deaths";

interface NotificationSettingsFormProps {
  type: NotificationSettingsType;
  serverId: string;
  channels: IChannel[];
  modes: IConstants["modes"];
  providers: IConstants["providers"];
}

const notificationConfig = {
  kills: {
    channelAriaLabel: "Kills channel",
    setEnabled: setKillsEnabled,
    setChannel: setKillsChannel,
    setMode: setKillsMode,
    setProvider: setKillsProvider,
  },
  assists: {
    channelAriaLabel: "Assists channel",
    setEnabled: setAssistsEnabled,
    setChannel: setAssistsChannel,
    setMode: setAssistsMode,
    setProvider: setAssistsProvider,
  },
  deaths: {
    channelAriaLabel: "Deaths channel",
    setEnabled: setDeathsEnabled,
    setChannel: setDeathsChannel,
    setMode: setDeathsMode,
    setProvider: setDeathsProvider,
  },
} as const;

const NotificationSettingsForm = ({
  type,
  serverId,
  channels,
  modes,
  providers,
}: NotificationSettingsFormProps) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings[type]);
  const [dispatchTestNotification, testNotification] =
    useTestNotificationSettingsMutation();
  const config = notificationConfig[type];

  return (
    <Stack gap={2}>
      <Form.Group controlId={`${type}-enabled`}>
        <Form.Check
          type="switch"
          label="Enabled"
          checked={settings.enabled}
          onChange={(e) => dispatch(config.setEnabled(e.target.checked))}
        />
      </Form.Group>

      <Row className="g-2 align-items-end">
        <Col xs={12} md={true}>
          <Form.Group controlId={`${type}-channel`}>
            <Form.Label>Notification Channel</Form.Label>
            <ChannelInput
              aria-label={config.channelAriaLabel}
              disabled={!settings.enabled}
              availableChannels={channels}
              value={settings.channel}
              onChannelChange={(channelId) =>
                dispatch(config.setChannel(channelId))
              }
            />
          </Form.Group>
        </Col>
        <Col xs={12} md="auto">
          <Button
            disabled={!settings.enabled || testNotification.isLoading}
            variant="secondary"
            type="button"
            onClick={() => {
              dispatchTestNotification({
                serverId,
                type,
                channelId: settings.channel,
                mode: settings.mode,
              });
            }}
          >
            Test Notification
          </Button>
        </Col>
      </Row>

      <Form.Group controlId={`${type}-mode`}>
        <Form.Label>Mode</Form.Label>
        <Form.Select
          aria-label="Notification mode"
          disabled={!settings.enabled}
          value={settings.mode}
          onChange={(e) => dispatch(config.setMode(e.target.value))}
        >
          {modes.map((mode) => (
            <option key={mode} value={mode}>
              {capitalize(mode)}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId={`${type}-provider`}>
        <Form.Label>Link Provider</Form.Label>
        <Form.Select
          aria-label="Links provider"
          disabled={!settings.enabled}
          value={settings.provider}
          onChange={(e) => dispatch(config.setProvider(e.target.value))}
        >
          {providers
            .filter((provider) => provider.events)
            .map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
    </Stack>
  );
};

export default NotificationSettingsForm;
