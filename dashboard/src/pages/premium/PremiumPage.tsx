import Loader from "components/common/Loader";
import LoadError from "components/LoadError";
import Page from "components/Page";
import ServerSelect from "components/ServerSelect";
import PremiumNoPlansEmptyState from "components/subscriptions/PremiumNoPlansEmptyState";
import SubscriptionStripePriceCard from "components/subscriptions/SubscriptionStripePriceCard";
import {
  PremiumCurrencyDropdownMenu,
  PremiumCurrencyLabel,
} from "components/subscriptions/styles";
import { useState } from "react";
import { Button, Col, Dropdown, Modal, Row, Stack } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import {
  useCreateSubscriptionCheckoutMutation,
  useFetchSubscriptionPricesQuery,
} from "store/api/subscriptions";
import { SubscriptionPrice } from "types/subscription";

const PremiumPage = () => {
  const [currency, setCurrency] = useState("USD");
  const pricesResponse = useFetchSubscriptionPricesQuery({ currency });
  const [dispatchCreateSubscriptionCheckout, createSubscriptionCheckout] =
    useCreateSubscriptionCheckoutMutation();
  const [queryParams] = useSearchParams();
  const status = queryParams.get("status");
  const [priceId, setPriceId] = useState("");

  if (createSubscriptionCheckout.isLoading) return <Loader />;
  if (createSubscriptionCheckout.isSuccess && createSubscriptionCheckout.data) {
    window.location.href = createSubscriptionCheckout.data.url;
  }

  const renderCurrenciesDropdown = () => {
    if (!pricesResponse.data?.currencies) return null;

    return (
      <Stack direction="horizontal" gap={2} className="align-items-center">
        <PremiumCurrencyLabel>Currency:</PremiumCurrencyLabel>

        <Dropdown className="d-flex">
          <Dropdown.Toggle variant="primary" id="currencies">
            {currency?.toUpperCase() || "USD"}
          </Dropdown.Toggle>
          <Dropdown.Menu as={PremiumCurrencyDropdownMenu}>
            {pricesResponse.data.currencies.map((item) => (
              <Dropdown.Item key={item} onClick={() => setCurrency(item)}>
                {item?.toUpperCase() || "USD"}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Stack>
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
      <Row className="gy-3">
        {pricesResponse.data.prices.map((price: SubscriptionPrice) => (
          <Col key={price.id} sm={6} lg={4} xxl={3}>
            <SubscriptionStripePriceCard
              price={price}
              onSelect={() => setPriceId(price.id)}
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Page
      alerts={[
        {
          show: status === "success",
          variant: "success",
          message: (
            <>
              <span>
                Thank you for your purchase! Go to{" "}
                <Link to="/subscriptions">Subscriptions</Link> to see your new
                subscription.
              </span>
            </>
          ),
        },
        {
          show: status === "cancel",
          variant: "danger",
          message: "Purchase cancelled.",
        },
      ]}
      title="Premium"
    >
      <Stack gap={3}>
        <p className="mb-0 text-muted">
          Choose a plan for your Discord server.
        </p>
        <div className="d-flex justify-content-end">
          {renderCurrenciesDropdown()}
        </div>
        {renderPrices()}
      </Stack>

      <Modal
        centered={true}
        size="lg"
        show={priceId !== ""}
        onExit={() => setPriceId("")}
      >
        <Modal.Header>
          <Modal.Title>Please select a Server</Modal.Title>
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
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={() => setPriceId("")}>
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Page>
  );
};

export default PremiumPage;
