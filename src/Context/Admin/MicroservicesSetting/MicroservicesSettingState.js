import React, { useContext, useState } from "react";
import MicroservicesSettingContext from "./MicroservicesSettingContext";
import NotificationContext from "../../Notification/NotificationContext";
import LoaderContext from "../../Loader/LoaderContext";
import Microservices from "../../../Property/Microservices";

export default function MicroservicesSettingState(props) {
  const notificationContext = useContext(NotificationContext);
  const loaderContext = useContext(LoaderContext);

  const [responseBody, setResponseBody] = useState("Response.......")

  const clearAllData = () => {
    setResponseBody("Response.......");
  }

  const getAllMicroservicesStatus = async () => {
    loaderContext.showLoader();
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
    try {
      const response = await fetch(
        Microservices.THIRDEYESCHEDULER.URL +
          `api/statuschecker/` +
          Microservices.THIRDEYESCHEDULER.ID +
          `/getStatus`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      if (!response.ok) {
        notificationContext.showNotificationFunc({
          error: 1,
          notification: "Failed to check status of all microservices.",
        });
        throw new Error("Failed to check status of all microservices.");
      } else {
        const data = await response.json();
        setResponseBody(JSON.stringify(data));
      }
    } catch (error) {
      notificationContext.showNotificationFunc({
        error: 1,
        notification: error.message,
      });
    } finally {
      loaderContext.hideLoader();
      notificationContext.hideLoaderfunc();
    }
  };

  const restartAllMicroservices = async (type) => {
    loaderContext.showLoader();
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
    try {
      const response = await fetch(
        Microservices.THIRDEYEGUIDER.URL +
          `api/update/updateallmicroservicesfromfrontend/` +
          Microservices.THIRDEYEGUIDER.ID +
          `/`+type,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      if (!response.ok) {
        notificationContext.showNotificationFunc({
          error: 1,
          notification: "Failed to restart all microservices.",
        });
        throw new Error("Failed to restart status of all microservices.");
      } else {
        const data = await response.json();
        setResponseBody(JSON.stringify(data));
      }
    } catch (error) {
      notificationContext.showNotificationFunc({
        error: 1,
        notification: error.message,
      });
    } finally {
      loaderContext.hideLoader();
      notificationContext.hideLoaderfunc();
    }
  };


  return (
    <MicroservicesSettingContext.Provider
      value={{
        getAllMicroservicesStatus, responseBody, clearAllData, restartAllMicroservices
      }}
    >
      {props.children}
    </MicroservicesSettingContext.Provider>
  );
}
