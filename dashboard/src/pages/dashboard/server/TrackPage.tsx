import LoadError from "components/LoadError";
import TrackEmptyState from "components/dashboard/TrackEmptyState";
import TrackSaveBar from "components/dashboard/TrackSaveBar";
import Loader from "components/common/Loader";
import Search from "components/Search";
import TrackList from "components/TrackList";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { useEffect } from "react";
import { Alert, Card, Stack } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useFetchServerQuery, useUpdateTrackMutation } from "store/api";
import { loadTrack } from "store/track";
import { TRACK_TYPE } from "types/track";

const TrackPage = () => {
  const { serverId = "" } = useParams();
  const server = useFetchServerQuery(serverId);
  const track = useAppSelector((state) => state.track);
  const dispatch = useAppDispatch();
  const [dispatchUpdateTrack, updateTrack] = useUpdateTrackMutation();

  useEffect(() => {
    if (server?.data?.track) {
      dispatch(loadTrack(server.data.track));
    }
  }, [dispatch, server.data?.track]);

  if (server.isLoading) return <Loader />;
  if (!server.data) return <LoadError />;

  const { id, limits, settings, subscription } = server.data;

  const hasOverLimitItems =
    (limits?.players && track.players.length > limits.players) ||
    (limits?.guilds && track.guilds.length > limits.guilds) ||
    (limits?.alliances && track.alliances.length > limits.alliances);
  const isPremium =
    subscription &&
    (subscription.expires === "never" ||
      new Date(subscription.expires).getTime() > new Date().getTime());
  const hasNoConfiguredTrackChannels =
    !settings.kills.channel &&
    !settings.deaths.channel &&
    !settings.assists.channel;
  const emptyList =
    track.players.length === 0 &&
    track.guilds.length === 0 &&
    track.alliances.length === 0;
  const totalTracked =
    track.players.length + track.guilds.length + track.alliances.length;
  const trackSections = [
    { type: TRACK_TYPE.PLAYERS, limit: limits.players, list: track.players },
    { type: TRACK_TYPE.GUILDS, limit: limits.guilds, list: track.guilds },
    {
      type: TRACK_TYPE.ALLIANCES,
      limit: limits.alliances,
      list: track.alliances,
    },
  ].filter(({ list }) => !emptyList && list.length > 0);

  return (
    <Stack gap={3}>
      {hasOverLimitItems ? (
        <Alert variant="danger" className="m-0">
          Items <span className="text-danger">over the limit</span> will not
          generate notifications. To increase your limits, please check the{" "}
          <Link to="/premium">Premium</Link> page to buy or assign a
          subscription.
        </Alert>
      ) : (
        !isPremium && (
          <Alert variant="info" className="m-0">
            Want to have more slots to track? To increase your limits, please
            check the <Link to="/premium">Premium</Link> page to buy or assign a
            subscription.
          </Alert>
        )
      )}

      {hasNoConfiguredTrackChannels && (
        <Alert variant="warning" className="m-0">
          <b>Warning: </b>
          <span>
            You do not have configured a channel to display kills, deaths, or
            assist notifications. Please go to the{" "}
          </span>
          <Link to={`/dashboard/${id}/kills`}>notification settings</Link>
          <span> page to set up notification channels.</span>
        </Alert>
      )}

      <Search limits={limits} />

      <Card className="tracked-entities-card">
        {!emptyList && (
          <Card.Header className="tracked-entities-card-header d-flex justify-content-between align-items-center py-2">
            <span>Tracked entities</span>
            <span className="text-muted small">{totalTracked} total</span>
          </Card.Header>
        )}

        <Stack gap={3} className="p-2">
          {trackSections.map(({ type, limit, list }) => (
            <TrackList key={type} type={type} limit={limit} list={list} />
          ))}

          {emptyList && <TrackEmptyState />}
        </Stack>
      </Card>

      <TrackSaveBar
        show={track.changed}
        isSaving={updateTrack.isLoading}
        onReset={() => {
          if (server.data?.track) dispatch(loadTrack(server.data.track));
        }}
        onSave={() => dispatchUpdateTrack({ serverId: id, track })}
      />
    </Stack>
  );
};

export default TrackPage;
