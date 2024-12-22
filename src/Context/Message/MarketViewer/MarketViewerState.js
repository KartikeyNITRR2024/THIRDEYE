import React, { useState, useEffect, useContext } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import MarketViewerContext from "./MarketViewerContext";
import Microservices from "../../../Property/Microservices";
import LoaderContext from "../../Loader/LoaderContext";
import NotificationContext from "../../Notification/NotificationContext";

export default function MarketViewerState(props) {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const loaderContext = useContext(LoaderContext);
  const notificationContext = useContext(NotificationContext);

  const getAllOldMessages = async (userid, typeofmessage) => {
    loaderContext.showLoader();
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
    try {
      const response = await fetch(
        `${Microservices.THIRDEYEMESSENGER.URL}api/oldmessage/get/${typeofmessage}/${userid}/${Microservices.THIRDEYEMESSENGER.ID}`,
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
          notification: "Failed to get old message",
        });
        throw new Error("Failed to get old message");
      }
      const data = await response.json();
      if (data) {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, ...data];
          return updatedMessages.sort((a, b) => {
            return new Date(a.timeofgenerating) - new Date(b.timeofgenerating);
          });
        });
      } else {
        notificationContext.showNotificationFunc({
          error: 1,
          notification: "Failed to get old message",
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

  const createMarketViewerConnection = async (userId) => {
    loaderContext.showLoader();
    try {
      // Fetch old messages first
      await getAllOldMessages(userId, 1);
      await getAllOldMessages(userId, 2);

      const socket = new SockJS(
        `${Microservices.THIRDEYEMESSENGER.URL}marketviewersubs`
      );
      const client = Stomp.over(socket);
      client.connect({}, () => {
        setStompClient(client);
        console.log("connected");
        client.subscribe(`/marketviewer/${userId}`, (message) => {
          const messageObject = {
            messageText: new TextDecoder().decode(message._binaryBody),
            timeofgenerating: new Date().toLocaleString("en-GB", {
              timeZone: "Asia/Kolkata",
              hour12: false,
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              fractionalSecondDigits: 3, // For milliseconds
            }).replace(",", "") + "+05:30",  // Manually append IST timezone offset
          };
          
          setMessages((prev) => {
            const updatedMessages = [...prev, messageObject];
            return updatedMessages.sort((a, b) => {
              // Sort by timeofgenerating in ascending order
              return new Date(a.timeofgenerating) - new Date(b.timeofgenerating);
            });
          });
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
  };

  const closeMarketViewerConnection = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log("disconnected");
      });
    }
    setStompClient(null);
    setMessages([]);
  };

  useEffect(() => {
    // Call createMarketViewerConnection when userId is available
    const userId = JSON.parse(localStorage.getItem("userDetails"))?.userId;
    if (userId) {
      createMarketViewerConnection(userId);
    }
    return () => {
      closeMarketViewerConnection();
    };
  }, []);

  return (
    <MarketViewerContext.Provider
      value={{
        messages,
        createMarketViewerConnection,
        closeMarketViewerConnection,
      }}
    >
      {props.children}
    </MarketViewerContext.Provider>
  );
}
