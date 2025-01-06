import React, { useState, useEffect, useContext } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import LatestStockContext from "./LatestStockContext";
import Microservices from "../../Property/Microservices";
import LoaderContext from "../Loader/LoaderContext";
import NotificationContext from "../Notification/NotificationContext";

export default function LatestStockState(props) {
  const [latestStocks, setLatestStocks] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const loaderContext = useContext(LoaderContext);
  const notificationContext = useContext(NotificationContext);

  const getAllLatestStock = async () => {
    loaderContext.showLoader();
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
    try {
      const response = await fetch(
        `${Microservices.THIRDEYEPROCESSER.URL}api/marketviewerprocesser/getlateststock/${Microservices.THIRDEYEPROCESSER.ID}`,
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
          notification: "Failed to get latest stocks",
        });
        throw new Error("Failed to get latest stocks");
      }
      const data = await response.json();
      if (data) {
        console.log(data);
        setLatestStocks(data);
      } else {
        notificationContext.showNotificationFunc({
          error: 1,
          notification: "Failed to get latest stocks",
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

  const createLatestStockConnection = async () => {
    if (stompClient == null) {
      loaderContext.showLoader();
      try {
        await getAllLatestStock();

        const socket = new SockJS(
          `${Microservices.THIRDEYEPROCESSER.URL}lateststocksubs`
        );
        const client = Stomp.over(socket);
        client.connect({}, () => {
          setStompClient(client);
          console.log("connected");
          client.subscribe(`/lateststock`, (data) => {
            data = JSON.parse(new TextDecoder().decode(data._binaryBody));
            console.log(data);
            setLatestStocks(data);
          });
        });
      } catch (error) {
        console.error(error);
        notificationContext.showNotificationFunc({
          error: 1,
          notification: "Failed to create connection",
        });
      } finally {
        loaderContext.hideLoader();
      }
    }
  };

  const closeLatestStockConnection = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log("disconnected");
      });
    }
    setStompClient(null);
    setLatestStocks([]);
  };

  useEffect(() => {
    const isLogin = JSON.parse(localStorage.getItem("userDetails"))?.isLogin;
    if (isLogin) {
      createLatestStockConnection();
    }
    return () => {
      closeLatestStockConnection();
    };
  }, []);

  return (
    <LatestStockContext.Provider
      value={{
        latestStocks,
        createLatestStockConnection,
        closeLatestStockConnection,
      }}
    >
      {props.children}
    </LatestStockContext.Provider>
  );
}
