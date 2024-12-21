import React, {useContext} from "react";
import { Row, Col } from "reactstrap";
import "./MarketThresold.css";
import MarketThresoldContext from "../../Context/MarketThresold/MarketThresoldContext";

export default function MarketThresold({ data }) {

  const marketThresoldContext = useContext(MarketThresoldContext);
  const deleteMarketThresold = async () => {
    await marketThresoldContext.deleteMarketThresold(data.id);
  };

  return (
    <Row className="market-threshold-row">
      <Col className="market-threshold-column">
        {data.header ? (
          data.thresoldType
        ) : (
          data.thresoldType === 1 ? "Price" : "Percent"
        )}
      </Col>
      <Col className="market-threshold-column">
        {data.header ? (
          data.thresoldPrice
        ) : (
          parseFloat(data.thresoldPrice).toFixed(2)
        )}
      </Col>
      <Col className="market-threshold-column">{data.thresoldTime}</Col>
      <Col className="market-threshold-column">
        {data.header ? (
          "Action"
        ) : (
          <button className="threshold-button" onClick={deleteMarketThresold}>Remove</button>
        )}
      </Col>
    </Row>
  );
}
