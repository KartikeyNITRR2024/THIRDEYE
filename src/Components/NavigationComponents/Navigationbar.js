import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import thirdeyelogo from "../../images/thirdeyelogo.png";
import sunlogo from "../../images/sun.png";
import reloadlogo from "../../images/reload.png";
import "./Navigationbar.css";
import LoginContext from "../../Context/Login/LoginContext";
import SettingsContext from "../../Context/Settings/SettingsContext";
import MarketViewerContext from "../../Context/Message/MarketViewer/MarketViewerContext";
import HoldedStockViewerContext from "../../Context/Message/HoldedStockViewer/HoldedStockViewerContext";
import MorningPriceUpdateOffCanvas from "../MessageComponents/MorningPriceUpdateComponents/MorningPriceUpdateOffcanvas";

export default function Navigationbar() {
  const [isOpen, setIsOpen] = useState(false);
  const loginContext = useContext(LoginContext);
  const settingsContext = useContext(SettingsContext);
  const marketViewerContext = useContext(MarketViewerContext);
  const holdedStockViewerContext = useContext(HoldedStockViewerContext);

  const toggle = () => setIsOpen(!isOpen);

  const handleNavLinkClick = (linkNumber) => {
    settingsContext.changeSetting(linkNumber);
    setIsOpen(false);
  };

  const logoutButton = () => {
    loginContext.logout();
  };

  const reconnectWebsocket = () => {
    const userId = JSON.parse(localStorage.getItem("userDetails"))?.userId;
    marketViewerContext.closeMarketViewerConnection();
    holdedStockViewerContext.closeHoldedStockViewerConnection();
    marketViewerContext.createMarketViewerConnection(userId);
    holdedStockViewerContext.createHoldedStockViewerConnection(userId);
    setIsOpen(false);
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <img className="thirdeyelogo" alt="Third Eye" src={thirdeyelogo} />
        </NavbarBrand>
        {loginContext?.userDetails?.isLogin && (
          <>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto" navbar>
                <NavItem>
                  <NavLink onClick={() => handleNavLinkClick(0)}>
                    Stocks Updates
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => handleNavLinkClick(1)}>
                    Latest Stock
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => handleNavLinkClick(2)}>
                    Holded Stock Settings
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => handleNavLinkClick(3)}>
                    Live Market Settings
                  </NavLink>
                </NavItem>
                {loginContext?.userDetails?.isAdmin && (
                  <>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Admin Settings
                      </DropdownToggle>
                      <DropdownMenu end>
                        <DropdownItem onClick={() => handleNavLinkClick(4)}>
                          Microservices
                        </DropdownItem>
                        <DropdownItem onClick={() => handleNavLinkClick(5)}>
                          Users
                        </DropdownItem>
                        <DropdownItem onClick={() => handleNavLinkClick(6)}>
                          Config
                        </DropdownItem>
                        <DropdownItem onClick={() => handleNavLinkClick(7)}>
                          Stocks
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </>
                )}
              </Nav>
              {(settingsContext?.currentSetting === 0) && (
                <>
                  <NavbarBrand>
                    <MorningPriceUpdateOffCanvas></MorningPriceUpdateOffCanvas>
                  </NavbarBrand>
                  <NavbarBrand>
                    <img
                      className="reloadlogo"
                      alt="Reload Updates"
                      src={reloadlogo}
                      onClick={reconnectWebsocket}
                    />
                  </NavbarBrand>
                </>
              )}
              <Button color="secondary" onClick={logoutButton}>
                Logout
              </Button>
            </Collapse>
          </>
        )}
      </Navbar>
    </div>
  );
}
