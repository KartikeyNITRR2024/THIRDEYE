const isLive = process.env.REACT_APP_ISLIVE === "1";

const Microservices = {
    "THIRDEYEPURSE": {
        "URL": isLive 
            ? process.env.REACT_APP_THIRDEYEPURSE_URL 
            : process.env.REACT_APP_THIRDEYEPURSE_URL_LOCAL,
        "ID": process.env.REACT_APP_THIRDEYEPURSE_KEY,
    },
    "THIRDEYESTOCKSMANAGER": {
        "URL": isLive 
            ? process.env.REACT_APP_THIRDEYESTOCKSMANAGER_URL 
            : process.env.REACT_APP_THIRDEYESTOCKSMANAGER_URL_LOCAL,
        "ID": process.env.REACT_APP_THIRDEYESTOCKSMANAGER_KEY,
    },
    "THIRDEYEGUIDER": {
        "URL": isLive 
            ? process.env.REACT_APP_THIRDEYEGUIDER_URL 
            : process.env.REACT_APP_THIRDEYEGUIDER_URL_LOCAL,
        "ID": process.env.REACT_APP_THIRDEYEGUIDER_KEY,
    },
    "THIRDEYESCHEDULER": {
        "URL": isLive 
            ? process.env.REACT_APP_THIRDEYESCHEDULER_URL 
            : process.env.REACT_APP_THIRDEYESCHEDULER_URL_LOCAL,
        "ID": process.env.REACT_APP_THIRDEYESCHEDULER_KEY,
    },
    "THIRDEYEMESSENGER": {
        "URL": isLive 
            ? process.env.REACT_APP_THIRDEYEMESSENGER_URL 
            : process.env.REACT_APP_THIRDEYEMESSENGER_URL_LOCAL,
        "ID": process.env.REACT_APP_THIRDEYEMESSENGER_KEY,
    },
    "THIRDEYEMORNINGPRICEUPDATER": {
        "URL": isLive 
            ? process.env.REACT_APP_THIRDEYEMORNINGPRICEUPDATER_URL 
            : process.env.REACT_APP_THIRDEYEMORNINGPRICEUPDATER_URL_LOCAL,
        "ID": process.env.REACT_APP_THIRDEYEMORNINGPRICEUPDATER_KEY,
    },
};

export default Microservices;
