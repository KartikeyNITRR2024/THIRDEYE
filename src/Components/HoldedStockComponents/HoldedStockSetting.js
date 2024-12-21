import React, { useState, useContext } from "react";
import { Row, Col, Container, Button } from "reactstrap";
import BuyStock from "./BuyStockComponents/BuyStock";
import SellStock from "./SellStockComponents/SellStock";
import StocksContext from "../../Context/Stocks/StocksContext";
import HoldedStockContext from "../../Context/HoldedStock/HoldedStockContext";

export default function HoldedStockSetting() {
  const stocksContext = useContext(StocksContext);
  const holdedStockContext = useContext(HoldedStockContext);
  const [view, setView] = useState("buy");

  const handleViewChange = (viewName) => {
    setView(viewName);
    if(viewName === "buy")
    {
      stocksContext.getStocksList();
    }
    else
    {
      holdedStockContext.clearAllBuyedStock();
      holdedStockContext.getAllBuyedStock();
    }
  };

  return (
    <Container>
      <Row xs="1">
        <Col>
          <Button className="m-2" color="primary" onClick={() => handleViewChange("buy")}>
            Buy Stock
          </Button>
          <Button className="m-2" color="primary" onClick={() => handleViewChange("sell")}>
            Sell Stock
          </Button>
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          {view === "buy" && <BuyStock />}
          {view === "sell" && <SellStock />}
        </Col>
      </Row>
    </Container>
  );
}
