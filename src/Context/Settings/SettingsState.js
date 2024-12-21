import React, { useState, useContext, useEffect } from "react";
import SettingsContext from "./SettingsContext";
import MarketThresoldContext from "../MarketThresold/MarketThresoldContext";

export default function SettingsState(props) {

    const marketThresoldContext = useContext(MarketThresoldContext);

    const [currentSetting, setCurrentSetting] = useState(0); 
    const cleanAllData = () => {
      setCurrentSetting(0);
    }

    const changeSetting = (setting) => {
      setCurrentSetting(setting);
    }
  

    return (
        <SettingsContext.Provider value={{ currentSetting, cleanAllData, changeSetting}}>
            {props.children}
        </SettingsContext.Provider>
    );
}
