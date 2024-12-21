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
      {settingsContext.currentSetting === 3 && <MicroservicesSetting />}
      {settingsContext.currentSetting === 4 && <UserSetting />}
      {settingsContext.currentSetting === 5 && <ConfigSetting />}
      {settingsContext.currentSetting === 6 && <StocksSetting />}
    </>
  );
}
