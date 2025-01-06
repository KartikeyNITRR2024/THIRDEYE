import React, { useContext, useEffect, useState } from "react";
import LatestStockContext from "../../Context/LatestStock/LatestStockContext";
import { Container } from "reactstrap";
import "./LatestStockHolder.css";
import LatestStocks from "./LatestStocks";

export default function LatestStockHolder() {
  const latestStockContext = useContext(LatestStockContext);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    latestStockContext.createLatestStockConnection();
  }, []);

  useEffect(() => {
    if (latestStockContext.latestStocks.length > 0) {
      setLoader(false);
    } else {
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
            <LatestStocks index={index} stock={stock}/>
          ))}
        </>
      )}
    </Container>
  );
}
