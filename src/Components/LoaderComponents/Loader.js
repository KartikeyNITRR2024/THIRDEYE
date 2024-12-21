import React, { useEffect, useState, useContext } from "react";
import { Button, Modal } from "reactstrap";
import "./Loader.css";
import LoaderContext from "../../Context/Loader/LoaderContext";

export default function Loader() {
  const [displayedText, setDisplayedText] = useState("");
  const loaderContext = useContext(LoaderContext);
  const fullText = "Loading...";

  useEffect(() => {
    const letters = fullText.split("");

    const intervalId = setInterval(() => {
      if (displayedText.length < letters.length) {
        setDisplayedText((prev) => prev + letters[displayedText.length]);
      } else {
        setDisplayedText("");
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [displayedText]);

  useEffect(() => {
    if(loaderContext.loader)
    {
      setModal(true);
    }
    else
    {
      setModal(false);
    }
  }, [loaderContext.loader]);

  

  const [modal, setModal] = useState(false);

  return (
    <div>
      <Modal className="model" isOpen={modal} size="sm" centered>
        <div className="loading-message">{displayedText}</div>
      </Modal>
    </div>
  );
}
