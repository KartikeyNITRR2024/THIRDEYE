import React, { useContext, useEffect } from "react";
import Navigationbar from "../Components/NavigationComponents/Navigationbar";
import HoldedStockSetting from "../Components/HoldedStockComponents/HoldedStockSetting";
import LiveMarketSetting from "../Components/MarketThresoldComponents/LiveMarketSetting";
import AdminSetting from "../Components/AdminComponents/AdminSetting";
import SettingsContext from "../Context/Settings/SettingsContext";
import Notifier from '../Components/NotificationComponents/Notifier';
import Loader from "../Components/LoaderComponents/Loader";
import MessageHolder from "../Components/MessageComponents/MessageHolder";
import LatestStockHolder from "../Components/LatestStockComponents/LatestStockHolder";

export default function HomePage() {
  const settingsContext = useContext(SettingsContext);

  return (
    <>
      <Notifier></Notifier>
      <Navigationbar />
      {settingsContext.currentSetting === 0 && <MessageHolder />}
      {settingsContext.currentSetting === 1 && <LatestStockHolder />}
      {settingsContext.currentSetting === 2 && <HoldedStockSetting />}
      {settingsContext.currentSetting === 3 && <LiveMarketSetting />}
      {settingsContext.currentSetting >= 4 && <AdminSetting />}
      <Loader></Loader>
    </>
  );
}
