import React, { useState, useEffect, useContext } from "react";
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";
import sunlogo from "../../../images/sun.png";
import "./MorningPriceUpdateOffCanvas.css"
import MorningPriceTableComponent from "./MorningPriceTableComponent";
import MorningPriceUpdaterContext from "../../../Context/Message/MorningPriceUpdater/MorningPriceUpdaterContext"

export default function MorningPriceUpdateOffCanvas() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");

  const toggle = () => setIsOpen(!isOpen);

  const morningPriceUpdaterContext = useContext(MorningPriceUpdaterContext);

  const getIndiaDateTime = () => {
    const indiaTimeZone = "Asia/Kolkata";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    };

    const indiaTime = new Date().toLocaleString("en-US", {
      timeZone: indiaTimeZone,
      ...options
    });

    setCurrentDateTime(indiaTime);
  };

  useEffect(() => {
    getIndiaDateTime();
    const interval = setInterval(getIndiaDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
     if(isOpen)
     {
        morningPriceUpdaterContext.getStocksList();
     }
     else
     {
        morningPriceUpdaterContext.clearStockList();
     }
  }, [isOpen]);

  return (
    <>
      <img
        className="sunlogo"
        alt="Morning Price Update"
        src={sunlogo}
        onClick={toggle}
      />
      <Offcanvas className="bg-dark offcanvaswidth" scrollable fade backdrop isOpen={isOpen} toggle={toggle}>
        <OffcanvasHeader className="textcolor" toggle={toggle}>
          <strong>Morning Price News </strong> {currentDateTime}
        </OffcanvasHeader>
        <OffcanvasBody className="textcolor">
          <MorningPriceTableComponent />
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}
