import React, { useState, useContext } from "react";
import MarketThresoldContext from "./MarketThresoldContext";
import NotificationContext from "../Notification/NotificationContext";
import LoaderContext from "../Loader/LoaderContext";
import Microservices from "../../Property/Microservices";

export default function MarketThresoldState(props) {
    const [marketThresoldArray, setMarketThresoldArray] = useState([]); 

    const cleanAllData = () => {
        setMarketThresoldArray([]);
    }

    const notificationContext = useContext(NotificationContext);
    const loaderContext = useContext(LoaderContext);

    const getAllMarketThresold = async () => {
        loaderContext.showLoader();
        const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
        const userId = JSON.parse(localStorage.getItem("userDetails"))?.userId;
        try {
          const response = await fetch(Microservices.THIRDEYEPURSE.URL+`api/marketthresold/`+Microservices.THIRDEYEPURSE.ID+`/getallmarketthresold/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "token": token,
            },
          });
          if (!response.ok) {
            notificationContext.showNotificationFunc({
              error: 1,
              notification: "Failed to fetch market thresold values",
            });
            throw new Error("Failed to fetch market thresold values");
          }
          
          const data = await response.json();
          setMarketThresoldArray(data);
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

      const addMarketThresold = async (data) => {
        loaderContext.showLoader();
        const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
        const userId = JSON.parse(localStorage.getItem("userDetails"))?.userId;
        const payload = {
          "userId": userId,
          "thresoldTime": data.thresoldTime,
          "thresoldPrice": data.thresoldPrice,
          "thresoldType": data.thresoldType
        };
        try {
          const response = await fetch(Microservices.THIRDEYEPURSE.URL+`api/marketthresold/`+Microservices.THIRDEYEPURSE.ID+`/addmarketthresold`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "token": token,
            },
            body: JSON.stringify(payload),
          });
          if (!response.ok) {
            notificationContext.showNotificationFunc({
              error: 1,
              notification: "Failed to add market thresold",
            });
            throw new Error("Failed to add market thresold values");
          }
          else
          {
            notificationContext.showNotificationFunc({
              error: 0,
              notification: "market thresold value added successfully",
            });
            const data = await response.json();
            getAllMarketThresold();
            return data;
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

      const deleteMarketThresold = async (thresoldId) => {
        loaderContext.showLoader();
        const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
        try {
          const response = await fetch(Microservices.THIRDEYEPURSE.URL+`api/marketthresold/`+Microservices.THIRDEYEPURSE.ID+`/deletemarketthresold/${thresoldId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "token": token,
            },
          });
          if (!response.ok) {
            notificationContext.showNotificationFunc({
              error: 1,
              notification: "Failed to delete market thresold",
            });
            throw new Error("Failed to delete market thresold");
          }
          else
          {
            notificationContext.showNotificationFunc({
              error: 0,
              notification: "market thresold value deleted successfully",
            });
            const data = await response.json();
            getAllMarketThresold();
            return data;
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
        <MarketThresoldContext.Provider value={{ marketThresoldArray, cleanAllData, getAllMarketThresold, addMarketThresold, deleteMarketThresold }}>
            {props.children}
        </MarketThresoldContext.Provider>
    );
}
