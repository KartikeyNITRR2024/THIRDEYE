import React, { useContext, useState } from "react";
import UserSettingContext from "./UserSettingContext";
import NotificationContext from "../../Notification/NotificationContext";
import LoaderContext from "../../Loader/LoaderContext";
import Microservices from "../../../Property/Microservices";

export default function MicroservicesSettingState(props) {
  const notificationContext = useContext(NotificationContext);
  const loaderContext = useContext(LoaderContext);

  const [users, setUsers] = useState([])

  const clearAllData = () => {
    setUsers([]);
  }

  const getAllUsers = async () => {
    loaderContext.showLoader();
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
    try {
      const response = await fetch(
        Microservices.THIRDEYEPURSE.URL +
          `api/userinfo/` +
          Microservices.THIRDEYEPURSE.ID,
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
          notification: "Failed to fetch all users",
        });
        throw new Error("Failed to fetch all users");
      } else {
        const data = await response.json();
        setUsers(JSON.stringify(data));
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
    <UserSettingContext.Provider
      value={{
        getAllUsers, users, clearAllData
      }}
    >
      {props.children}
    </UserSettingContext.Provider>
  );
}
