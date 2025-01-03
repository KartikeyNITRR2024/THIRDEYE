import React, { useContext, useEffect, useState } from "react";
import LatestStockContext from "../../Context/LatestStock/LatestStockContext";
import { Container, Row, Button } from "reactstrap";
import "./LatestStockHolder.css";

export default function LatestStockHolder() {
  const latestStockContext = useContext(LatestStockContext);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    latestStockContext.createLatestStockConnection();
  }, []);

  useEffect(() => {
    if (latestStockContext.latestStocks.length > 0) {
      setLoader(false);
    }
    else
    {
        setLoader(true); 
    }
  }, [latestStockContext.latestStocks]);

  return (
    <Container>
      {loader ? (
        <></>
      ) : (
        <>
          {latestStockContext.latestStocks.map((stock, index) => (
            <Row key={index} xs="2" className="p-2">
              <Button className="leftButton">{stock.stockName}</Button>
              <Button className="rightButton">
                {stock.score}
              </Button>
            </Row>
          ))}
        </>
      )}
    </Container>
  );
}
