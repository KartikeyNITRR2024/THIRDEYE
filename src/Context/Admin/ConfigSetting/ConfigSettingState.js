import React, { useContext, useState } from "react";
import ConfigSettingContext from "./ConfigSettingContext";
import NotificationContext from "../../Notification/NotificationContext";
import LoaderContext from "../../Loader/LoaderContext";
import Microservices from "../../../Property/Microservices";

export default function ConfigSettingState(props) {
  const notificationContext = useContext(NotificationContext);
  const loaderContext = useContext(LoaderContext);

  const [configProperties, setConfigProperties] = useState({});

  const clearAllData = () => {
    setConfigProperties({});
  }

  const getAllConfigProperties = async (payload) => {
    loaderContext.showLoader();
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
    try {
      const response = await fetch(
        Microservices.THIRDEYEGUIDER.URL +
          `api/config/` +
          Microservices.THIRDEYEGUIDER.ID +
          `/getconfig`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        notificationContext.showNotificationFunc({
          error: 1,
          notification: "Failed to get Config Properties.",
        });
        throw new Error("Failed to get Config Properties.");
      } else {
        const data = await response.json();
        setConfigProperties(data);
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

  const updateConfigProperty = async (payload) => {
    loaderContext.showLoader();
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
    try {
      const response = await fetch(
        Microservices.THIRDEYEGUIDER.URL +
          `api/config/` +
          Microservices.THIRDEYEGUIDER.ID +
          `/setconfig`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        notificationContext.showNotificationFunc({
          error: 1,
          notification: "Failed to update Config Property",
        });
        throw new Error("Failed to update Config Property");
      } else {
        const data = await response.json();
        setConfigProperties(data.configTableDto);
        notificationContext.showNotificationFunc({
          error: 0,
          notification: "Config Property Updated",
        });
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
    <ConfigSettingContext.Provider
      value={{
        getAllConfigProperties, configProperties, clearAllData, updateConfigProperty
      }}
    >
      {props.children}
    </ConfigSettingContext.Provider>
  );
}
