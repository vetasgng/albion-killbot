import { Card, Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

export {
  AmbientAuroraLayer as HomeAuroraLayer,
  AmbientBackground as HomeBackground,
  AmbientGlowOrb as HomeGlowOrb,
  AmbientGridOverlay as HomeGridOverlay,
  AmbientNoiseOverlay as HomeNoiseOverlay,
  AmbientPageRoot as HomeRoot,
  AmbientVignette as HomeVignette,
} from "components/layout/styles";

const homeCarouselGlow = keyframes`
  0%,
  100% {
    opacity: 0.72;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.08);
  }
`;

const lightboxOverlayIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const lightboxImageIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.94);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const HomeContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0.75rem 0.75rem 1.5rem;

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.md}) {
    padding: 1rem 1.25rem 2rem;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.lg}) {
    padding: 1.25rem 1.5rem 2.5rem;
    gap: 2.5rem;
  }
`;

export const Hero = styled.section<{ $heroImage: string }>`
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 2rem;
  align-items: center;
  padding: 2rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  background-color: ${({ theme }) => theme.surface};
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    pointer-events: none;
  }

  &::before {
    background-image: url(${({ $heroImage }) => $heroImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: 0;
  }

  &::after {
    background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.55) 0%,
        rgba(0, 0, 0, 0.42) 100%
      ),
      linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.72) 0%,
        rgba(0, 0, 0, 0.48) 46%,
        rgba(0, 0, 0, 0.16) 100%
      ),
      linear-gradient(
        135deg,
        rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.14) 0%,
        transparent 55%
      );
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    padding: 2.5rem 2rem;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.lg}) {
    padding: 3rem 2.5rem;
    gap: 2.5rem;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  min-width: 0;
`;

export const HeroEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  background-color: rgba(
    ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
    0.12
  );
  border: 1px solid
    rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.3);
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 700;
  line-height: 1.2;
  color: ${({ theme }) => theme.text};
`;

export const HeroSubtitle = styled.p`
  margin: 0;
  max-width: 32rem;
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.subtleText};

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.md}) {
    font-size: 1.05rem;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0.75rem;
  padding-top: 0.25rem;
`;

export const HeroInviteIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  color: #ffffff;
  background: linear-gradient(145deg, #7289da 0%, #5865f2 100%);
  box-shadow: 0 4px 12px rgb(0 0 0 / 28%),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);

  svg {
    width: 1.35rem;
    height: 1.35rem;
  }
`;

export const HeroInviteText = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;
  min-width: 0;
  padding-right: 0.15rem;
`;

export const HeroInviteLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;

  svg {
    width: 1rem;
    transition: transform 0.2s ease;
  }
`;

export const HeroInviteHint = styled.span`
  font-size: 0.8rem;
  line-height: 1.2;
  color: rgba(51, 51, 51, 0.72);
  white-space: nowrap;
`;

export const HeroInviteLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  min-height: 3rem;
  padding: 0.5rem 1.125rem 0.5rem 0.5rem;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  text-decoration: none;
  color: ${({ theme }) => theme.contrastText};
  background-image: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary} 0%,
      #f0c06a 52%,
      ${({ theme }) => theme.primary} 100%
    ),
    linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12));
  border: 1px solid
    rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.65);
  box-shadow: 0 6px 22px
      rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.32),
    0 2px 8px rgb(0 0 0 / 22%);
  transition: filter 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.contrastText};
    filter: brightness(1.05);
    box-shadow: 0 8px 28px
        rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.42),
      0 4px 12px rgb(0 0 0 / 28%);
    transform: translateY(-1px);

    ${HeroInviteLabel} svg {
      transform: translateX(3px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.text};
    outline-offset: 2px;
  }
`;

export const HeroDashboardAvatar = styled(Image)`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  object-fit: cover;
  box-shadow: 0 0 0 2px
    rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.3);
`;

export const HeroDashboardText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;
  min-width: 0;
  padding-right: 0.25rem;
`;

export const HeroDashboardLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;

  svg {
    width: 1rem;
    color: ${({ theme }) => theme.primary};
    transition: transform 0.2s ease;
  }
`;

export const HeroDashboardHint = styled.span`
  font-size: 0.8rem;
  line-height: 1.2;
  color: ${({ theme }) => theme.subtleText};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12rem;
`;

const heroSecondaryActionStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  min-height: 3rem;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  background-color: rgba(255, 255, 255, 0.06);
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0.04)
  );
  border: 1px solid
    rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.35);
  box-shadow: 0 4px 16px rgb(0 0 0 / 25%);
  transition: border-color 0.2s ease, background-color 0.2s ease,
    box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.text};
    background-color: rgba(
      ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
      0.12
    );
    border-color: rgba(
      ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
      0.55
    );
    box-shadow: 0 6px 20px rgb(0 0 0 / 30%),
      0 0 0 1px rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.15);
    transform: translateY(-1px);

    ${HeroDashboardLabel} svg {
      transform: translateX(3px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }
`;

export const HeroLoginIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  color: ${({ theme }) => theme.primary};
  background-color: rgba(
    ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
    0.12
  );
  border: 1px solid
    rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.25);

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`;

export const HeroDashboardLink = styled(Link)`
  ${heroSecondaryActionStyles}
`;

export const HeroLoginLink = styled.a`
  ${heroSecondaryActionStyles}
`;

export const HeroCarouselWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  width: 100%;
  max-width: 520px;
  margin-inline: auto;
  justify-self: center;
  align-self: center;

  &::before {
    content: "";
    position: absolute;
    inset: -20%;
    z-index: 0;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.42) 0%,
      rgba(59, 104, 163, 0.16) 38%,
      transparent 68%
    );
    filter: blur(22px);
    animation: ${homeCarouselGlow} 10s ease-in-out infinite;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

