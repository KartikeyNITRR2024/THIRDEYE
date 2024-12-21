import React from "react";
import Message from "./Message";
import './HoldedStockMessageBox.css';
export default function HoldedStockMessageBox() {
  return (
    <>
      <div className="message-group1 p-2">
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </>
  );
}
