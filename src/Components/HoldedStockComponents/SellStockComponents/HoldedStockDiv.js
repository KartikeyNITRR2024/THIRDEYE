import React, { useContext, useState } from "react";
import { Row, Col, Button, Input } from "reactstrap";
import "./HoldedStockDiv.css";
import StocksContext from "../../../Context/Stocks/StocksContext";
import HoldedStockContext from "../../../Context/HoldedStock/HoldedStockContext";
import NotificationContext from "../../../Context/Notification/NotificationContext";
import StatusDiv from "./StatusDiv";

export default function HoldedStockDiv({ data }) {
  const stocksContext = useContext(StocksContext);
  const holdedStockContext = useContext(HoldedStockContext);
  const notificationContext = useContext(NotificationContext);
  const [showDetails, setShowDetails] = useState(false);
  const [sellingPriceOfSingleStoke, setSellingPriceOfSingleStoke] =
    useState("");
  const [sellingTotalPrice, setSellingTotalPrice] = useState("");

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  var currentStatus = null;

  if (data.current != null) {
    currentStatus = data.current.statusId;
  }

  const handleSell = async () => {
    var stockDetails = {
      sellingPriceOfSingleStoke: Number(sellingPriceOfSingleStoke),
      sellingTotalPrice: Number(sellingTotalPrice),
      holdedStockId: data.holdedStockId,
      stockId: data.stockId,
      userId: 0,
    };

    console.log(stockDetails);

    if(stockDetails.sellingPriceOfSingleStoke === null || stockDetails.sellingPriceOfSingleStoke <= 0
      || stockDetails.sellingTotalPrice === null || stockDetails.sellingTotalPrice < (sellingPriceOfSingleStoke * data.noOfStock)
      || stockDetails.holdedStockId === null || stockDetails.holdedStockId < 0
      || stockDetails.stockId === null || stockDetails.stockId < 0
    )
    {
      notificationContext.showNotificationFunc({
        error: 1,
        notification: "Mendatory fields are invalid or empty",
      });
      return;
    }

    await holdedStockContext.sellStock(stockDetails);
    setSellingPriceOfSingleStoke("");
    setSellingTotalPrice("");
    toggleDetails();
  };

  return (
    <>
      <Row className="market-holdedstock-row">
        <Col className="market-holdedstock-column">
          {stocksContext.stocksList[data.stockId]}
        </Col>
        <Col className="market-holdedstock-column">
          {data.noOfStock + " * " + data.buyingPriceOfSingleStock}
        </Col>
        <Col className="market-holdedstock-column">
          {data.current != null ? data.current.statusId : "In Big loss"}
        </Col>
        <Col className="market-holdedstock-column">
          <Button onClick={toggleDetails}>
            {data.holding ? (showDetails ? "Hide" : "Show") : "Selled"}
          </Button>
        </Col>
      </Row>
      {showDetails && (
        <>
          <Row xs="1" sm="1" md="2" lg="4" className="market-holdedstock-row">
            <Col className="mt-2">
              <Input
                id="stockId"
                name="stockId"
                type="select"
                value={data.stockId}
                disabled
              >
                <option value={data.stockId}>
                  {stocksContext.stocksList[data.stockId]}
                </option>
              </Input>
            </Col>
            <Col className="mt-2">
              <Input
                id="buyingPriceOfSingleStock"
                placeholder="Single Stock Price"
                name="buyingPriceOfSingleStock"
                type="number"
                value={data.buyingPriceOfSingleStock}
                disabled
              />
            </Col>
            <Col className="mt-2">
              <Input
                id="noOfStock"
                placeholder="Number of Stocks"
                name="noOfStock"
                type="number"
                value={data.noOfStock}
                disabled
              />
            </Col>
            <Col className="mt-2">
              <Input
                id="buyingTotalPrice"
                placeholder="Total Buying Price"
                name="buyingTotalPrice"
                type="number"
                value={data.buyingTotalPrice}
                disabled
              />
            </Col>
            <Col className="mt-2">
              <Input
                id="type"
                name="type"
                type="select"
                value={data.type}
                disabled
              >
                <option value="0">Percent</option>
                <option value="1">Price</option>
              </Input>
            </Col>
            <Col className="mt-2">
              <Input
                id="buyingTime"
                placeholder="Buying Time"
                name="buyingTime"
                type="text"
                value={data.buyingTime}
                disabled
              />
            </Col>
            {data.holding === 0 ? (
              <>
                <Col className="mt-2">
                  <Input
                    id="sellingPriceOfSingleStoke"
                    placeholder="Single stock selling price"
                    name="sellingPriceOfSingleStoke"
                    type="number"
                    value={data.sellingPriceOfSingleStoke}
                    disabled
                  />
                </Col>
                <Col className="mt-2">
                  <Input
                    id="sellingTotalPrice"
                    placeholder="Total Selling Price"
                    name="sellingTotalPrice"
                    type="number"
                    value={data.sellingTotalPrice}
                    disabled
                  />
                </Col>
                <Col className="mt-2">
                  <Input
                    id="sellingTime"
                    placeholder="Selling Time"
                    name="sellingTime"
                    type="text"
                    value={data.buyingTime}
                    disabled
                  />
                </Col>
              </>
            ) : (
              <></>
            )}
            <Col className="mt-2">
              <Input
                id="noOfThresholds"
                placeholder="Number of Thresholds"
                name="noOfThresholds"
                type="number"
                value={data.allStatus.length}
                disabled
              />
            </Col>
          </Row>
          <Row xs="1" sm="1" md="1" lg="1" className="market-holdedstock-row">
            {data.allStatus.map((status) => (
              <StatusDiv
                key={status.statusId}
                status={status}
                current={
                  currentStatus != null && currentStatus === status.statusId
                }
              />
            ))}
          </Row>
          {data.holding === 1 ? (
            <Row xs="1" sm="1" md="2" lg="4" className="market-holdedstock-row">
              <Col className="mt-2">
                <Input
                  id="sellingPriceOfSingleStock"
                  placeholder="Single stock selling price"
                  name="sellingPriceOfSingleStock"
                  type="number"
                  value={sellingPriceOfSingleStoke}
                  onChange={(e) => setSellingPriceOfSingleStoke(e.target.value)}
                />
              </Col>
              <Col className="mt-2">
                <Input
                  id="sellingTotalPrice"
                  placeholder="Total selling price"
                  name="sellingTotalPrice"
                  type="number"
                  value={sellingTotalPrice}
                  onChange={(e) => setSellingTotalPrice(e.target.value)}
                />
              </Col>
              <Col className="mt-2">
                <Button className="m-2" color="primary" onClick={handleSell}>
                  Sell
                </Button>
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
