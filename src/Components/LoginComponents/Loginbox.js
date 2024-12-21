import React, { useState, useContext } from "react";
import {
  Row,
  Col,
  Card,
  CardTitle,
  Button,
  Container,
  Input,
} from "reactstrap";
import "./Loginbox.css";
import thirdeyelogo from "../../images/thirdeyelogo.png";
import LoginContext from "../../Context/Login/LoginContext";
import NotificationContext from "../../Context/Notification/NotificationContext";

export default function LoginBox() {
  let [userDetails, setUserDetails] = useState({
    email: "www.kartikaythawait007@gmail.com",
    password: "system123#",
  });
  let loginContext = useContext(LoginContext);
  const notificationContext = useContext(NotificationContext);

  const userLogin = async () => {
    if(userDetails.email === null || userDetails.email.length <= 0
      || userDetails.password === null || userDetails.password.length <= 0
    )
    {
      notificationContext.showNotificationFunc({
        error: 1,
        notification: "Mendatory parameter missing/empty",
      });
      return;
    }
    loginContext.loginFunction(userDetails);
  };

  const fillUserDetails = (event) => {
    const { name, value, type } = event.target;
    setUserDetails((prevDetails) => {
      if (type === "checkbox" && name === "guestCheckBox") {
        return {
          ...prevDetails,
          email: "",
          password: "",
        };
      }
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  return (
    <Container>
      <Row className="justify-content-center loginbigbox">
        <Col sm="6" className="d-flex align-items-center">
          <Card body color="dark" className="text-white card-dark">
            <CardTitle className="text-center" tag="h5">
              <img className="thirdeyeimage" alt="Third Eye" src={thirdeyelogo} />
            </CardTitle>
            <div className="mt-3">
              <Input
                id="email"
                name="email"
                placeholder="Enter Email"
                type="email"
                className="dark-input"
                onChange={fillUserDetails}
                value={userDetails.email}
                disabled={userDetails.guestCheckBox}
              />
            </div>
            <div className="mt-3">
              <Input
                id="password"
                name="password"
                placeholder="Enter password"
                type="password"
                className="dark-input"
                onChange={fillUserDetails}
                value={userDetails.password}
                disabled={userDetails.guestCheckBox}
              />
            </div>
            <Button
              color="secondary"
              className="w-100 mt-3"
              onClick={userLogin}
            >
              Login
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
