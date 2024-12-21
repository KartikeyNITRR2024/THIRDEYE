import React, { useContext, useState } from "react";
import { Row, Col, Container, Button } from "reactstrap";
import "./MicroservicesSetting.css";
import MicroservicesSettingContext from "../../../Context/Admin/MicroservicesSetting/MicroservicesSettingContext";

export default function MicroservicesSetting() {
  const microservicesSettingContext = useContext(MicroservicesSettingContext);

  const checkstatus = () => {
    microservicesSettingContext.clearAllData();
    microservicesSettingContext.getAllMicroservicesStatus();
  };

  const restartmicroservices0 = () => {
    microservicesSettingContext.clearAllData();
    microservicesSettingContext.restartAllMicroservices(0);
  };

  const restartmicroservices1 = () => {
    microservicesSettingContext.clearAllData();
    microservicesSettingContext.restartAllMicroservices(1);
  };

  const updateMarketViewer = () => {
    microservicesSettingContext.clearAllData();
    microservicesSettingContext.updateAllMarketViewerMachine();
  };

  const getMarketViewer = () => {
    microservicesSettingContext.clearAllData();
    microservicesSettingContext.getAllMarketViewerStatus();
  };

  const updateHoldedStockViewer = () => {
    microservicesSettingContext.clearAllData();
    microservicesSettingContext.updateAllHoldedStockViewerMachine();
  };

  const getHoldedStockViewer = () => {
    microservicesSettingContext.clearAllData();
    microservicesSettingContext.getAllHoldedStockViewerStatus();
  };

  return (
    <>
      <Container>
        <Row xs="1">
          <Col xs="4">
            <Button className="m-2" color="primary" onClick={checkstatus}>
              Status
            </Button>
          </Col>
          <Col xs="4">
            <Button
              className="m-2"
              color="primary"
              onClick={restartmicroservices0}
            >
              Restart0
            </Button>
          </Col>
          <Col xs="4">
            <Button
              className="m-2"
              color="primary"
              onClick={restartmicroservices1}
            >
              Restart1
            </Button>
          </Col>
          <Col  xs="8">
            <Button
              className="m-2"
              color="primary"
              onClick={updateMarketViewer}
            >
              Update Market Viewer
            </Button>
          </Col>
          <Col  xs="8">
            <Button className="m-2" color="primary" onClick={getMarketViewer}>
              Get Market Viewer
            </Button>
          </Col>
          <Col  xs="8">
            <Button
              className="m-2"
              color="primary"
              onClick={updateHoldedStockViewer}
            >
              Update Holded Stock Viewer
            </Button>
          </Col>
          <Col  xs="8">
            <Button
              className="m-2"
              color="primary"
              onClick={getHoldedStockViewer}
            >
              Get Holded Stock Viewer
            </Button>
          </Col>
        </Row>
        <Row xs="1">
          <Col className="responseBody">
            {microservicesSettingContext.responseBody}
          </Col>
        </Row>
      </Container>
    </>
  );
}
