import React, {useEffect, useContext, useRef} from "react";
import Message from "./Message";
import './HoldedStockMessageBox.css';
import HoldedStockViewerContext from '../../../Context/Message/HoldedStockViewer/HoldedStockViewerContext';

export default function HoldedStockMessageBox() {
  const holdedStockViewerContext = useContext(HoldedStockViewerContext);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log(holdedStockViewerContext.messages);
  }, [holdedStockViewerContext.messages]);

  return (
    <div className="message-group1 p-2">
      {holdedStockViewerContext.messages.map((message, index) => (
        <Message key={index+"hs"} messageObject={message} />
      ))}
      <div ref={messageEndRef}></div>
    </div>
  );
}
