import React, { useState } from "react";
import NotificationContext from "./NotificationContext";

export default function NotificationState(props) {

    const [showNotification, setShowNotification] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [errorCode, setErrorCode] = useState(-1);

    const cleanAllData = () => {
      setShowNotification(false);
      setShowLoader(false);
      setNotificationMessage("");
      setErrorCode(-1);
    }

    const showNotificationFunc = (props) => {
        setShowNotification(true);
        setNotificationMessage(props.notification);
        setErrorCode(props.error);
    }

    const hideNotificationFunc = () => {
        setShowNotification(false);
        setNotificationMessage("");
        setErrorCode(-1);
    }

    const showLoaderfunc = () => {
      setShowLoader(true);
    }

    const hideLoaderfunc = () => {
      setShowLoader(false);
    }

  return (
    <NotificationContext.Provider value={{showNotification, notificationMessage, errorCode, showNotificationFunc, hideNotificationFunc, showLoader, showLoaderfunc, hideLoaderfunc, cleanAllData}}>
      {props.children}
    </NotificationContext.Provider>
  );
}
