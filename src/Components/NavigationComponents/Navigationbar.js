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
import MorningPriceUpdateOffCanvas from "../MessageComponents/MorningPriceUpdateComponents/MorningPriceUpdateOffcanvas";

export default function Navigationbar() {
  const [isOpen, setIsOpen] = useState(false);
  const loginContext = useContext(LoginContext);
  const settingsContext = useContext(SettingsContext);

  const toggle = () => setIsOpen(!isOpen);

  const handleNavLinkClick = (linkNumber) => {
    settingsContext.changeSetting(linkNumber);
  };

  const logoutButton = () => {
    loginContext.logout();
  };

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
                    Holded Stock Settings
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => handleNavLinkClick(2)}>
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
                        <DropdownItem onClick={() => handleNavLinkClick(3)}>
                          Microservices
                        </DropdownItem>
                        <DropdownItem onClick={() => handleNavLinkClick(4)}>
                          Users
                        </DropdownItem>
                        <DropdownItem onClick={() => handleNavLinkClick(5)}>
                          Config
                        </DropdownItem>
                        <DropdownItem onClick={() => handleNavLinkClick(6)}>
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
