import React from "react";
import Message from "./Message";
import './LiveStockMessageBox.css';
export default function LiveStockMessageBox() {
  return (
      <div className="message-group p-2">
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
  );
}
