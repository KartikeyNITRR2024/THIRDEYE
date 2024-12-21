import React, { useContext, useEffect } from "react";
import Navigationbar from "../Components/NavigationComponents/Navigationbar";
import HoldedStockSetting from "../Components/HoldedStockComponents/HoldedStockSetting";
import LiveMarketSetting from "../Components/MarketThresoldComponents/LiveMarketSetting";
import AdminSetting from "../Components/AdminComponents/AdminSetting";
import SettingsContext from "../Context/Settings/SettingsContext";
import Notifier from '../Components/NotificationComponents/Notifier';
import Loader from "../Components/LoaderComponents/Loader";
import MessageHolder from "../Components/MessageComponents/MessageHolder";

export default function HomePage() {
  const settingsContext = useContext(SettingsContext);

  return (
    <>
      <Notifier></Notifier>
      <Navigationbar />
      {settingsContext.currentSetting === 0 && <MessageHolder />}
      {settingsContext.currentSetting === 1 && <HoldedStockSetting />}
      {settingsContext.currentSetting === 2 && <LiveMarketSetting />}
      {settingsContext.currentSetting >= 3 && <AdminSetting />}
      <Loader></Loader>
    </>
  );
}
