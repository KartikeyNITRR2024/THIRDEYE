import React, { useState } from "react";
import LoaderContext from "./LoaderContext";

export default function LoaderState(props) {

    const [loader, setLoader] = useState(false);

    const showLoader = () => {
        setLoader(true);
    }

    const hideLoader = () => {
        setLoader(false);
    }

    const togleLoader = () => {
        setLoader(!loader);
    }

    const clearAllData = () => {
        setLoader(false);
    }

  return (
    <LoaderContext.Provider value={{loader, showLoader, hideLoader, togleLoader, clearAllData}}>
      {props.children}
    </LoaderContext.Provider>
  );
}
