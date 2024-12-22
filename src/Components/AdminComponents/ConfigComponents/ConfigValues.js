import React, { useState, useContext } from "react";
import { Row, Col, Input } from "reactstrap";
import "./ConfigValues.css";
import PasswordContainer from "./PasswordContainer";
import ConfigSettingContext from "../../../Context/Admin/ConfigSetting/ConfigSettingContext";

export default function ConfigValues({ propertyKey = "", propertyValue = "" }) {
  const [currentValue, setCurrentValue] = useState(propertyValue);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); 
  const configSettingContext = useContext(ConfigSettingContext);

  if (propertyKey === "id" || propertyKey === "password") {
    return null;
  }

  const handleInputChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleUpdate = () => {
    setIsPasswordModalOpen(true);
  };

  const handleReset = () => {
    setCurrentValue(propertyValue);
  };

  const handlePasswordSubmit = (password) => {
    const payload = {
      password: password,
      [propertyKey]: currentValue,
    };
    setIsPasswordModalOpen(false);
    configSettingContext.updateConfigProperty(payload);
  };

  return (
    <Row className="configvalues-row">
      <Col className="configvalues-column">
        {propertyKey}
      </Col>
      <Col className="configvalues-column">
        <Input
          id={propertyKey}
          name={propertyKey}
          type="text"
          value={currentValue}
          onChange={handleInputChange}
        />
      </Col>
      <Col className="configvalues-column">
        <button className="configvalues-button" onClick={handleUpdate}>
          Update
        </button>
        <button className="configvalues-button" onClick={handleReset}>
          Reset
        </button>
      </Col>
      <PasswordContainer
        isOpen={isPasswordModalOpen}
        onSubmitPassword={handlePasswordSubmit}
        toggleModal={() => setIsPasswordModalOpen(!isPasswordModalOpen)} // Provide a function to toggle the modal
      />
    </Row>
  );
}
