import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "helpers/hooks";
import { useCallback, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import {
  HeroCarouselRoot,
  HeroCarouselSlideButton,
  HeroCarouselSlideImage,
  HeroCarouselWrap,
  ScreenshotLightboxIconButton,
  ScreenshotLightboxImage,
  ScreenshotLightboxNav,
  ScreenshotLightboxOverlay,
  ScreenshotLightboxStage,
  ScreenshotLightboxToolbar,
} from "./styles";

interface HeroScreenshotCarouselProps {
  screenshots: string[];
}

const HeroScreenshotCarousel = ({
  screenshots,
}: HeroScreenshotCarouselProps) => {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setLightboxIndex((current) =>
      current === null
        ? null
        : (current - 1 + screenshots.length) % screenshots.length
    );
  }, [screenshots.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % screenshots.length
    );
  }, [screenshots.length]);

  useEffect(() => {
    if (lightboxIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, lightboxIndex, showNext, showPrevious]);

  return (
    <>
      <HeroCarouselWrap>
        <HeroCarouselRoot
          interval={prefersReducedMotion ? null : 6000}
          indicators
          controls
          pause="hover"
          touch
          wrap
        >
          {screenshots.map((src, index) => (
            <Carousel.Item key={src}>
              <HeroCarouselSlideButton
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`View kill notification example ${
                  index + 1
                } full screen`}
              >
                <HeroCarouselSlideImage
                  src={src}
                  alt={`Kill notification example ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </HeroCarouselSlideButton>
            </Carousel.Item>
          ))}
        </HeroCarouselRoot>
      </HeroCarouselWrap>

      {lightboxIndex !== null && (
        <ScreenshotLightboxOverlay
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
          $animate={!prefersReducedMotion}
          onClick={closeLightbox}
        >
          <ScreenshotLightboxToolbar
            onClick={(event) => event.stopPropagation()}
          >
            <ScreenshotLightboxIconButton
              type="button"
              onClick={closeLightbox}
              aria-label="Close full screen view"
            >
              <FontAwesomeIcon icon={faXmark} />
            </ScreenshotLightboxIconButton>
          </ScreenshotLightboxToolbar>

          {screenshots.length > 1 && (
            <ScreenshotLightboxNav onClick={(event) => event.stopPropagation()}>
              <ScreenshotLightboxIconButton
                type="button"
                onClick={showPrevious}
                aria-label="Previous screenshot"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </ScreenshotLightboxIconButton>
              <ScreenshotLightboxIconButton
                type="button"
                onClick={showNext}
                aria-label="Next screenshot"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </ScreenshotLightboxIconButton>
            </ScreenshotLightboxNav>
          )}

          <ScreenshotLightboxStage onClick={(event) => event.stopPropagation()}>
            <ScreenshotLightboxImage
              key={lightboxIndex}
              src={screenshots[lightboxIndex]}
              alt={`Kill notification example ${lightboxIndex + 1}`}
              $animate={!prefersReducedMotion}
            />
          </ScreenshotLightboxStage>
        </ScreenshotLightboxOverlay>
      )}
    </>
  );
};

export default HeroScreenshotCarousel;