export const HeroCarouselRoot = styled(Carousel)`
  width: 100%;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  border: 1px solid
    rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.25);
  box-shadow: 0 12px 32px rgb(0 0 0 / 50%), 0 0 0 1px rgba(255, 255, 255, 0.04);
  overflow: hidden;
  background-color: transparent;

  .carousel-inner {
    border-radius: inherit;
  }

  .carousel-item {
    transition: transform 0.6s ease-in-out;
  }

  .carousel-indicators {
    margin-bottom: 0.5rem;

    [data-bs-target] {
      width: 0.45rem;
      height: 0.45rem;
      margin: 0 0.2rem;
      border-radius: 50%;
      border: 0;
      background-color: rgba(255, 255, 255, 0.35);
      opacity: 1;
      transition: background-color 0.2s ease, transform 0.2s ease;

      &.active {
        background-color: ${({ theme }) => theme.primary};
        transform: scale(1.15);
      }
    }
  }

  .carousel-control-prev,
  .carousel-control-next {
    width: 3.5rem;
    opacity: 1;
    z-index: 3;

    &:focus,
    &:focus-visible,
    &:active {
      outline: none;
      box-shadow: none !important;
    }
  }

  .carousel-control-prev {
    left: 0.65rem;
  }

  .carousel-control-next {
    right: 0.65rem;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    width: 2.5rem;
    height: 2.5rem;
    border: 0;
    border-radius: ${({ theme }) => theme.layout.navItemRadius};
    background-color: rgba(0, 0, 0, 0.72);
    background-size: 52% 52%;
    box-shadow: 0 2px 10px rgb(0 0 0 / 55%);
    filter: invert(77%) sepia(44%) saturate(629%) hue-rotate(337deg)
      brightness(103%) contrast(101%);
    transition: background-color 0.2s ease, transform 0.2s ease;
    outline: none;
  }

  .carousel-control-prev:hover .carousel-control-prev-icon,
  .carousel-control-next:hover .carousel-control-next-icon {
    background-color: rgba(
      ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
      0.22
    );
    transform: scale(1.06);
  }

  .carousel-control-prev:focus .carousel-control-prev-icon,
  .carousel-control-next:focus .carousel-control-next-icon,
  .carousel-control-prev:focus-visible .carousel-control-prev-icon,
  .carousel-control-next:focus-visible .carousel-control-next-icon,
  .carousel-control-prev:active .carousel-control-prev-icon,
  .carousel-control-next:active .carousel-control-next-icon {
    outline: none;
    box-shadow: 0 2px 10px rgb(0 0 0 / 55%);
    background-color: rgba(0, 0, 0, 0.72);
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .carousel-item {
      transition: none;
    }
  }
`;

