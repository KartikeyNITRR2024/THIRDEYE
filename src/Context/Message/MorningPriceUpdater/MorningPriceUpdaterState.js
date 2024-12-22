import React, { useContext, useState} from "react";
import StocksContext from "../../Stocks/StocksContext";
import NotificationContext from "../../Notification/NotificationContext";
import LoaderContext from "../../Loader/LoaderContext";
import Microservices from "../../../Property/Microservices";
import MorningPriceUpdaterContext from "./MorningPriceUpdaterContext";

export default function MorningPriceUpdaterState(props) {
    const [stocksList, setStocksList] = useState([]); 

    const notificationContext = useContext(NotificationContext);
    const loaderContext = useContext(LoaderContext);

    const clearStockList = () => {
        setStocksList([]);
    }

    const getStocksList = async () => {
        loaderContext.showLoader();
        const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
        try {
            const response = await fetch(Microservices.THIRDEYEMORNINGPRICEUPDATER.URL+"api/stocklist/"+Microservices.THIRDEYEMORNINGPRICEUPDATER.ID, {
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

    return (
        <MorningPriceUpdaterContext.Provider value={{ stocksList,  getStocksList, clearStockList}}>
            {props.children}
        </MorningPriceUpdaterContext.Provider>
    );
}
