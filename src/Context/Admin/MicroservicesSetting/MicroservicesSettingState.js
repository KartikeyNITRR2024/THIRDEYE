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

  const deleteAllOldMessages = async () => {
    loaderContext.showLoader();
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
    try {
      const response = await fetch(
        `${Microservices.THIRDEYEMESSENGER.URL}api/oldmessage/delete/${Microservices.THIRDEYEMESSENGER.ID}`,
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
          notification: "Failed to delete old message",
        });
        throw new Error("Failed to delete old message");
      }
      else
      {
        notificationContext.showNotificationFunc({
          error: 0,
          notification: "Old Message Deleted Successfully",
        });
      }
      return response.status;
    } catch (error) {
      notificationContext.showNotificationFunc({
        error: 1,
        notification: error.message,
      });
      return null;
    } finally {
      loaderContext.hideLoader();
    }
  };

  const formatResponse = (response) =>
  {
    return Object.entries(response)
    .map(([key, value]) => `${key}: ${value}`)
    .join('</br>');
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
        setResponseBody(formatResponse(data));
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

  const getAllMarketViewerStatus = async () => {
    loaderContext.showLoader();
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
    try {
      const response = await fetch(
        Microservices.THIRDEYEMACHINEHANDLER.URL +
          `api/machine/fromfrontend/marketviewermachine/get/`+
          Microservices.THIRDEYEMACHINEHANDLER.ID,
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
          notification: "Failed to get all Market Viewer status.",
        });
        throw new Error("Failed to get all Market Viewer status.");
      } else {
        const data = await response.json();
        setResponseBody(formatResponse(data));
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

  const getAllHoldedStockViewerStatus = async () => {
    loaderContext.showLoader();
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
    try {
      const response = await fetch(
        Microservices.THIRDEYEMACHINEHANDLER.URL +
          `api/machine/fromfrontend/holdedstockviewermachine/get/`+
          Microservices.THIRDEYEMACHINEHANDLER.ID,
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
          notification: "Failed to get all Market Viewer status.",
        });
        throw new Error("Failed to get all Market Viewer status.");
      } else {
        const data = await response.json();
        setResponseBody(formatResponse(data));
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
        setResponseBody(formatResponse(data));
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

  const updateAllHoldedStockViewerMachine = async (type) => {
    loaderContext.showLoader();
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
    try {
      const response = await fetch(
        Microservices.THIRDEYEMACHINEHANDLER.URL +
          `api/machine/fromfrontend/holdedstockviewermachine/update/` +
          Microservices.THIRDEYEMACHINEHANDLER.ID,
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
          notification: "Failed to restart all market viewer machines.",
        });
        throw new Error("Failed to restart all market viewer machines.");
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

  const updateAllMarketViewerMachine = async (type) => {
    loaderContext.showLoader();
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
    try {
      const response = await fetch(
        Microservices.THIRDEYEMACHINEHANDLER.URL +
          `api/machine/fromfrontend/marketviewermachine/update/` +
          Microservices.THIRDEYEMACHINEHANDLER.ID,
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
          notification: "Failed to restart all holded stock machines.",
        });
        throw new Error("Failed to restart all holded stock machines.");
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
        getAllMicroservicesStatus, responseBody, clearAllData, restartAllMicroservices, getAllMarketViewerStatus, getAllHoldedStockViewerStatus, updateAllMarketViewerMachine, updateAllHoldedStockViewerMachine, deleteAllOldMessages
      }}
    >
      {props.children}
    </MicroservicesSettingContext.Provider>
  );
}
