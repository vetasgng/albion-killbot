import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { Stack } from "react-bootstrap";
import { addToast } from "store/toast";
import { trackAlliance, trackGuild, trackPlayer } from "store/track";
import { Limits } from "types/limits";
import { ISearchResults } from "types/track";
import SearchResultsList from "./SearchResultsList";

interface ISearchResultsProps {
  limits: Limits;
  searchResults?: ISearchResults;
}

const SearchResults = ({ limits, searchResults }: ISearchResultsProps) => {
  const track = useAppSelector((state) => state.track);
  const dispatch = useAppDispatch();

  const showError = (message: string) =>
    dispatch(addToast({ theme: "danger", message }));

  const showSaveReminder = () =>
    dispatch(
      addToast({
        theme: "warning",
        message: "Added to your list. Save changes to apply on Discord.",
      })
    );

  const doTrackPlayer = (player: ISearchResults["players"][number]) => {
    const limit = limits.players || 0;

    if (track.players.length >= limit)
      return showError(`Maximum limit of ${limit} player(s) exceeded.`);
    dispatch(trackPlayer(player));
    showSaveReminder();
  };

  const doTrackGuild = (guild: ISearchResults["guilds"][number]) => {
    const limit = limits.guilds || 0;

    if (track.guilds.length >= limit)
      return showError(`Maximum limit of ${limit} guild(s) exceeded.`);
    dispatch(trackGuild(guild));
    showSaveReminder();
  };

  const doTrackAlliance = (alliance: ISearchResults["alliances"][number]) => {
    const limit = limits.alliances || 0;

    if (track.alliances.length >= limit)
      return showError(`Maximum limit of ${limit} alliances(s) exceeded.`);
    dispatch(trackAlliance(alliance));
    showSaveReminder();
  };

  if (
    !searchResults ||
    (searchResults.players.length === 0 &&
      searchResults.guilds.length === 0 &&
      searchResults.alliances.length === 0)
  )
    return (
      <p className="text-muted text-center mb-0 py-2 px-3">
        Nothing was found. Try a different search term or alliance ID.
      </p>
    );

  const { players, guilds, alliances } = searchResults;

  return (
    <Stack gap={3}>
      {players.length > 0 && (
        <SearchResultsList
          title="Players"
          list={players.slice(0, 5)}
          track={track.players}
          onTrackClick={(e, item) => doTrackPlayer(item)}
        />
      )}
      {guilds.length > 0 && (
        <SearchResultsList
          title="Guilds"
          list={guilds.slice(0, 5)}
          track={track.guilds}
          onTrackClick={(e, item) => doTrackGuild(item)}
        />
      )}
      {alliances.length > 0 && (
        <SearchResultsList
          title="Alliances"
          list={alliances.slice(0, 5)}
          track={track.alliances}
          onTrackClick={(e, item) => doTrackAlliance(item)}
        />
      )}
    </Stack>
  );
};

export default SearchResults;
