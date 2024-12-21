import React, {useContext, useState} from "react";
import { Row, Col, Container, Button } from "reactstrap"
import "./MicroservicesSetting.css";
import MicroservicesSettingContext from "../../../Context/Admin/MicroservicesSetting/MicroservicesSettingContext";

export default function MicroservicesSetting() {

  const microservicesSettingContext = useContext(MicroservicesSettingContext);

  const checkstatus = () => {
    microservicesSettingContext.clearAllData();
    microservicesSettingContext.getAllMicroservicesStatus();
  }

  const restartmicroservices0 = () => {
    microservicesSettingContext.clearAllData();
    microservicesSettingContext.restartAllMicroservices(0);
  }

  const restartmicroservices1 = () => {
    microservicesSettingContext.clearAllData();
    microservicesSettingContext.restartAllMicroservices(1);
  }

  return (
    <>
      <Container>
        <Row xs="1">
          <Col>
            <Button
              className="m-2"
              color="primary"
              onClick={checkstatus}
            >
              Check Status
            </Button>
            <Button
              className="m-2"
              color="primary"
              onClick={restartmicroservices0}
            >
              Restart0
            </Button>
            <Button
              className="m-2"
              color="primary"
              onClick={restartmicroservices1}
            >
              Restart1
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
