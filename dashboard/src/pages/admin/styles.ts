import { Card, Nav } from "react-bootstrap";
import styled from "styled-components";

export const AdminNav = styled(Nav)`
  --bs-nav-pills-link-active-bg: ${({ theme }) => theme.nav.activeBackground};
  --bs-nav-pills-link-active-color: ${({ theme }) => theme.primary};

  gap: 0.375rem;

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.875rem;
    border-radius: ${({ theme }) => theme.layout.navItemRadius};
    color: ${({ theme }) => theme.text};
    font-size: 0.9rem;
    transition: color 0.15s ease, background-color 0.15s ease;

    &:hover {
      color: ${({ theme }) => theme.primary};
      background-color: rgba(255, 255, 255, 0.04);
    }

    &.active {
      background-color: ${({ theme }) => theme.nav.activeBackground} !important;
      color: ${({ theme }) => theme.primary} !important;
    }
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.lg}) {
    flex-direction: column;
    width: 100%;

    .nav-item {
      width: 100%;
    }

    .nav-link {
      width: 100%;
    }
  }
`;

export const AdminSectionTitle = styled.h2`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.text};
`;

export const AdminFilterPanel = styled(Card)`
  background-color: ${({ theme }) => theme.surfaceElevated};
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.05)
  );
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  box-shadow: none;

  .card-body {
    padding: 1rem;
  }
`;

export const AdminFilterFooter = styled(Card.Footer)`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: rgba(255, 255, 255, 0.03);
  border-color: ${({ theme }) => theme.borderSubtle};
`;

export const AdminDetailRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.5rem;
`;

export const AdminDetailLabel = styled.span`
  color: ${({ theme }) => theme.subtleText};
  font-size: 0.9rem;
  flex-shrink: 0;
`;

export const AdminDetailValue = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 0.9rem;
  word-break: break-word;

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: underline;
    text-underline-offset: 0.15em;

    &:visited {
      color: ${({ theme }) => theme.primary};
    }

    &:hover {
      color: ${({ theme }) => theme.text};
    }
  }
`;

export const AdminDetailSecondary = styled.span`
  color: ${({ theme }) => theme.subtleText};
  font-size: 0.85rem;
`;

export const AdminDropdownMenu = styled.div`
  &.dropdown-menu {
    padding: 0.375rem;
    background-color: ${({ theme }) => theme.surfaceElevated};
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.05)
    );
    border: 1px solid ${({ theme }) => theme.borderSubtle};
    border-radius: ${({ theme }) => theme.layout.navItemRadius};
    box-shadow: 0 8px 24px rgb(0 0 0 / 35%);

    .dropdown-item {
      padding: 0.5rem 0.75rem;
      border-radius: calc(
        ${({ theme }) => theme.layout.navItemRadius} - 0.125rem
      );
      color: ${({ theme }) => theme.text};
      font-size: 0.9rem;

      &:hover,
      &:focus {
        color: ${({ theme }) => theme.primary};
        background-color: rgba(255, 255, 255, 0.06);
      }
    }
  }
`;
