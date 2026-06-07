import NotificationChannelSettings from "components/dashboard/NotificationChannelSettings";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { Col, Form, Row, Stack } from "react-bootstrap";
import {
  setBattlesChannel,
  setBattlesEnabled,
  setBattlesProvider,
  setBattlesThresholdAlliances,
  setBattlesThresholdGuilds,
  setBattlesThresholdPlayers,
} from "store/settings";
import { IConstants } from "types/constants";
import { IChannel } from "types/server";

interface BattlesSettingsFormProps {
  serverId: string;
  channels: IChannel[];
  providers: IConstants["providers"];
}

const BattlesSettingsForm = ({
  serverId,
  channels,
  providers,
}: BattlesSettingsFormProps) => {
  const dispatch = useAppDispatch();
  const battles = useAppSelector((state) => state.settings.battles);

  return (
    <Stack gap={2}>
      <NotificationChannelSettings
        idPrefix="battles"
        channelAriaLabel="Battles channel"
        enabled={battles.enabled}
        onEnabledChange={(enabled) => dispatch(setBattlesEnabled(enabled))}
        channel={battles.channel}
        onChannelChange={(channelId) => dispatch(setBattlesChannel(channelId))}
        channels={channels}
        serverId={serverId}
        notificationType="battles"
      />

      <Row className="g-2">
        <Col xs={12} sm={4}>
          <Form.Group controlId="threshold-players">
            <Form.Label>Minimum Players</Form.Label>
            <Form.Control
              type="number"
              value={battles.threshold.players || 0}
              onChange={(e) =>
                dispatch(setBattlesThresholdPlayers(Number(e.target.value)))
              }
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={4}>
          <Form.Group controlId="threshold-guilds">
            <Form.Label>Minimum Guilds</Form.Label>
            <Form.Control
              type="number"
              value={battles.threshold.guilds || 0}
              onChange={(e) =>
                dispatch(setBattlesThresholdGuilds(Number(e.target.value)))
              }
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={4}>
          <Form.Group controlId="threshold-alliances">
            <Form.Label>Minimum Alliances</Form.Label>
            <Form.Control
              type="number"
              value={battles.threshold.alliances || 0}
              onChange={(e) =>
                dispatch(setBattlesThresholdAlliances(Number(e.target.value)))
              }
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="battles-provider">
        <Form.Label>Link Provider</Form.Label>
        <Form.Select
          aria-label="Links provider"
          disabled={!battles.enabled}
          value={battles.provider}
          onChange={(e) => dispatch(setBattlesProvider(e.target.value))}
        >
          {providers
            .filter((provider) => provider.battles)
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

export default BattlesSettingsForm;
