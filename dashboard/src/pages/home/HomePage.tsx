import AmbientPageShell from "components/layout/AmbientPageShell";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import screenshot1 from "assets/screenshots/carousel1.png";
import screenshot2 from "assets/screenshots/carousel2.png";
import screenshot3 from "assets/screenshots/carousel3.png";
import screenshot4 from "assets/screenshots/carousel4.png";
import logo from "assets/logo_dark.svg";
import wallpapper from "assets/wallpappers/home_hero_bg.png";
import { getUserPictureUrl } from "helpers/discord";
import { Col, Row } from "react-bootstrap";
import { useFetchUserQuery } from "store/api";
import { homeFeatures } from "./features";
import HeroInviteButton from "./HeroInviteButton";
import HeroLoginButton from "./HeroLoginButton";
import HeroScreenshotCarousel from "./HeroScreenshotCarousel";
import {
  CtaSection,
  CtaText,
  CtaTitle,
  FeatureBadge,
  FeatureBadgeRow,
  FeatureCard,
  FeatureCardHeader,
  FeatureDescription,
  FeatureIconWrap,
  FeatureTitle,
  Hero,
  HeroActions,
  HeroDashboardAvatar,
  HeroDashboardHint,
  HeroDashboardLabel,
  HeroDashboardLink,
  HeroDashboardText,
  HeroContent,
  HeroEyebrow,
  HeroSubtitle,
  HeroTitle,
  HomeContent,
  Section,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
} from "./styles";

const screenshots = [screenshot1, screenshot2, screenshot3, screenshot4];

const HomePage = () => {
  const user = useFetchUserQuery();

  return (
    <AmbientPageShell>
      <HomeContent>
        <Hero $heroImage={wallpapper}>
          <HeroContent>
            <HeroEyebrow>
              <img src={logo} alt="" width={16} height={16} aria-hidden />
              Albion Online Kill Tracker
            </HeroEyebrow>
            <HeroTitle>Never miss a kill in your guild</HeroTitle>
            <HeroSubtitle>
              Albion Killbot posts rich Discord notifications for kills,
              battles, and rankings — with a dashboard to configure tracking for
              every server you manage.
            </HeroSubtitle>
            <HeroActions>
              <HeroInviteButton />
              {user.data ? (
                <HeroDashboardLink to="/dashboard">
                  <HeroDashboardAvatar
                    roundedCircle
                    src={getUserPictureUrl(user.data)}
                    alt=""
                    aria-hidden
                  />
                  <HeroDashboardText>
                    <HeroDashboardLabel>
                      Open Dashboard
                      <FontAwesomeIcon icon={faArrowRight} />
                    </HeroDashboardLabel>
                    <HeroDashboardHint>
                      Signed in as {user.data.username}
                    </HeroDashboardHint>
                  </HeroDashboardText>
                </HeroDashboardLink>
              ) : (
                <HeroLoginButton />
              )}
            </HeroActions>
          </HeroContent>

          <HeroScreenshotCarousel screenshots={screenshots} />
        </Hero>

        <Section>
          <SectionHeader>
            <SectionTitle>Everything you need to stay informed</SectionTitle>
            <SectionSubtitle>
              From individual kill alerts to battle summaries and fame rankings
              — configure what matters for your server.
            </SectionSubtitle>
          </SectionHeader>
          <Row className="g-3 g-md-4">
            {homeFeatures.map((feature) => (
              <Col key={feature.name} sm={6} lg={4}>
                <FeatureCard
                  $highlight={feature.new || feature.premium}
                  className="h-100"
                >
                  {(feature.new || feature.premium) && (
                    <FeatureBadgeRow>
                      {feature.new && (
                        <FeatureBadge $variant="new">New</FeatureBadge>
                      )}
                      {feature.premium && (
                        <FeatureBadge $variant="premium">Premium</FeatureBadge>
                      )}
                    </FeatureBadgeRow>
                  )}
                  <div className="card-body">
                    <FeatureCardHeader>
                      <FeatureIconWrap>
                        <FontAwesomeIcon icon={feature.icon} size="lg" />
                      </FeatureIconWrap>
                      <FeatureTitle>{feature.name}</FeatureTitle>
                    </FeatureCardHeader>
                    <FeatureDescription>
                      {feature.description}
                    </FeatureDescription>
                  </div>
                </FeatureCard>
              </Col>
            ))}
          </Row>
        </Section>

        <CtaSection>
          <CtaTitle>Ready to track kills in your server?</CtaTitle>
          <CtaText>
            Invite Albion Killbot to your Discord server and configure tracking
            from the dashboard in minutes.
          </CtaText>
          <HeroInviteButton
            label="Invite Albion Killbot"
            hint="Set up tracking in minutes"
          />
        </CtaSection>
      </HomeContent>
    </AmbientPageShell>
  );
};

export default HomePage;
