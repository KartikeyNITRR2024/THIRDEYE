import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Container, Button } from "reactstrap";
import "./MicroservicesSetting.css";
import MicroservicesSettingContext from "../../../Context/Admin/MicroservicesSetting/MicroservicesSettingContext";

export default function MicroservicesSetting() {
  const microservicesSettingContext = useContext(MicroservicesSettingContext);
  const [formattedResponse, setFormattedResponse] = useState("");

  useEffect(() => {
    if (microservicesSettingContext.responseBody) {
      const data = microservicesSettingContext.responseBody;
      setFormattedResponse(data);
    }
  }, [microservicesSettingContext.responseBody]);

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

  const deleteOldMessage = () => {
    microservicesSettingContext.clearAllData();
    microservicesSettingContext.deleteAllOldMessages();
  };

  return (
    <>
      <Container>
        <Row xs="1" sm="2" md="4">
          <Col>
            <Button className="m-2 microserivcesButton" color="primary" onClick={checkstatus}>
              Microservices Status
            </Button>
          </Col>
          <Col>
            <Button
              className="m-2 microserivcesButton"
              color="primary"
              onClick={restartmicroservices0}
            >
              Restart Microservices 0
            </Button>
          </Col>
          <Col>
            <Button
              className="m-2 microserivcesButton"
              color="primary"
              onClick={restartmicroservices1}
            >
              Restart Microservices 1
            </Button>
          </Col>
          <Col>
            <Button
              className="m-2 microserivcesButton"
              color="primary"
              onClick={deleteOldMessage}
            >
              Delete Old Message
            </Button>
          </Col>
          <Col>
            <Button
              className="m-2 microserivcesButton"
              color="primary"
              onClick={updateMarketViewer}
            >
              Update Market Viewer
            </Button>
          </Col>
          <Col>
            <Button className="m-2 microserivcesButton" color="primary" onClick={getMarketViewer}>
              Get Market Viewer
            </Button>
          </Col>
          <Col>
            <Button
              className="m-2 microserivcesButton"
              color="primary"
              onClick={updateHoldedStockViewer}
            >
              Update Holded Stock Viewer
            </Button>
          </Col>
          <Col>
            <Button
              className="m-2 microserivcesButton"
              color="primary"
              onClick={getHoldedStockViewer}
            >
              Get Holded Stock Viewer
            </Button>
          </Col>
        </Row>
        <Row xs="1">
          <Col className="responseBody">
            <div dangerouslySetInnerHTML={{ __html: formattedResponse }} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
