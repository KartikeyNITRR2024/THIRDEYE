import React, { useState, useEffect } from "react";
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";
import sunlogo from "../../../images/sun.png";
import "./MorningPriceUpdateOffCanvas.css"
import MorningPriceTableComponent from "./MorningPriceTableComponent";

export default function MorningPriceUpdateOffCanvas() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");

  const toggle = () => setIsOpen(!isOpen);

  // Function to get India's current date and time
  const getIndiaDateTime = () => {
    const indiaTimeZone = "Asia/Kolkata"; // IST (Indian Standard Time)
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

  // Update the current date and time every second
  useEffect(() => {
    getIndiaDateTime();
    const interval = setInterval(getIndiaDateTime, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

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
