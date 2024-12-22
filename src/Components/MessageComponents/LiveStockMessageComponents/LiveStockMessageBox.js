import React, { useContext, useEffect, useRef } from "react";
import Message from "./Message";
import './LiveStockMessageBox.css';
import MarketViewerContext from '../../../Context/Message/MarketViewer/MarketViewerContext';

export default function LiveStockMessageBox() {
  const marketViewerContext = useContext(MarketViewerContext);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [marketViewerContext.messages]);

  return (
    <div className="message-group p-2">
      {marketViewerContext.messages.map((message, index) => (
        <Message key={index+"ls"} messageObject={message} />
      ))}
      <div ref={messageEndRef}></div>
    </div>
  );
}
