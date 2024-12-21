import React, { useContext, useState, useEffect } from "react";
import LoginContext from "./LoginContext";
import NotificationContext from "../Notification/NotificationContext";
import StocksContext from "../Stocks/StocksContext";
import HoldedStockContext from "../HoldedStock/HoldedStockContext";
import MarketThresoldContext from "../MarketThresold/MarketThresoldContext";
import ConfigSettingContext from "../Admin/ConfigSetting/ConfigSettingContext";
import MicroservicesSettingContext from "../Admin/MicroservicesSetting/MicroservicesSettingContext";
import SettingsContext from "../Settings/SettingsContext";
import LoaderContext from "../Loader/LoaderContext";
import Microservices from "../../Property/Microservices";

export default function LoginState(props) {
  const [userDetails, setUserDetails] = useState({
    isLogin: false,
    userId: 0,
    userName: "",
    token: "",
    isAdmin: "",
  });

  const cleanAllData = () => {
    setUserDetails({
      isLogin: false,
      userId: 0,
      userName: "",
      token: "",
      isAdmin: "",
    });
  };

  const notificationContext = useContext(NotificationContext);
  const stocksContext = useContext(StocksContext);
  const holdedStockContext = useContext(HoldedStockContext);
  const marketThresoldContext = useContext(MarketThresoldContext);
  const settingsContext = useContext(SettingsContext);
  const loaderContext = useContext(LoaderContext);
  const microservicesSettingContext = useContext(MicroservicesSettingContext);
  const configSettingContext = useContext(ConfigSettingContext);

  const loginFunction = async (userDetails1) => {
    loaderContext.showLoader();
    var payload = {
      email: userDetails1.email,
      password: userDetails1.password,
    };
    console.log(Microservices);
    console.log("Environment Variables:", process.env);
    try {
      const response = await fetch(
        Microservices.THIRDEYEPURSE.URL +
          "api/auth/" +
          Microservices.THIRDEYEPURSE.ID +
          "/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        notificationContext.showNotificationFunc({
          error: 1,
          notification: "Failed to Login",
        });
        throw new Error("Failed to Login");
      }
      const data = await response.json();
      if (data.token !== undefined && data.token !== null) {
        setUserDetails({
          isLogin: true,
          userName: data.userName,
          token: data.token,
          isAdmin: data.isAdmin,
          userId: data.userId,
        });
      } else {
        notificationContext.showNotificationFunc({
          error: 1,
          notification: "Unable to login",
        });
        return null;
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
      notificationContext.hideLoaderfunc();
    }
  };

  const updateUserFunction = (userDetails1) => {
    setUserDetails(userDetails1);
  };

  const logout = () => {
    userDetails.isLogin = false;
    localStorage.removeItem("userDetails");
    cleanAllData();
    stocksContext.clearStockList();
    holdedStockContext.clearAllBuyedStock();
    marketThresoldContext.cleanAllData();
    notificationContext.cleanAllData();
    settingsContext.cleanAllData();
    microservicesSettingContext.clearAllData();
    configSettingContext.clearAllData();
    loaderContext.hideLoader();
    window.location.href = "/";
  };

  useEffect(() => {
    if (userDetails.isLogin) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      stocksContext.getStocksList();
      holdedStockContext.getAllBuyedStock();
    } else {
      loaderContext.showLoader();
      localStorage.removeItem("userDetails");
      cleanAllData();
      stocksContext.clearStockList();
      holdedStockContext.clearAllBuyedStock();
      marketThresoldContext.cleanAllData();
      notificationContext.cleanAllData();
      settingsContext.cleanAllData();
      microservicesSettingContext.clearAllData();
      configSettingContext.clearAllData();
      loaderContext.hideLoader();
    }
  }, [userDetails.isLogin]);

  return (
    <LoginContext.Provider
      value={{ userDetails, loginFunction, updateUserFunction, logout }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}
