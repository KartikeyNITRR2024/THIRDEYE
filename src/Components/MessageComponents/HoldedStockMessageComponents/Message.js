import React from "react";
import DOMPurify from 'dompurify';
import "./Message.css"

export default function Message({ messageObject }) {
  const formattedMessage = DOMPurify.sanitize(messageObject.messageText.replace(/\n/g, "<br />"));
  return (
    <div className="message-bubble">
      <p dangerouslySetInnerHTML={{ __html: formattedMessage }} />
      <span className="timestamp">{messageObject.timeofgenerating}</span>
    </div>
  );
}
