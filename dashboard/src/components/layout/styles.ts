import styled, { css, keyframes } from "styled-components";

const ambientOrbDriftPrimary = keyframes`
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(4%, -3%) scale(1.06);
  }
`;

const ambientOrbDriftSecondary = keyframes`
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(-5%, 4%) scale(1.08);
  }
`;

const ambientOrbPulse = keyframes`
  0%,
  100% {
    opacity: 0.5;
  }

  50% {
    opacity: 0.78;
  }
`;

const ambientWallpaperDrift = keyframes`
  0%,
  100% {
    transform: scale(1.05) translate(0, 0);
  }

  50% {
    transform: scale(1.1) translate(-1.25%, -0.75%);
  }
`;

const ambientAuroraShift = keyframes`
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }

  33% {
    transform: translate(4%, -3%) rotate(120deg) scale(1.04);
  }

  66% {
    transform: translate(-3%, 3%) rotate(240deg) scale(0.98);
  }
`;

const ambientGridShimmer = keyframes`
  0%,
  100% {
    opacity: 0.68;
    background-position: 0 0, 0 0;
  }

  50% {
    opacity: 0.88;
    background-position: 1.5rem 1.5rem, 1.5rem 1.5rem;
  }
`;

export const AmbientPageRoot = styled.div`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  flex: 1;
  width: 100%;
  min-height: 100%;
`;

export const AmbientBackground = styled.div<{ $wallpaper: string }>`
  position: absolute;
  inset: -1px;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image: url(${({ $wallpaper }) => $wallpaper});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 20%;
    opacity: 0.17;
    filter: saturate(1.05) contrast(1.1);
    transform-origin: center 20%;
    animation: ${ambientWallpaperDrift} 42s ease-in-out infinite;
    mask-image: linear-gradient(
      180deg,
      rgb(0 0 0 / 0.98) 0%,
      rgb(0 0 0 / 0.55) 48%,
      transparent 82%
    );

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      transform: none;
    }
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background-image: radial-gradient(
        ellipse 90% 55% at 12% -5%,
        rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.34) 0%,
        transparent 58%
      ),
      radial-gradient(
        ellipse 70% 50% at 92% 12%,
        rgba(59, 104, 163, 0.28) 0%,
        transparent 55%
      ),
      radial-gradient(
        ellipse 65% 45% at 78% 92%,
        rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.22) 0%,
        transparent 52%
      ),
      radial-gradient(
        ellipse 55% 40% at 8% 88%,
        rgba(51, 103, 59, 0.24) 0%,
        transparent 50%
      ),
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.12) 0%,
        transparent 38%,
        rgba(0, 0, 0, 0.16) 100%
      );
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

export const AmbientAuroraLayer = styled.div`
  position: absolute;
  inset: -35%;
  z-index: 1;
  pointer-events: none;
  opacity: 0.78;
  background: conic-gradient(
      from 210deg at 42% 38%,
      rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0) 0deg,
      rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.28) 95deg,
      rgba(59, 104, 163, 0.22) 185deg,
      rgba(51, 103, 59, 0.18) 265deg,
      rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.24) 330deg,
      rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0) 360deg
    ),
    radial-gradient(
      ellipse 55% 45% at 72% 22%,
      rgba(59, 104, 163, 0.3) 0%,
      transparent 68%
    ),
    radial-gradient(
      ellipse 50% 40% at 18% 78%,
      rgba(${({ theme }) => theme.rgb?.primary ?? "255,189,89"}, 0.26) 0%,
      transparent 65%
    );
  filter: blur(56px);
  animation: ${ambientAuroraShift} 30s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const AmbientGlowOrb = styled.div<{
  $variant: "primary" | "accent" | "depth" | "americas";
}>`
  position: absolute;
  border-radius: 50%;
  filter: blur(72px);
  will-change: transform;

  ${({ $variant, theme }) => {
    const primaryRgb = theme.rgb?.primary ?? "255,189,89";

    switch ($variant) {
      case "primary":
        return css`
          top: -12%;
          left: -8%;
          width: min(52vw, 28rem);
          height: min(52vw, 28rem);
          background: radial-gradient(
            circle,
            rgba(${primaryRgb}, 0.48) 0%,
            rgba(${primaryRgb}, 0.14) 45%,
            transparent 72%
          );
          animation: ${ambientOrbDriftPrimary} 18s ease-in-out infinite;
        `;
      case "accent":
        return css`
          right: -10%;
          bottom: 8%;
          width: min(44vw, 22rem);
          height: min(44vw, 22rem);
          background: radial-gradient(
            circle,
            rgba(${primaryRgb}, 0.34) 0%,
            rgba(${primaryRgb}, 0.1) 50%,
            transparent 72%
          );
          animation: ${ambientOrbDriftSecondary} 22s ease-in-out infinite;
        `;
      case "depth":
        return css`
          top: 38%;
          right: 18%;
          width: min(36vw, 16rem);
          height: min(36vw, 16rem);
          background: radial-gradient(
            circle,
            rgba(59, 104, 163, 0.3) 0%,
            rgba(59, 104, 163, 0.1) 50%,
            transparent 72%
          );
          animation: ${ambientOrbPulse} 14s ease-in-out infinite;
        `;
      case "americas":
        return css`
          left: -6%;
          bottom: 2%;
          width: min(40vw, 20rem);
          height: min(40vw, 20rem);
          background: radial-gradient(
            circle,
            rgba(51, 103, 59, 0.32) 0%,
            rgba(51, 103, 59, 0.1) 50%,
            transparent 72%
          );
          animation: ${ambientOrbDriftSecondary} 26s ease-in-out infinite;
        `;
    }
  }}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const AmbientGridOverlay = styled.div`
  position: absolute;
  inset: -1px;
  opacity: 0.72;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.07) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 3rem 3rem;
  animation: ${ambientGridShimmer} 24s ease-in-out infinite;
  mask-image: radial-gradient(
    ellipse 92% 80% at 50% 38%,
    rgb(0 0 0 / 0.9) 12%,
    transparent 82%
  );

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const AmbientNoiseOverlay = styled.div`
  position: absolute;
  inset: -1px;
  opacity: 0.35;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
`;

export const AmbientVignette = styled.div`
  position: absolute;
  inset: -1px;
  background: radial-gradient(
    ellipse 100% 90% at 50% 42%,
    transparent 62%,
    rgba(0, 0, 0, 0.22) 100%
  );
`;

export const AmbientPageBody = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  min-width: 0;
`;

export const AmbientCompactPageBody = styled(AmbientPageBody)`
  width: 100%;
  margin-inline: auto;
  padding-inline: 0.75rem;

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.md}) {
    padding-inline: 1.25rem;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.lg}) {
    max-width: ${({ theme }) => theme.layout.contentMaxWidth};
    padding-inline: 1.5rem;
  }
`;
