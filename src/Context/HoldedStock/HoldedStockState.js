import React, { useContext, useState } from "react";
import HoldedStockContext from "./HoldedStockContext";
import NotificationContext from "../Notification/NotificationContext";
import LoaderContext from "../Loader/LoaderContext";
import Microservices from "../../Property/Microservices";

export default function HoldedStockState(props) {

    const notificationContext = useContext(NotificationContext);
    const loaderContext = useContext(LoaderContext);

    const [allBuyedStock, setAllBuyedStock] = useState([]);

    const buyStock = async (payload) => {
        loaderContext.showLoader();
        const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
        const userId = JSON.parse(localStorage.getItem("userDetails"))?.userId;
        payload.userId = userId;
        try {
          const response = await fetch(Microservices.THIRDEYEPURSE.URL+`api/holdedstock/`+Microservices.THIRDEYEPURSE.ID+`/buystock`, {
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
              notification: "Failed to buy stock",
            });
            throw new Error("Failed to buy stock");
          }
          else
          {
            notificationContext.showNotificationFunc({
              error: 0,
              notification: "Buy Stock successfully",
            });
            const data = await response.json();
            getAllBuyedStock();
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

      const sellStock = async (payload) => {
        loaderContext.showLoader();
        const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
        const userId = JSON.parse(localStorage.getItem("userDetails"))?.userId;
        payload.userId = userId;
        try {
          const response = await fetch(Microservices.THIRDEYEPURSE.URL+`api/holdedstock/`+Microservices.THIRDEYEPURSE.ID+`/sellstock`, {
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
              notification: "Failed to sell stock",
            });
            throw new Error("Failed to sell stock");
          }
          else
          {
            notificationContext.showNotificationFunc({
              error: 0,
              notification: "Sell Stock successfully",
            });
            const data = await response.json();
            getAllBuyedStock();
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

      const clearAllBuyedStock = () => {
        setAllBuyedStock([]);
      }

      const getAllBuyedStock = async () => {
        loaderContext.showLoader();
        const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
        const userId = JSON.parse(localStorage.getItem("userDetails"))?.userId;
        try {
          const response = await fetch(Microservices.THIRDEYEPURSE.URL+`api/holdedstock/`+Microservices.THIRDEYEPURSE.ID+`/getAllBuyStockData/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "token": token,
            },
          });
          if (!response.ok) {
            notificationContext.showNotificationFunc({
              error: 1,
              notification: "Failed to fetch all buyed stock",
            });
            throw new Error("Failed to fetch all buyed stock");
          }
          else
          {
            const data = await response.json();
            data.sort((a, b) => b.holding - a.holding);
            setAllBuyedStock(data);
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
        <HoldedStockContext.Provider value={{ allBuyedStock, buyStock, getAllBuyedStock, clearAllBuyedStock, sellStock }}>
            {props.children}
        </HoldedStockContext.Provider>
    );
}
