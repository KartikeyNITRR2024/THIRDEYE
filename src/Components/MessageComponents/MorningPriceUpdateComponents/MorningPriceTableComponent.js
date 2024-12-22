import React, { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import MorningPriceUpdaterContext from "../../../Context/Message/MorningPriceUpdater/MorningPriceUpdaterContext";

const columns = [
  { name: "ID", selector: (row) => row.id, sortable: true },
  { name: "Stock Name", selector: (row) => row.stockName, sortable: true },
  { name: "Stock ID", selector: (row) => row.stockSymbol, sortable: true },
  {
    name: "Yesterday Closing Price",
    selector: (row) => row.lastDayMarketPrice,
    sortable: true,
  },
];

const customStyles = {
  table: {
    style: {
      minWidth: "800px",
      border: "solid #6c757d 3px",
      color: "#6c757d",
      borderRadius: "7px",
    },
  },
  headRow: {
    style: {
      backgroundColor: "rgb(33 37 41)",
    },
  },
  headCells: {
    style: {
      fontWeight: "bold",
      color: "#6c757d",
    },
  },
  rows: {
    style: {
      cursor: "pointer",
      backgroundColor: "#343a40",
      color: "#6c757d",
    },
  },
  pagination: {
    style: {
      backgroundColor: "rgb(33 37 41)",
      color: "#6c757d",
    },
  },
};

export default function MorningPriceTableComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loader, setLoader] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  const morningPriceUpdaterContext = useContext(MorningPriceUpdaterContext);

  useEffect(() => {
    if (morningPriceUpdaterContext.stocksList.length > 0) {
      setLoader(false);
      setFilteredData(morningPriceUpdaterContext.stocksList);
    }
  }, [morningPriceUpdaterContext.stocksList]);

  useEffect(() => {
    const updatedData = morningPriceUpdaterContext.stocksList.filter((stock) =>
      [
        stock.id.toString(),
        stock.stockName.toLowerCase(),
        stock.stockSymbol.toLowerCase(),
        stock.marketName.toLowerCase(),
        stock.lastDayMarketPrice.toString(),
      ].some((field) => field.includes(searchQuery.toLowerCase()))
    );
    setFilteredData(updatedData);
  }, [searchQuery, morningPriceUpdaterContext.stocksList]);

  return (
    <div className="container mt-3">
      {loader ? (
        <></>
      ) : (
        <>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for stock..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            customStyles={customStyles}
          />
        </>
      )}
    </div>
  );
}
