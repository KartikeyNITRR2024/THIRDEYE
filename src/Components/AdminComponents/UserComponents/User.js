import React, { useState } from "react";
import { Row, Col, Button, Input } from "reactstrap";
import "./User.css";

export default function User() {
  // State to track the visibility of the second row
  const [showDetails, setShowDetails] = useState(false);

  // Function to toggle the visibility
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <Row className="user-row">
        <Col className="user-column">1</Col>
        <Col className="user-column">Kartikey</Col>
        <Col className="user-column">
          <Input type="checkbox" />
        </Col>
        <Col className="user-column">
          <Input type="checkbox" />
        </Col>
        <Col className="user-column">
          <Button onClick={toggleDetails}>
            {showDetails ? "Less" : "More"}
          </Button>
        </Col>
      </Row>
      {showDetails && (
        <Row xs="1" sm="1" md="2" lg="4" className="user-row">
          <Col className="mt-2">
            <Input
              id="name"
              placeholder="User name"
              name="name"
              type="text"
              value="Kartikey"
            />
          </Col>
          <Col className="mt-2">
            <Input
              id="email"
              placeholder="User email"
              name="email"
              type="email"
              value="www.kartikaythawait007@gmail.com"
            />
          </Col>
          <Col className="mt-2">
            <Input
              id="password"
              placeholder="User password"
              name="password"
              type="password"
              value="system123#"
            />
          </Col>
          <Col className="mt-2">
            <Input
              id="confirm_password"
              placeholder="Confirm password"
              name="confirm_password"
              type="password"
              value="system123#"
            />
          </Col>
          <Col className="mt-2">
            <Input
              id="mobileNo"
              placeholder="Enter Mobile Number"
              name="mobileNo"
              type="text"
              value="9340579135"
            />
          </Col>
          <Col className="mt-2">
            <Input
              id="telegramGroupId1"
              placeholder="Telegram id 1"
              name="telegramGroupId1"
              type="text"
              value="K007111"
            />
          </Col>
          <Col className="mt-2">
            <Input
              id="telegramGroupId2"
              placeholder="Telegram id 2"
              name="telegramGroupId2"
              type="text"
              value="K007211"
            />
          </Col>
          <Col className="mt-2">
            <Input
              id="telegramGroupId3"
              placeholder="Telegram id 3"
              name="telegramGroupId3"
              type="text"
              value="K007311"
            />
          </Col>
          <Col className="mt-2">
            <Button className="m-2" color="primary">
              Update
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}
