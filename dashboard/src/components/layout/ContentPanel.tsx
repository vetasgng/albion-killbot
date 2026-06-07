import styled from "styled-components";

export const ContentPanelRoot = styled.div`
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.layout.padding.panel.base};

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.md}) {
    padding: ${({ theme }) => theme.layout.padding.panel.md};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.lg}) {
    padding: ${({ theme }) => theme.layout.padding.panel.lg};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.xl}) {
    padding: ${({ theme }) => theme.layout.padding.panel.xl};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.xxl}) {
    padding: ${({ theme }) => theme.layout.padding.panel.xxl};
  }

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
    border-radius: ${({ theme }) => theme.layout.navItemRadius};
  }

  .card > .card-header:first-child {
    border-top-left-radius: ${({ theme }) => theme.layout.navItemRadius};
    border-top-right-radius: ${({ theme }) => theme.layout.navItemRadius};
  }

  .card > .card-footer:last-child {
    border-bottom-left-radius: ${({ theme }) => theme.layout.navItemRadius};
    border-bottom-right-radius: ${({ theme }) => theme.layout.navItemRadius};
  }

  .card-header {
    background-color: rgba(255, 255, 255, 0.03);
    border-color: ${({ theme }) => theme.borderSubtle};
    color: ${({ theme }) => theme.text};
  }

  .text-muted,
  .form-text {
    color: ${({ theme }) => theme.subtleText} !important;
  }

  .alert-info {
    background-color: rgba(
      ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
      0.12
    );
    border-color: rgba(
      ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
      0.3
    );
    color: ${({ theme }) => theme.text};
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

export const EmptyStateRoot = styled.div`
  padding: 1.5rem 1rem;
  text-align: center;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  border: 1px dashed ${({ theme }) => theme.borderSubtle};
  background-color: rgba(255, 255, 255, 0.02);
`;

export const EmptyStateTitle = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

export const EmptyStateText = styled.div`
  color: ${({ theme }) => theme.subtleText};
  font-size: 0.9rem;
  line-height: 1.5;
`;
