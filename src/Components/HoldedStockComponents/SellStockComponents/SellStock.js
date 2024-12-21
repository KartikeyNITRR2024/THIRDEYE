import React, { useContext, useState, useEffect } from "react";
import HoldedStockDiv from "./HoldedStockDiv";
import { Container, Row, Col } from "reactstrap";
import "./SellStock.css";
import HoldedStockContext from "../../../Context/HoldedStock/HoldedStockContext";

export default function SellStock() {
  const holdedStockContext = useContext(HoldedStockContext);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (holdedStockContext.allBuyedStock.length > 0) {
      setLoader(false);
    }
  }, [holdedStockContext.allBuyedStock]);

  useEffect(() => {
      setLoader(true);
  }, []);

  return (
    <Container className="market-holdedstock-container">
      {loader ? (
        <></>
      ) : (
        <>
          <Row className="market-holdedstock-row">
            <Col className="market-holdedstock-column">Stock</Col>
            <Col className="market-holdedstock-column">Price</Col>
            <Col className="market-holdedstock-column">Status</Col>
            <Col className="market-holdedstock-column">Action</Col>
          </Row>
          {holdedStockContext.allBuyedStock.map((data) => (
            <HoldedStockDiv key={data.holdedStockId} data={data} />
          ))}
        </>
      )}
    </Container>
  );
}
