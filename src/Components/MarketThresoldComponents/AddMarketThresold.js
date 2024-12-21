import React, { useState, useContext } from "react";
import { Row, Col, Input } from "reactstrap";
import "./MarketThresold.css";
import MarketThresoldContext from "../../Context/MarketThresold/MarketThresoldContext";
import NotificationContext from "../../Context/Notification/NotificationContext";

export default function AddMarketThresold() {
    const notificationContext = useContext(NotificationContext);
  const marketThresoldContext = useContext(MarketThresoldContext);
  const [thresholdData, setThresholdData] = useState({
    thresoldType: -1,
    thresoldPrice: 0,
    thresoldTime: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThresholdData((prevData) => ({
      ...prevData,
      [name]: name === "thresoldType" ? parseInt(value) : parseFloat(value),
    }));
  };

  const addMarketThresold = async () => {
    if(thresholdData.thresoldPrice == null
        || thresholdData.thresoldTime == null || thresholdData.thresoldTime <= 0 
        || thresholdData.thresoldType == null || !(thresholdData.thresoldType === 1 || thresholdData.thresoldType === 0)
    )
    {
        notificationContext.showNotificationFunc({
            error: 1,
            notification: "Mendatory parameter missing/empty",
          });
          return;
    }
    await marketThresoldContext.addMarketThresold(thresholdData);
    setThresholdData({
        thresoldType: -1,
        thresoldPrice: 0,
        thresoldTime: 0, 
    })
  };

  return (
    <Row className="market-threshold-row">
      <Col className="market-threshold-column">
        <Input
          id="thresoldType"
          name="thresoldType"
          type="select"
          value={thresholdData.thresoldType}
          onChange={handleChange}
        >
          <option value="-1">Select Type</option>
          <option value="0">Percent</option>
          <option value="1">Price</option>
        </Input>
      </Col>
      <Col className="market-threshold-column">
        <Input
          id="thresoldPrice"
          name="thresoldPrice"
          type="number"
          value={thresholdData.thresoldPrice}
          onChange={handleChange}
        />
      </Col>
      <Col className="market-threshold-column">
        <Input
          id="thresoldTime"
          name="thresoldTime"
          type="number"
          value={thresholdData.thresoldTime}
          onChange={handleChange}
        />
      </Col>
      <Col className="market-threshold-column">
        <button className="threshold-button" onClick={addMarketThresold}>
          Add
        </button>
      </Col>
    </Row>
  );
}
