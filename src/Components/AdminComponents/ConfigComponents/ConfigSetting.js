import React, { useState, useContext, useEffect } from "react";
import ConfigValues from "./ConfigValues";
import { Row, Col, Container } from "reactstrap";
import "./ConfigSetting.css";
import ConfigSettingContext from "../../../Context/Admin/ConfigSetting/ConfigSettingContext";
import PasswordContainer from "./PasswordContainer";

export default function ConfigSetting() {
  const configSettingContext = useContext(ConfigSettingContext);
  const [loader, setLoader] = useState(true);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    setIsPasswordModalOpen(true);
  }, []);

  useEffect(() => {
    if (configSettingContext.configProperties !== undefined) {
      setLoader(false);
    }
  }, [configSettingContext.configProperties]);

  const handlePasswordSubmit = (password) => {
    var payload = {
      password: password
    }
    setIsPasswordModalOpen(false);
    configSettingContext.getAllConfigProperties(payload);
  };

  return (
    <Container className="configvalues-container">
      {loader ? (
        <></>
      ) : (
        <>
          <PasswordContainer
            isOpen={isPasswordModalOpen}
            onSubmitPassword={handlePasswordSubmit}
          />
          <Row className="configvalues-row">
            <Col className="configvalues-column">Config Property</Col>
            <Col className="configvalues-column">Value</Col>
            <Col className="configvalues-column">Actions</Col>
          </Row>
          {Object.entries(configSettingContext.configProperties).map(
            ([key, value]) => (
              <ConfigValues key={key} propertyKey={key} propertyValue={value} />
            )
          )}
        </>
      )}
    </Container>
  );
}
