import { faStripe } from "@fortawesome/free-brands-svg-icons";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AmbientPageShell from "components/layout/AmbientPageShell";
import Loader from "components/common/Loader";
import LoadError from "components/LoadError";
import ServerSelect from "components/ServerSelect";
import PremiumNoPlansEmptyState from "components/subscriptions/PremiumNoPlansEmptyState";
import SubscriptionStripePriceCard from "components/subscriptions/SubscriptionStripePriceCard";
import {
  PremiumCurrencyDropdownMenu,
  PremiumCurrencyLabel,
} from "components/subscriptions/styles";
import { useState } from "react";
import { Alert, Button, Col, Dropdown, Modal, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import {
  useCreateSubscriptionCheckoutMutation,
  useFetchSubscriptionPricesQuery,
} from "store/api/subscriptions";
import { SubscriptionPrice } from "types/subscription";
import {
  PremiumCurrencyControl,
  PremiumCurrencyToggle,
  PremiumEyebrow,
  PremiumFootnote,
  PremiumHeader,
  PremiumManageLink,
  PremiumPageContent,
  PremiumPanel,
  PremiumPlansSection,
  PremiumSubtitle,
  PremiumTitle,
  PremiumToolbar,
  PremiumToolbarHint,
} from "./styles";

const PremiumPage = () => {
  const [currency, setCurrency] = useState("USD");
  const pricesResponse = useFetchSubscriptionPricesQuery({ currency });
  const [dispatchCreateSubscriptionCheckout, createSubscriptionCheckout] =
    useCreateSubscriptionCheckoutMutation();
  const [queryParams] = useSearchParams();
  const status = queryParams.get("status");
  const [priceId, setPriceId] = useState("");

  if (createSubscriptionCheckout.isLoading) {
    return (
      <AmbientPageShell compact>
        <PremiumPageContent>
          <Loader />
        </PremiumPageContent>
      </AmbientPageShell>
    );
  }

  if (createSubscriptionCheckout.isSuccess && createSubscriptionCheckout.data) {
    window.location.href = createSubscriptionCheckout.data.url;
  }

  const renderCurrencyDropdown = () => {
    if (!pricesResponse.data?.currencies) return null;

    return (
      <PremiumCurrencyControl>
        <PremiumCurrencyLabel>Currency</PremiumCurrencyLabel>
        <Dropdown align="end">
          <PremiumCurrencyToggle variant="primary" id="currencies">
            {currency.toUpperCase() || "USD"}
          </PremiumCurrencyToggle>
          <Dropdown.Menu as={PremiumCurrencyDropdownMenu}>
            {pricesResponse.data.currencies.map((item) => (
              <Dropdown.Item key={item} onClick={() => setCurrency(item)}>
                {item.toUpperCase() || "USD"}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </PremiumCurrencyControl>
    );
  };

  const renderPrices = () => {
    if (pricesResponse.isFetching) return <Loader />;
    if (pricesResponse.isError) return <LoadError />;

    if (!pricesResponse.data?.prices.length) {
      return (
        <PremiumNoPlansEmptyState
          currency={currency}
          availableCurrencies={pricesResponse.data?.currencies}
        />
      );
    }

    return (
      <Row className="g-3">
        {pricesResponse.data.prices.map((price: SubscriptionPrice) => (
          <Col key={price.id} xs={12} md={6}>
            <SubscriptionStripePriceCard
              price={price}
              onSelect={() => setPriceId(price.id)}
            />
          </Col>
        ))}
      </Row>
    );
  };

  const hasPlans = Boolean(pricesResponse.data?.prices.length);

  return (
    <AmbientPageShell compact>
      <PremiumPageContent>
        <PremiumPanel>
          {status === "success" && (
            <Alert variant="success">
              Thank you for your purchase! Go to{" "}
              <Link to="/subscriptions">Subscriptions</Link> to see your new
              subscription.
            </Alert>
          )}

          {status === "cancel" && (
            <Alert variant="danger">Purchase cancelled.</Alert>
          )}

          <PremiumHeader>
            <PremiumEyebrow>
              <FontAwesomeIcon icon={faCrown} aria-hidden />
              Albion Killbot Premium
            </PremiumEyebrow>
            <PremiumTitle>Upgrade your server</PremiumTitle>
            <PremiumSubtitle>
              Unlock juicy kill alerts, higher tracking limits, and premium
              features for your Discord server.
            </PremiumSubtitle>
          </PremiumHeader>

          <PremiumToolbar>
            <PremiumToolbarHint>
              Select a plan, then choose which server to assign it to at
              checkout.
            </PremiumToolbarHint>
            {renderCurrencyDropdown()}
          </PremiumToolbar>

          <PremiumPlansSection>{renderPrices()}</PremiumPlansSection>

          {hasPlans && (
            <PremiumFootnote>
              Secure checkout powered by{" "}
              <FontAwesomeIcon icon={faStripe} aria-hidden /> Stripe. Already
              subscribed? Manage plans on the{" "}
              <PremiumManageLink to="/subscriptions">
                Subscriptions
              </PremiumManageLink>{" "}
              page.
            </PremiumFootnote>
          )}
        </PremiumPanel>
      </PremiumPageContent>

      <Modal
        centered
        size="lg"
        show={priceId !== ""}
        onHide={() => setPriceId("")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select a server</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ServerSelect
            onSelect={(serverId) =>
              dispatchCreateSubscriptionCheckout({
                priceId,
                serverId,
              })
            }
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPriceId("")}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </AmbientPageShell>
  );
};

export default PremiumPage;
