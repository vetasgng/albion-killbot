import LoadError from "components/LoadError";
import Settings from "components/Settings";
import Loader from "components/common/Loader";
import ChannelInput from "components/dashboard/ChannelInput";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { capitalize } from "helpers/utils";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useFetchServerQuery,
  useGetConstantsQuery,
  useTestNotificationSettingsMutation,
} from "store/api";
import {
  setAssistsChannel,
  setAssistsEnabled,
  setAssistsMode,
  setAssistsProvider,
} from "store/settings";

const AssistsPage = () => {
  const { serverId = "" } = useParams();

  const dispatch = useAppDispatch();
  const constants = useGetConstantsQuery();
  const server = useFetchServerQuery(serverId);
  const assists = useAppSelector((state) => state.settings.assists);
  const [dispatchTestNotification, testNotification] =
    useTestNotificationSettingsMutation();

  if (server.isFetching || constants.isFetching) return <Loader />;
  if (!server.data || !constants.data) return <LoadError />;

  const { modes, providers } = constants.data;
  const { channels } = server.data;

  return (
    <Settings>
      <Stack gap={2}>
        <Form.Group controlId="assists-enabled">
          <Form.Check
            type="switch"
            label="Enabled"
            checked={assists.enabled}
            onChange={(e) => dispatch(setAssistsEnabled(e.target.checked))}
          />
        </Form.Group>

        <Row className="g-2 align-items-end">
          <Col xs={12} md={true}>
            <Form.Group controlId="assists-channel">
              <Form.Label>Notification Channel</Form.Label>
              <ChannelInput
                aria-label="Assists channel"
                disabled={!assists.enabled}
                availableChannels={channels}
                value={assists.channel}
                onChannelChange={(channelId) =>
                  dispatch(setAssistsChannel(channelId))
                }
              />
            </Form.Group>
          </Col>
          <Col xs={12} md="auto">
            <Button
              disabled={!assists.enabled || testNotification.isLoading}
              variant="secondary"
              type="button"
              onClick={() => {
                dispatchTestNotification({
                  serverId,
                  type: "assists",
                  channelId: assists.channel,
                  mode: assists.mode,
                });
              }}
            >
              Test Notification
            </Button>
          </Col>
        </Row>

        <Form.Group controlId="assists-mode">
          <Form.Label>Mode</Form.Label>
          <Form.Select
            aria-label="Notification mode"
            disabled={!assists.enabled}
            value={assists.mode}
            onChange={(e) => dispatch(setAssistsMode(e.target.value))}
          >
            {modes.map((mode) => (
              <option key={mode} value={mode}>
                {capitalize(mode)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="assists-provider">
          <Form.Label>Link Provider</Form.Label>
          <Form.Select
            aria-label="Links provider"
            disabled={!assists.enabled}
            value={assists.provider}
            onChange={(e) => dispatch(setAssistsProvider(e.target.value))}
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
    </Settings>
  );
};

export default AssistsPage;
