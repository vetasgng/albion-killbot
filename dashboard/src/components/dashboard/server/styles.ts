import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

export const LayoutRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 1rem 0;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

export const SidebarColumn = styled.aside`
  display: none;
  flex-shrink: 0;
  width: ${({ theme }) => theme.layout.sidebarWidth};

  @media (min-width: 992px) {
    display: block;
    position: sticky;
    top: 1rem;
    align-self: flex-start;
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
  }
`;

export const SidebarPanel = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.surface};
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.06),
      rgba(255, 255, 255, 0.06)
    ),
    linear-gradient(
      180deg,
      rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.08) 0%,
      transparent 35%
    );
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`;

export const MainColumn = styled.main`
  flex: 1;
  min-width: 0;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
`;

export const ContentPanel = styled.div`
  padding: 1.25rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.surface};
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0.04)
  );
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);

  .card {
    background-color: ${({ theme }) => theme.surfaceElevated};
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.05)
    );
    border: 1px solid ${({ theme }) => theme.borderSubtle};
    box-shadow: none;
  }

  .list-group {
    background-color: ${({ theme }) => theme.surfaceElevated};
    background-image: none;
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.borderSubtle};
  }

  .list-group-item {
    background-color: ${({ theme }) => theme.surfaceElevated};
    border-color: ${({ theme }) => theme.borderSubtle};

    &.list-group-item-secondary {
      background-color: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.text};
    }

    &.paper {
      background-color: rgba(255, 255, 255, 0.03);
      background-image: none;
    }
  }

  .id-text {
    color: ${({ theme }) => theme.subtleText};
    font-size: 11px;
    line-height: 1.2;
  }

  .text-muted,
  .form-text {
    color: ${({ theme }) => theme.subtleText} !important;
  }
`;

export const ServerIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid ${({ theme }) => theme.borderSubtle};
`;

export const ChangeServerLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.subtleText};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const ServerIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
  user-select: none;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 80%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
`;

export const ServerName = styled.div`
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NavSections = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.navSectionGap};
`;

export const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const NavSectionLabel = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.mutedText};
  padding: 0 0.75rem 0.25rem;
`;

export const NavItemLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.75rem;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  border-left: 3px solid transparent;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;

  &.active {
    background-color: ${({ theme }) => theme.nav.activeBackground};
    border-left-color: ${({ theme }) => theme.nav.activeBorder};
    color: ${({ theme }) => theme.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
    background-color: rgba(255, 255, 255, 0.05);
  }

  &.active:hover {
    background-color: ${({ theme }) => theme.nav.activeBackground};
  }

  svg.nav-icon {
    width: 1rem;
    flex-shrink: 0;
    text-align: center;
  }
`;

export const NavItemLabel = styled.span`
  flex: 1;
  font-size: 0.9rem;
`;

export const PageHeaderRoot = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};
`;

export const PageHeaderContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const PageTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.text};
`;

export const PageDescription = styled.p`
  margin: 0.375rem 0 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.subtleText};
  line-height: 1.4;
`;

export const ContentStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SubscriptionAlertSlot = styled.div`
  margin-bottom: 0.25rem;
`;
