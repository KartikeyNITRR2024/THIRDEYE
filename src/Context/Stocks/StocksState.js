import React, { useContext, useState} from "react";
import StocksContext from "./StocksContext";
import NotificationContext from "../Notification/NotificationContext";
import LoaderContext from "../Loader/LoaderContext";
import Microservices from "../../Property/Microservices";

export default function StocksState(props) {
    const [stocksList, setStocksList] = useState({}); 

    const notificationContext = useContext(NotificationContext);
    const loaderContext = useContext(LoaderContext);

    const clearStockList = () => {
        setStocksList({});
    }

    const getStocksList = async () => {
        loaderContext.showLoader();
        const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
        try {
            const response = await fetch(Microservices.THIRDEYESTOCKSMANAGER.URL+"api/stocksbatch/"+Microservices.THIRDEYESTOCKSMANAGER.ID+"/allstocks", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "token": token,
              },
            });
            if (!response.ok) {
              notificationContext.showNotificationFunc({
                error: 1,
                notification: "Failed to get stock list",
              });
              throw new Error("Failed to get stock list");
            }
            const data = await response.json();
            if(data)
            {
                setStocksList(data);
            }
            else
            {
                notificationContext.showNotificationFunc({
                error: 1, 
                notification: "Failed to get stock list"
                });
                return null;
            }
            return response.status;
          } catch (error) {
            notificationContext.showNotificationFunc({
              error: 1, 
              notification: error.message
             });
            return null;
          } finally {
            loaderContext.hideLoader();
            notificationContext.hideLoaderfunc();
          }
    };

    const uploadStocksList = async (formData) => {
      loaderContext.showLoader();
      const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
      try {
          const response = await fetch(Microservices.THIRDEYESTOCKSMANAGER.URL+"api/stockslists/"+Microservices.THIRDEYESTOCKSMANAGER.ID+"/updatestocklist", {
            method: "POST",
            headers: {
              "token": token,
            },
            body: formData,
          });
          if (!response.ok) {
            notificationContext.showNotificationFunc({
              error: 1,
              notification: "Failed to update stock list",
            });
            throw new Error("Failed to update stock list");
          }
          else
          {
            notificationContext.showNotificationFunc({
              error: 0,
              notification: "Stock list updated",
            });
            getStocksList();
          }
        } catch (error) {
          notificationContext.showNotificationFunc({
            error: 1, 
            notification: error.message
           });
          return null;
        } finally {
          loaderContext.hideLoader();
          notificationContext.hideLoaderfunc();
        }
  };

    return (
        <StocksContext.Provider value={{ stocksList,  getStocksList, clearStockList, uploadStocksList}}>
            {props.children}
        </StocksContext.Provider>
    );
}
