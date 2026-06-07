import { Badge, Button, ButtonGroup, ListGroup, Stack } from "react-bootstrap";
import { useGetConstantsQuery } from "store/api";
import { ITrackList } from "types/track";

interface ISearchResultListsProps {
  title: string;
  list: ITrackList["players" | "guilds" | "alliances"];
  track?: ITrackList["players" | "guilds" | "alliances"];
  onTrackClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ITrackList["players" | "guilds" | "alliances"][number]
  ) => void;
}

const SearchResultsList = ({
  title,
  list,
  track,
  onTrackClick,
}: ISearchResultListsProps) => {
  const constants = useGetConstantsQuery();

  return (
    <ListGroup className="entity-list entity-list--search">
      <ListGroup.Item
        variant="secondary"
        className="entity-list-header d-flex justify-content-between align-items-baseline"
      >
        <div>{title}</div>
        <span className="entity-list-header-hint">From search</span>
      </ListGroup.Item>

      {list.map((item) => {
        if (!constants.data) return null;
        const server = constants.data.servers.find(
          (server) => server.id === item.server
        );
        if (!server) return null;

        const { id, name } = item;
        const isTracked =
          track &&
          track.some((item) => item.id === id && item.server === server.id);

        return (
          <ListGroup.Item
            key={id}
            className={`paper entity-item${
              isTracked ? " entity-item--added" : ""
            }`}
          >
            <div className="track-list-item">
              <Stack className="track-list-item-info">
                <span className="id-text">{id}</span>
                <Stack
                  direction="horizontal"
                  gap={2}
                  className="d-flex align-items-baseline flex-wrap"
                >
                  <div>{name}</div>
                  {server && <Badge bg={server.id}>{server.name}</Badge>}
                </Stack>
              </Stack>
              <ButtonGroup size="sm" className="track-list-item-actions">
                {isTracked ? (
                  <Button size="sm" variant="secondary" disabled>
                    Added
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="success"
                    onClick={(e) => {
                      return onTrackClick(e, item);
                    }}
                  >
                    Add
                  </Button>
                )}
              </ButtonGroup>
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default SearchResultsList;
