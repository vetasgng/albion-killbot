import NotificationChannelSettings from "components/dashboard/NotificationChannelSettings";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { getFrequency } from "helpers/utils";
import { Col, Form, Row, Stack } from "react-bootstrap";
import {
  setRankingsChannel,
  setRankingsDaily,
  setRankingsEnabled,
  setRankingsMonthly,
  setRankingsWeekly,
} from "store/settings";
import { IConstants } from "types/constants";
import { IChannel } from "types/server";

interface RankingModeSelectProps {
  id: string;
  label: string;
  ariaLabel: string;
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
  rankingModes: IConstants["rankingModes"];
}

const RankingModeSelect = ({
  id,
  label,
  ariaLabel,
  disabled,
  value,
  onChange,
  rankingModes,
}: RankingModeSelectProps) => (
  <Form.Group controlId={id}>
    <Form.Label>{label}</Form.Label>
    <Form.Select
      aria-label={ariaLabel}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {rankingModes.map((rankingMode) => (
        <option key={rankingMode} value={rankingMode}>
          {getFrequency(rankingMode)}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
);

interface RankingsSettingsFormProps {
  serverId: string;
  channels: IChannel[];
  rankingModes: IConstants["rankingModes"];
}

const RankingsSettingsForm = ({
  serverId,
  channels,
  rankingModes,
}: RankingsSettingsFormProps) => {
  const dispatch = useAppDispatch();
  const rankings = useAppSelector((state) => state.settings.rankings);

  return (
    <Stack gap={2}>
      <NotificationChannelSettings
        idPrefix="rankings"
        channelAriaLabel="Rankings channel"
        enabled={rankings.enabled}
        onEnabledChange={(enabled) => dispatch(setRankingsEnabled(enabled))}
        channel={rankings.channel}
        onChannelChange={(channelId) => dispatch(setRankingsChannel(channelId))}
        channels={channels}
        serverId={serverId}
        notificationType="rankings"
      />

      <Row className="gy-2">
        <Col xs={12}>
          <RankingModeSelect
            id="rankings-daily"
            label="Daily PvP Ranking"
            ariaLabel="Daily PvP ranking mode select"
            disabled={!rankings.enabled}
            value={rankings.daily}
            onChange={(value) => dispatch(setRankingsDaily(value))}
            rankingModes={rankingModes}
          />
        </Col>
        <Col xs={12}>
          <RankingModeSelect
            id="rankings-weekly"
            label="Weekly PvP Ranking"
            ariaLabel="Weekly PvP ranking mode select"
            disabled={!rankings.enabled}
            value={rankings.weekly}
            onChange={(value) => dispatch(setRankingsWeekly(value))}
            rankingModes={rankingModes}
          />
        </Col>
        <Col xs={12}>
          <RankingModeSelect
            id="rankings-monthly"
            label="Monthly PvP Ranking"
            ariaLabel="Monthly PvP ranking mode select"
            disabled={!rankings.enabled}
            value={rankings.monthly}
            onChange={(value) => dispatch(setRankingsMonthly(value))}
            rankingModes={rankingModes}
          />
        </Col>
      </Row>
    </Stack>
  );
};

export default RankingsSettingsForm;