export const HeroCarouselSlideButton = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
  line-height: 0;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }
`;

export const HeroCarouselSlideImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: top center;
  pointer-events: none;
`;

export const ScreenshotLightboxOverlay = styled.div<{ $animate?: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 1.25rem 1.5rem;
  background-color: rgba(0, 0, 0, 0.94);

  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${lightboxOverlayIn} 0.22s ease forwards;
    `}
`;

export const ScreenshotLightboxStage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
`;

export const ScreenshotLightboxImage = styled.img<{ $animate?: boolean }>`
  display: block;
  max-width: min(100%, 72rem);
  max-height: calc(100dvh - 5rem);
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  border: 1px solid
    rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.25);
  box-shadow: 0 16px 48px rgb(0 0 0 / 55%);

  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${lightboxImageIn} 0.28s cubic-bezier(0.22, 1, 0.36, 1)
        forwards;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ScreenshotLightboxToolbar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1060;
  padding: 0.875rem 1rem;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

export const ScreenshotLightboxIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  background-color: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.text};
  transition: border-color 0.2s ease, color 0.2s ease,
    background-color 0.2s ease;

  svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    border-color: rgba(
      ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
      0.45
    );
    color: ${({ theme }) => theme.primary};
    background-color: rgba(
      ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
      0.12
    );
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }
`;

export const ScreenshotLightboxNav = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1055;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.75rem;
  pointer-events: none;

  ${ScreenshotLightboxIconButton} {
    pointer-events: auto;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-align: center;
  max-width: 36rem;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.35rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

export const SectionSubtitle = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.subtleText};
`;

export const FeatureCard = styled(Card)<{ $highlight?: boolean }>`
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.surfaceElevated};
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.05)
  );
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  ${({ $highlight, theme }) =>
    $highlight &&
    css`
      border-color: rgba(${theme.rgb?.primary ?? "255,189,89"}, 0.3);

      .card-body {
        padding-right: 4.25rem;
      }
    `}

  &:hover {
    border-color: rgba(
      ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
      0.35
    );
    box-shadow: 0 8px 24px rgb(0 0 0 / 25%);
    transform: translateY(-2px);
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem;
    color: ${({ theme }) => theme.subtleText};
    text-align: left;
  }
`;

export const FeatureCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
`;

export const FeatureIconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  color: ${({ theme }) => theme.primary};
  background-color: rgba(
    ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
    0.12
  );
  border: 1px solid
    rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.25);
`;

export const FeatureTitle = styled.h3`
  margin: 0;
  flex: 1;
  min-width: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.text};
`;

export const FeatureBadgeRow = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  pointer-events: none;
`;

export const FeatureBadge = styled.span<{ $variant?: "new" | "premium" }>`
  display: inline-flex;
  padding: 0.15rem 0.5rem 0.15rem 0.55rem;
  border-radius: 999px 0 0 999px;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text};
  background-color: rgba(
    ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
    0.16
  );
  border: 1px solid
    rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.35);
  border-right: 0;
  box-shadow: 0 4px 12px rgb(0 0 0 / 25%);

  ${({ $variant, theme }) =>
    $variant === "premium" &&
    css`
      color: ${theme.primary};
    `}
`;

export const FeatureDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
`;

export const CtaSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1.25rem;
  text-align: center;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.surface};
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.04),
      rgba(255, 255, 255, 0.04)
    ),
    linear-gradient(
      180deg,
      rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.08) 0%,
      transparent 100%
    );
  border: 1px solid ${({ theme }) => theme.borderSubtle};
`;

export const CtaTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const CtaText = styled.p`
  margin: 0;
  max-width: 28rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.subtleText};
`;
