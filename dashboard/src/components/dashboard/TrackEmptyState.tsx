import styled from "styled-components";

const EmptyStateRoot = styled.div`
  padding: 1.5rem 1rem;
  text-align: center;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  border: 1px dashed ${({ theme }) => theme.borderSubtle};
  background-color: rgba(255, 255, 255, 0.02);
`;

const EmptyStateTitle = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const EmptyStateSteps = styled.ol`
  margin: 0;
  padding-left: 1.25rem;
  text-align: left;
  display: inline-block;
  color: ${({ theme }) => theme.subtleText};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const EmptyStateLink = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const TrackEmptyState = () => {
  return (
    <EmptyStateRoot>
      <EmptyStateTitle>No entities tracked yet</EmptyStateTitle>
      <EmptyStateSteps>
        <li>
          <EmptyStateLink href="#track-search">Search</EmptyStateLink> for a
          player, guild, or alliance above
        </li>
        <li>Add it from the search results</li>
        <li>
          Click <strong>Save changes</strong> to apply on Discord
        </li>
      </EmptyStateSteps>
    </EmptyStateRoot>
  );
};

export default TrackEmptyState;
