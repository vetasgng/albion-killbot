import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  faCrown,
  faEarthAsia,
  faEarthEurope,
  faGear,
  faLandmarkFlag,
  faRankingStar,
  faSackDollar,
  faSkull,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import screenshot1 from "assets/screenshots/970551093-event.png";
import screenshot2 from "assets/screenshots/971842546-event.png";
import screenshot3 from "assets/screenshots/971900762-event.png";
import screenshot4 from "assets/screenshots/971905670-event.png";
import wallpapper from "assets/wallpappers/call_to_arms.jpeg";
import { getServerInviteUrl } from "helpers/discord";
import { useMemo } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Stack,
} from "react-bootstrap";
import styled from "styled-components";

const screenshots = [screenshot1, screenshot2, screenshot3, screenshot4];

const features = [
  {
    new: true,
    name: "Europe Server Support",
    icon: faEarthEurope,
    description: "You can track entities from the new Albion Europe server.",
  },
  {
    new: true,
    premium: true,
    name: "Juicy Kills",
    icon: faSackDollar,
    description:
      "Juicy kills allows you to get a feed of the most expensive kills in Albion Online.",
  },
  {
    new: true,
    name: "Awakened Weapons",
    icon: faWandMagicSparkles,
    description: "Our reports now display information about awakened weapons",
  },
  {
    name: "Asia Server Support",
    icon: faEarthAsia,
    description: "You can track entities from the new Albion Asia server.",
  },
  {
    name: "Kills",
    icon: faSkull,
    description:
      "Receive a notification on your discord whenever a kill happens in Albion Online.",
  },
  {
    name: "Battles",
    icon: faLandmarkFlag,
    description:
      "Receive a summary of battles with a link to a more detailed report.",
  },
  {
    name: "Rankings",
    icon: faRankingStar,
    description:
      "A ranking of the most famed killers and victims on a daily basis.",
  },
  {
    name: "Settings",
    icon: faGear,
    description:
      "A full functional dashboard where you can configure and checkout subscription for each server the bot runs.",
  },
  {
    name: "Premium",
    icon: faCrown,
    description:
      "With the premium subscription, you can enable exclusive guild features for your server.",
  },
];

const HomeRoot = styled.div`
  padding-bottom: 1rem;
`;

const Hero = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 1.5rem;
  border-radius: 0.75rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
    url(${wallpapper});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`;

const HeroScreenshot = styled.img`
  max-width: min(100%, 420px);
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  box-shadow: 0 8px 24px rgb(0 0 0 / 45%);
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  max-width: 28rem;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme }) => theme.text};
`;

const FeaturesHeading = styled.h2`
  margin: 0;
  padding: 1.5rem 0 0.5rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const FeatureCard = styled(Card)`
  height: 100%;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.surfaceElevated};
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.05)
  );
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: ${({ theme }) => theme.layout.navItemRadius};
  transition: background-color 0.25s ease-in-out, border-color 0.25s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
    border-color: rgba(
      ${({ theme }) => theme.rgb?.primary ?? "255,189,89"},
      0.25
    );
  }

  .card-body {
    color: ${({ theme }) => theme.subtleText};
    text-align: center;
  }

  .card-title {
    color: ${({ theme }) => theme.text};
    text-align: center;
  }
`;

const FeatureIconWrap = styled.div`
  padding: 1.5rem 1rem 0.5rem;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
`;

const FeatureBadge = styled(Badge)`
  font-size: 0.65rem;
  letter-spacing: 0.04em;
`;

const HomePage = () => {
  const screenshot = useMemo(
    () => screenshots[Math.floor(Math.random() * screenshots.length)],
    []
  );

  return (
    <HomeRoot>
      <Hero>
        <HeroScreenshot
          src={screenshot}
          alt="Example kill notification"
          className="d-none d-md-block"
        />
        <HeroContent>
          <HeroTitle>
            A Discord bot for displaying kills in Albion Online.
          </HeroTitle>
          <a
            href={getServerInviteUrl()}
            className="navbar-link"
            rel="noreferrer"
          >
            <Button variant="primary">
              <FontAwesomeIcon icon={faDiscord} />
              <span className="ms-2">Invite</span>
            </Button>
          </a>
        </HeroContent>
      </Hero>

      <Container>
        <FeaturesHeading>Features</FeaturesHeading>
        <Row className="px-2">
          {features.map((feature) => (
            <Col key={feature.name} sm={6} lg={4} className="g-4">
              <FeatureCard className="d-flex flex-column justify-content-center">
                <FeatureIconWrap>
                  <FontAwesomeIcon icon={feature.icon} size="3x" />
                </FeatureIconWrap>
                <Card.Title>
                  <Stack gap={2} className="align-items-center">
                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="align-self-center"
                    >
                      {feature.new && (
                        <FeatureBadge bg="primary">NEW</FeatureBadge>
                      )}
                      {feature.premium && (
                        <FeatureBadge bg="primary">PREMIUM</FeatureBadge>
                      )}
                    </Stack>
                    <div>{feature.name}</div>
                  </Stack>
                </Card.Title>
                <Card.Body>{feature.description}</Card.Body>
              </FeatureCard>
            </Col>
          ))}
        </Row>
      </Container>
    </HomeRoot>
  );
};

export default HomePage;
