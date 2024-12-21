import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Notifier.css";
import NotificationContext from "../../Context/Notification/NotificationContext";

export default function Notifier(args) {
  const [modal, setModal] = useState(false);
  const notificationContext = useContext(NotificationContext);

  useEffect(() => {
    setModal(notificationContext.showNotification);
  }, [notificationContext.showNotification]);

  const getHeaderClass = () => {
    switch (notificationContext.errorCode) {
      case 1:
        return "danger";
      case 0:
        return "success";
      default:
        return "dark";
    }
  };

  const getBodyClass = () => {
    switch (notificationContext.errorCode) {
      case 1:
        return "danger";
      case 0:
        return "success";
      default:
        return "dark";
    }
  };

  return (
    <div>
      <Modal isOpen={modal} {...args} className="dark-modal">
        <ModalHeader className={`dark-modal-header ${getHeaderClass()}`}>
          {notificationContext.errorCode === 1 ? "Error" : notificationContext.errorCode === 0 ? "Success" : ""}
        </ModalHeader>
        <ModalBody className={`dark-modal-body ${getBodyClass()}`}>
          {notificationContext.notificationMessage}
        </ModalBody>
        <ModalFooter className="dark-modal-footer">
          <Button color="secondary" onClick={notificationContext.hideNotificationFunc}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
