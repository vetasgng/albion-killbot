import { Card } from "react-bootstrap";
import styled, { css } from "styled-components";

export const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const DashboardHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.65rem;
  text-align: center;
  padding-bottom: 0.25rem;
`;

export const DashboardEyebrow = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
`;

export const DashboardIntro = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.subtleText};
  font-size: 0.95rem;
  line-height: 1.55;
  max-width: 34rem;
`;

export const DashboardSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DashboardSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};
`;

export const DashboardSectionTitle = styled.h2`
  margin: 0;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.subtleText};
`;

export const DashboardSectionCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.45rem;
  height: 1.45rem;
  padding: 0 0.4rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.borderSubtle};
`;

export const DashboardSectionHint = styled.p`
  margin: 0;
  font-size: 0.84rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.subtleText};
`;

export const DashboardSectionDivider = styled.hr`
  margin: 0;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.borderSubtle};
  opacity: 0.65;
`;

export const DashboardServerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15.5rem, 1fr));
  gap: 1.15rem;

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.lg}) {
    gap: 1.35rem;
  }
`;

const statusAccentStyles = {
  active: css`
    border-top-color: rgba(140, 233, 154, 0.72);

    &:hover {
      border-color: rgba(140, 233, 154, 0.35);
      box-shadow: 0 16px 34px rgba(0, 0, 0, 0.24),
        0 0 0 1px rgba(140, 233, 154, 0.12);
    }
  `,
  setup: css`
    border-top-color: rgba(
      ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
      0.72
    );

    &:hover {
      border-color: rgba(
        ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
        0.35
      );
      box-shadow: 0 16px 34px rgba(0, 0, 0, 0.24),
        0 0 0 1px
          rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.12);
    }
  `,
};

export const DashboardServerCard = styled(Card)<{
  $status: "active" | "setup";
}>`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-top-width: 3px;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.035) 0%,
      transparent 38%
    ),
    ${({ theme }) => theme.surfaceElevated};
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.14);
  transition: transform 0.22s ease, box-shadow 0.22s ease,
    border-color 0.22s ease;

  ${({ $status }) => statusAccentStyles[$status]}

  &:hover {
    transform: translateY(-4px);
  }
`;

export const DashboardServerHero = styled.div`
  position: relative;
  padding-bottom: 2.35rem;
`;

export const DashboardServerBanner = styled.div`
  position: relative;
  height: 5.5rem;
  overflow: hidden;
`;

export const DashboardServerBannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(12px) saturate(1.15);
  transform: scale(1.12);
  pointer-events: none;
  user-select: none;
`;

export const DashboardServerBannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.04) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
`;

export const DashboardServerIcon = styled.img`
  display: block;
  width: 4.25rem;
  height: 4.25rem;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.94);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.38);
  user-select: none;
  transition: transform 0.16s ease, box-shadow 0.16s ease;
`;

export const DashboardServerIconButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: 0;
  z-index: 2;
  transform: translateX(-50%);
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  line-height: 0;

  &:focus-visible {
    outline: 2px solid
      rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.85);
    outline-offset: 3px;
  }

  &:active ${DashboardServerIcon} {
    transform: scale(0.92);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.28);
  }
`;

export const DashboardServerStatus = styled.span<{
  $status: "active" | "setup";
}>`
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);

  ${({ $status }) =>
    $status === "active"
      ? css`
          color: #b2f2bb;
          background: rgba(51, 103, 59, 0.42);
          border-color: rgba(140, 233, 154, 0.35);
        `
      : css`
          color: ${({ theme }) => theme.primary};
          background: rgba(
            ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
            0.18
          );
          border-color: rgba(
            ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
            0.34
          );
        `}
`;

export const DashboardServerBody = styled(Card.Body)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.85rem 1rem 0.85rem;
  text-align: center;
`;

export const DashboardServerName = styled.h3`
  margin: 0;
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DashboardServerFooter = styled.div`
  padding: 0 1rem 1rem;

  .btn {
    width: 100%;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  a {
    display: block;
    text-decoration: none;
  }
`;

export const OtherServersPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.55rem;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  border: 1px dashed ${({ theme }) => theme.borderSubtle};
  background: rgba(255, 255, 255, 0.015);
`;

export const OtherServerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.72rem 0.9rem;
  border-radius: calc(${({ theme }) => theme.layout.navItemRadius} - 2px);
  border: 1px solid transparent;
  color: ${({ theme }) => theme.subtleText};
  cursor: default;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    border-color: ${({ theme }) => theme.borderSubtle};
  }
`;

export const OtherServerIcon = styled.img`
  display: block;
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  opacity: 0.78;
  filter: grayscale(0.15);
  user-select: none;
`;

export const OtherServerInfo = styled.div`
  min-width: 0;
  flex: 1;
`;

export const OtherServerName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.mutedText};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const OtherServerMeta = styled.div`
  margin-top: 0.1rem;
  font-size: 0.74rem;
  color: ${({ theme }) => theme.subtleText};
`;

export const OtherServerLock = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ theme }) => theme.subtleText};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${({ theme }) => theme.borderSubtle};
`;
