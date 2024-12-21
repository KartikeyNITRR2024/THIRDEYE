import React, { useContext, useEffect, useState } from 'react';
import { Container } from "reactstrap";
import MarketThresold from './MarketThresold';
import "./LiveMarketSetting.css";
import MarketThresoldContext from "../../Context/MarketThresold/MarketThresoldContext";
import AddMarketThresold from './AddMarketThresold';

export default function LiveMarketSetting() {
  const marketThresoldContext = useContext(MarketThresoldContext);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    marketThresoldContext.getAllMarketThresold();
  }, []);

  useEffect(() => {
    if (marketThresoldContext.marketThresoldArray.length > 0) {
      setLoader(false);
    }
  }, [marketThresoldContext.marketThresoldArray]);

  const thresoldHeaders = {"thresoldType":"Thresold type", 
                           "thresoldPrice" : "Thresold Amount", 
                           "thresoldTime": "Thresold Time",
                           "header": true};

  return (
    <Container className="market-threshold-container">
      {loader ? (
        <></>
      ) : (
        <>
          <MarketThresold data={thresoldHeaders} />
          {marketThresoldContext.marketThresoldArray.map(data => (
            <MarketThresold key={data.id} data={data} />
          ))}
        </>
      )}
      <AddMarketThresold></AddMarketThresold>
    </Container>
  );
}
