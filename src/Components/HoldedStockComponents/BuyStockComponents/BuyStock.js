import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Input, Button } from "reactstrap";
import StocksContext from "../../../Context/Stocks/StocksContext";
import HoldedStockContext from "../../../Context/HoldedStock/HoldedStockContext";
import NotificationContext from "../../../Context/Notification/NotificationContext";
import StatusDiv from "./StatusDiv";
import Select from "react-select";

export default function BuyStock() {
  const stocksContext = useContext(StocksContext);
  const holdedStockContext = useContext(HoldedStockContext);
  const notificationContext = useContext(NotificationContext);
  const [loader, setLoader] = useState(true);

  const [stockId, setStockId] = useState("");
  const [buyingPriceOfSingleStock, setBuyingPriceOfSingleStock] = useState("");
  const [noOfStock, setNoOfStock] = useState("");
  const [buyingTotalPrice, setBuyingTotalPrice] = useState("");
  const [type, setType] = useState("");
  const [noOfThresholds, setNoOfThresholds] = useState("");
  const [allStatus, setAllStatus] = useState([]);

  useEffect(() => {
    if (stocksContext.stocksList != null) {
      setLoader(false);
    }
  }, [stocksContext.stocksList]);

  const handleBuyStock = async () => {
    verifyThresholds();
    var stockDetails = {
      stockId: Number(stockId),
      buyingPriceOfSingleStock: Number(buyingPriceOfSingleStock),
      noOfStock: Number(noOfStock),
      buyingTotalPrice: Number(buyingTotalPrice),
      type: Number(type),
      allStatus: allStatus,
      userId: 0,
    };

    if (
      stockDetails.stockId === null ||
      stockDetails.stockId <= 0 ||
      stockDetails.buyingPriceOfSingleStock === null ||
      stockDetails.buyingPriceOfSingleStock <= 0 ||
      stockDetails.noOfStock === null ||
      stockDetails.noOfStock <= 0 ||
      stockDetails.buyingTotalPrice === null ||
      stockDetails.buyingTotalPrice <
        stockDetails.buyingPriceOfSingleStock * stockDetails.noOfStock ||
      stockDetails.type === null ||
      (stockDetails.type !== 0 && stockDetails.type !== 1)
    ) {
      notificationContext.showNotificationFunc({
        error: 1,
        notification: "Mendatory fields are invalid or empty",
      });
      return;
    }

    var check = true;

    if (stockDetails.type === 0) {
      for (const status of stockDetails.allStatus) {
        if (
          status.statusId === null ||
          status.statusId === 0 ||
          status.statusPrice === null ||
          status.statusPrice === 0
        ) {
          check = false;
          break;
        }
      }
    } else {
      for (const status of stockDetails.allStatus) {
        if (
          status.statusId === null ||
          status.statusId === 0 ||
          status.statusPrice === null ||
          status.statusPrice < 0 ||
          status.statusPrice === buyingPriceOfSingleStock
        ) {
          check = false;
          break;
        }
      }
    }

    if (check === false) {
      notificationContext.showNotificationFunc({
        error: 1,
        notification: "Mendatory fields are invalid or empty",
      });
      return;
    }

    await holdedStockContext.buyStock(stockDetails);
    setStockId("");
    setBuyingPriceOfSingleStock("");
    setNoOfStock("");
    setBuyingTotalPrice("");
    setType("");
    setNoOfThresholds(0);
    setAllStatus([]);
  };

  const addNoOfThresholds = (num) => {
    const value = Math.max(0, Math.min(10, Number(num)));
    setNoOfThresholds(value);
    setAllStatus(
      Array.from({ length: value }, () => ({ statusId: 0, statusPrice: 0 }))
    );
  };

  const updateStatusValue = (index, field, value, type) => {
    const numericValue = Number(value);
    if (type === "1" && numericValue < 0) {
      return;
    }
    const updatedStatusValues = [...allStatus];
    updatedStatusValues[index] = {
      ...updatedStatusValues[index],
      [field]: numericValue,
    };
    setAllStatus(updatedStatusValues);
  };

  const verifyThresholds = () => {
    var prices;
    var positiveStatuses;
    var negativeStatuses;
    var uniquePrices;

    if (type === "0") {
      prices = allStatus
        .map((status) => status.statusPrice)
        .filter((price) => price !== 0);

      uniquePrices = new Set(prices);

      if (
        prices.length !== uniquePrices.size ||
        noOfThresholds !== prices.length ||
        noOfThresholds !== uniquePrices.size
      ) {
        notificationContext.showNotificationFunc({
          error: 1,
          notification: "Status Percent must be unique and not equal to 0.",
        });
        return;
      }

      positiveStatuses = allStatus.filter((status) => status.statusPrice > 0);
      negativeStatuses = allStatus.filter((status) => status.statusPrice < 0);
    } else {
      prices = allStatus
        .map((status) => status.statusPrice)
        .filter((price) => price !== Number(buyingPriceOfSingleStock));

      uniquePrices = new Set(prices);

      if (
        prices.length !== uniquePrices.size ||
        noOfThresholds !== prices.length ||
        noOfThresholds !== uniquePrices.size
      ) {
        notificationContext.showNotificationFunc({
          error: 1,
          notification:
            "Status Price must be unique and not equal to buying price.",
        });
        return;
      }

      positiveStatuses = allStatus.filter(
        (status) => status.statusPrice > Number(buyingPriceOfSingleStock)
      );
      negativeStatuses = allStatus.filter(
        (status) => status.statusPrice < Number(buyingPriceOfSingleStock)
      );
    }

    const sortedPositiveStatuses = positiveStatuses.sort(
      (a, b) => a.statusPrice - b.statusPrice
    );
    const sortedNegativeStatuses = negativeStatuses.sort(
      (a, b) => b.statusPrice - a.statusPrice
    );
    const updatedNegativeStatuses = sortedNegativeStatuses.map(
      (status, index) => ({
        ...status,
        statusId: -(index + 1),
      })
    );

    const updatedPositiveStatuses = sortedPositiveStatuses.map(
      (status, index) => ({
        ...status,
        statusId: index + 1,
      })
    );
    const sortedStatuses = [
      ...updatedNegativeStatuses.reverse(),
      ...updatedPositiveStatuses,
    ];
    setAllStatus(sortedStatuses);
  };

  const options = Object.entries(stocksContext.stocksList).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  return (
    <>
      {loader ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <>
          <Row xs="1" sm="1" md="2" lg="4">
            <Col className="mt-2">
              {/* <Input
                id="stockId"
                name="stockId"
                type="select"
                value={stockId}
                onChange={(e) => setStockId(e.target.value)}
              >
                <option value="-1">Select stock</option>
                {Object.entries(stocksContext.stocksList).map(
                  ([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  )
                )}
              </Input> */}
              <Select
                id="stockId"
                name="stockId"
                options={options}
                value={options.find((option) => option.value === stockId)}
                onChange={(option) => setStockId(option ? option.value : "")}
                placeholder="Select stock"
              />
            </Col>
            <Col className="mt-2">
              <Input
                id="buyingPriceOfSingleStock"
                placeholder="Single Stock Price"
                name="buyingPriceOfSingleStock"
                type="number"
                value={buyingPriceOfSingleStock}
                onChange={(e) => {
                  setBuyingPriceOfSingleStock(e.target.value);
                  setNoOfThresholds(0);
                  setAllStatus([]);
                }}
              />
            </Col>
            <Col className="mt-2">
              <Input
                id="noOfStock"
                placeholder="Number of Stocks"
                name="noOfStock"
                type="number"
                value={noOfStock}
                onChange={(e) => setNoOfStock(e.target.value)}
              />
            </Col>
            <Col className="mt-2">
              <Input
                id="buyingTotalPrice"
                placeholder="Total Buying Price"
                name="buyingTotalPrice"
                type="number"
                value={buyingTotalPrice}
                onChange={(e) => setBuyingTotalPrice(e.target.value)}
              />
            </Col>
            <Col className="mt-2">
              <Input
                id="type"
                name="type"
                type="select"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setNoOfThresholds(0);
                  setAllStatus([]);
                }}
              >
                <option value="-1">Select Type</option>
                <option value="0">Percent</option>
                <option value="1">Price</option>
              </Input>
            </Col>
            <Col className="mt-2">
              <Input
                id="noOfThresholds"
                placeholder="Number of Thresholds"
                name="noOfThresholds"
                type="number"
                min="0"
                max="10"
                value={noOfThresholds}
                onChange={(e) => addNoOfThresholds(e.target.value)}
              />
            </Col>
          </Row>
          <Row xs="1" sm="1" md="1" lg="1">
            {allStatus.map((status, index) => (
              <StatusDiv
                key={index}
                index={index}
                updateStatusValue={updateStatusValue}
                status={status}
                type={type}
              />
            ))}
          </Row>
          <Row>
            <Col className="mt-2">
              <Button
                className="m-2"
                onClick={verifyThresholds}
                color="primary"
              >
                Verify Threshold
              </Button>
              <Button className="m-2" onClick={handleBuyStock} color="primary">
                Buy
              </Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
