import React, { useState, useEffect, useContext } from 'react';
import User from './User';
import { Container, Row, Col } from "reactstrap";
import "./UserSetting.css";
import UserContext from "../../../Context/Admin/UserSetting/UserSettingContext";

export default function UserSetting() {
  const userContext = useContext(UserContext);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (userContext.users.length > 0) {
      setLoader(false);
    }
  }, [userContext.users]);

  useEffect(() => {
      setLoader(true);
      userContext.getAllUsers();
  }, []);

  return (
    <Container className="user-container">
      <Row className="user-row">
        <Col className="user-column">
          Id
        </Col>
        <Col className="user-column">
          Name
        </Col>
        <Col className="user-column">
          Active
        </Col>
        <Col className="user-column">
          Admin
        </Col>
        <Col className="user-column">
          Action
        </Col>
      </Row>
      {loader ? (
        <></>
      ) : (
        <>
          <User />
        </>
      )}
    </Container>
  );
}
