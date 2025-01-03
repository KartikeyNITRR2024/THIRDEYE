import React, { useContext } from "react";
import MicroservicesSetting from "./MicroservicesComponents/MicroservicesSetting";
import UserSetting from "./UserComponents/UserSetting";
import ConfigSetting from "./ConfigComponents/ConfigSetting";
import SettingsContext from "../../Context/Settings/SettingsContext";
import StocksSetting from "./StocksComponents/StocksSetting";

export default function AdminSetting() {
  const settingsContext = useContext(SettingsContext);
  return (
    <>
      {settingsContext.currentSetting === 4 && <MicroservicesSetting />}
      {settingsContext.currentSetting === 5 && <UserSetting />}
      {settingsContext.currentSetting === 6 && <ConfigSetting />}
      {settingsContext.currentSetting === 7 && <StocksSetting />}
    </>
  );
}
