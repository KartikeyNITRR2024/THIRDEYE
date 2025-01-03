import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import EntryPage from "./Pages/EntryPage";
import HomePage from "./Pages/HomePage";
import LoginState from "./Context/Login/LoginState";
import LoginContext from "./Context/Login/LoginContext";
import NotificationState from "./Context/Notification/NotificationState";
import SettingsState from "./Context/Settings/SettingsState";
import MarketThresoldState from "./Context/MarketThresold/MarketThresoldState";
import StocksState from "./Context/Stocks/StocksState";
import HoldedStockState from "./Context/HoldedStock/HoldedStockState";
import LoaderState from "./Context/Loader/LoaderState";
import MicroservicesSettingState from "./Context/Admin/MicroservicesSetting/MicroservicesSettingState";
import ConfigSettingState from "./Context/Admin/ConfigSetting/ConfigSettingState";
import UserSettingState from "./Context/Admin/UserSetting/UserSettingState";
import MorningPriceUpdaterState from "./Context/Message/MorningPriceUpdater/MorningPriceUpdaterState";
import MarketViewerState from "./Context/Message/MarketViewer/MarketViewerState";
import HoldedStockViewerState from "./Context/Message/HoldedStockViewer/HoldedStockViewerState";
import LatestStockState from "./Context/LatestStock/LatestStockState";

function App() {
  let loginContext = useContext(LoginContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (loginContext.userDetails.isLogin) {
      navigate("/settings");
    } else {
      navigate("/");
    }
  }, [
    loginContext.userDetails.isLogin,
    loginContext.userDetails.authority,
    navigate,
  ]);

  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/settings" element={<HomePage />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <LoaderState>
      <NotificationState>
        <LatestStockState>
          <HoldedStockViewerState>
            <MarketViewerState>
              <MorningPriceUpdaterState>
                <MarketThresoldState>
                  <UserSettingState>
                    <ConfigSettingState>
                      <MicroservicesSettingState>
                        <StocksState>
                          <HoldedStockState>
                            <SettingsState>
                              <LoginState>
                                <BrowserRouter>
                                  <App />
                                </BrowserRouter>
                              </LoginState>
                            </SettingsState>
                          </HoldedStockState>
                        </StocksState>
                      </MicroservicesSettingState>
                    </ConfigSettingState>
                  </UserSettingState>
                </MarketThresoldState>
              </MorningPriceUpdaterState>
            </MarketViewerState>
          </HoldedStockViewerState>
        </LatestStockState>
      </NotificationState>
    </LoaderState>
  );
}
