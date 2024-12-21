import React, { useState } from "react";
import { Button, Modal, Input } from "reactstrap";
import "./PasswordContainer.css";

export default function PasswordContainer({ isOpen, onSubmitPassword }) {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleSubmit = () => {
    onSubmitPassword(password);
    setPassword("");
  };

  return (
    <div>
      <Modal className="model" isOpen={isOpen} size="sm" centered>
        <Input 
          id="password" 
          placeholder="Enter Password" 
          name="password" 
          type="password" 
          value={password} 
          onChange={handlePasswordChange} 
        />
        <Button 
          id="enterpassword" 
          name="enterpassword" 
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal>
    </div>
  );
}
