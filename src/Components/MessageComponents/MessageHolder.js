import React from "react";
import LiveStockMessageBox from "./LiveStockMessageComponents/LiveStockMessageBox";
import HoldedStockMessageBox from "./HoldedStockMessageComponents/HoldedStockMessageBox";
import { Row, Col } from "reactstrap";
import "./MessageHolder.css";
import SubscriptionBox from "./SubscriptionBoxComponents/SubscriptionBox";

export default function MessageHolder() {
  var check = true;
  return (
    <div className="px-3">
      <Row xs="1">
        <div className="message-holder">
          <Row className="message-row">
            <Col xs="12" md="6" className="message-box live-stock p-1">
              <LiveStockMessageBox />
            </Col>
            {check === true ? (
              <Col xs="12" md="6" className="message-box holded-stock p-1">
                <HoldedStockMessageBox />
              </Col>
            ) : (
              <Col xs="12" md="6" className="message-box subscription-box">
                <SubscriptionBox />
              </Col>
            )}
          </Row>
        </div>
      </Row>
    </div>
  );
}
