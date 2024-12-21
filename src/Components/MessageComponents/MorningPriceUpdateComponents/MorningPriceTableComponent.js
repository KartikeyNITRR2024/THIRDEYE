import React, {useState} from "react";
import DataTable from "react-data-table-component";

const stockData = [
  { id: 1, name: "Stock 1", yesterdayprice: "123.45", todayprice: "125.30", changeinprice: "1.85", percentchange: "1.50%" },
  { id: 2, name: "Stock 2", yesterdayprice: "150.00", todayprice: "148.60", changeinprice: "-1.40", percentchange: "-0.93%" },
  { id: 3, name: "Stock 3", yesterdayprice: "200.75", todayprice: "205.50", changeinprice: "4.75", percentchange: "2.36%" },
  { id: 4, name: "Stock 4", yesterdayprice: "350.90", todayprice: "349.80", changeinprice: "-1.10", percentchange: "-0.31%" },
  { id: 5, name: "Stock 5", yesterdayprice: "420.25", todayprice: "425.10", changeinprice: "4.85", percentchange: "1.16%" },
  { id: 6, name: "Stock 6", yesterdayprice: "315.60", todayprice: "310.20", changeinprice: "-5.40", percentchange: "-1.71%" },
  { id: 7, name: "Stock 7", yesterdayprice: "125.90", todayprice: "127.80", changeinprice: "1.90", percentchange: "1.51%" },
  { id: 8, name: "Stock 8", yesterdayprice: "250.10", todayprice: "254.30", changeinprice: "4.20", percentchange: "1.68%" },
  { id: 9, name: "Stock 9", yesterdayprice: "175.60", todayprice: "176.00", changeinprice: "0.40", percentchange: "0.23%" },
  { id: 10, name: "Stock 10", yesterdayprice: "420.90", todayprice: "418.50", changeinprice: "-2.40", percentchange: "-0.57%" },
  { id: 11, name: "Stock 11", yesterdayprice: "610.30", todayprice: "615.90", changeinprice: "5.60", percentchange: "0.92%" },
  { id: 12, name: "Stock 12", yesterdayprice: "302.40", todayprice: "300.10", changeinprice: "-2.30", percentchange: "-0.76%" },
  { id: 13, name: "Stock 13", yesterdayprice: "100.90", todayprice: "104.20", changeinprice: "3.30", percentchange: "3.27%" },
  { id: 14, name: "Stock 14", yesterdayprice: "150.50", todayprice: "153.00", changeinprice: "2.50", percentchange: "1.66%" },
  { id: 15, name: "Stock 15", yesterdayprice: "289.20", todayprice: "290.90", changeinprice: "1.70", percentchange: "0.59%" },
  { id: 16, name: "Stock 16", yesterdayprice: "398.70", todayprice: "395.10", changeinprice: "-3.60", percentchange: "-0.90%" },
  { id: 17, name: "Stock 17", yesterdayprice: "480.40", todayprice: "485.80", changeinprice: "5.40", percentchange: "1.13%" },
  { id: 18, name: "Stock 18", yesterdayprice: "210.50", todayprice: "212.30", changeinprice: "1.80", percentchange: "0.86%" },
  { id: 19, name: "Stock 19", yesterdayprice: "360.00", todayprice: "358.20", changeinprice: "-1.80", percentchange: "-0.50%" },
  { id: 20, name: "Stock 20", yesterdayprice: "130.10", todayprice: "132.40", changeinprice: "2.30", percentchange: "1.77%" },
  { id: 21, name: "Stock 21", yesterdayprice: "295.80", todayprice: "299.10", changeinprice: "3.30", percentchange: "1.12%" },
  { id: 22, name: "Stock 22", yesterdayprice: "390.90", todayprice: "387.50", changeinprice: "-3.40", percentchange: "-0.87%" },
  { id: 23, name: "Stock 23", yesterdayprice: "150.60", todayprice: "155.20", changeinprice: "4.60", percentchange: "3.05%" },
  { id: 24, name: "Stock 24", yesterdayprice: "250.50", todayprice: "248.10", changeinprice: "-2.40", percentchange: "-0.96%" },
  { id: 25, name: "Stock 25", yesterdayprice: "110.90", todayprice: "112.80", changeinprice: "1.90", percentchange: "1.71%" },
  { id: 26, name: "Stock 26", yesterdayprice: "220.10", todayprice: "218.50", changeinprice: "-1.60", percentchange: "-0.73%" },
  { id: 27, name: "Stock 27", yesterdayprice: "300.80", todayprice: "305.90", changeinprice: "5.10", percentchange: "1.69%" },
  { id: 28, name: "Stock 28", yesterdayprice: "350.40", todayprice: "355.80", changeinprice: "5.40", percentchange: "1.54%" },
  { id: 29, name: "Stock 29", yesterdayprice: "420.30", todayprice: "415.10", changeinprice: "-5.20", percentchange: "-1.24%" },
  { id: 30, name: "Stock 30", yesterdayprice: "410.70", todayprice: "413.80", changeinprice: "3.10", percentchange: "0.76%" },
  { id: 31, name: "Stock 31", yesterdayprice: "325.10", todayprice: "322.80", changeinprice: "-2.30", percentchange: "-0.71%" },
  { id: 32, name: "Stock 32", yesterdayprice: "170.60", todayprice: "173.50", changeinprice: "2.90", percentchange: "1.70%" },
  { id: 33, name: "Stock 33", yesterdayprice: "510.40", todayprice: "507.90", changeinprice: "-2.50", percentchange: "-0.49%" },
  { id: 34, name: "Stock 34", yesterdayprice: "625.50", todayprice: "628.10", changeinprice: "2.60", percentchange: "0.42%" },
  { id: 35, name: "Stock 35", yesterdayprice: "540.10", todayprice: "535.40", changeinprice: "-4.70", percentchange: "-0.87%" },
  { id: 36, name: "Stock 36", yesterdayprice: "310.90", todayprice: "315.30", changeinprice: "4.40", percentchange: "1.42%" },
  { id: 37, name: "Stock 37", yesterdayprice: "350.10", todayprice: "347.80", changeinprice: "-2.30", percentchange: "-0.66%" },
  { id: 38, name: "Stock 38", yesterdayprice: "475.30", todayprice: "480.70", changeinprice: "5.40", percentchange: "1.14%" },
  { id: 39, name: "Stock 39", yesterdayprice: "512.00", todayprice: "515.90", changeinprice: "3.90", percentchange: "0.76%" },
  { id: 40, name: "Stock 40", yesterdayprice: "180.90", todayprice: "185.00", changeinprice: "4.10", percentchange: "2.27%" },
  { id: 41, name: "Stock 41", yesterdayprice: "95.30", todayprice: "97.60", changeinprice: "2.30", percentchange: "2.42%" },
  { id: 42, name: "Stock 42", yesterdayprice: "250.60", todayprice: "253.20", changeinprice: "2.60", percentchange: "1.04%" },
  { id: 43, name: "Stock 43", yesterdayprice: "390.30", todayprice: "387.90", changeinprice: "-2.40", percentchange: "-0.61%" },
  { id: 44, name: "Stock 44", yesterdayprice: "310.20", todayprice: "314.70", changeinprice: "4.50", percentchange: "1.45%" },
  { id: 45, name: "Stock 45", yesterdayprice: "280.80", todayprice: "282.10", changeinprice: "1.30", percentchange: "0.46%" },
  { id: 46, name: "Stock 46", yesterdayprice: "125.70", todayprice: "123.30", changeinprice: "-2.40", percentchange: "-1.91%" },
  { id: 47, name: "Stock 47", yesterdayprice: "155.80", todayprice: "153.90", changeinprice: "-1.90", percentchange: "-1.22%" },
  { id: 48, name: "Stock 48", yesterdayprice: "220.50", todayprice: "223.70", changeinprice: "3.20", percentchange: "1.45%" },
  { id: 49, name: "Stock 49", yesterdayprice: "150.90", todayprice: "149.20", changeinprice: "-1.70", percentchange: "-1.13%" },
  { id: 50, name: "Stock 50", yesterdayprice: "100.40", todayprice: "102.60", changeinprice: "2.20", percentchange: "2.19%" }
];


const columns = [
  { name: "ID", selector: (row) => row.id, sortable: true },
  { name: "Stock Name", selector: (row) => row.name, sortable: true },
  { name: "Yesterday Closing Price", selector: (row) => row.yesterdayprice, sortable: true },
  { name: "Today Opening Price", selector: (row) => row.todayprice, sortable: true },
  { name: "Change in price", selector: (row) => row.changeinprice, sortable: true },
  { name: "Percent Change", selector: (row) => row.percentchange, sortable: true },
  
];

const customStyles = {
  table: {
    style: {
      minWidth: '800px',
      border: 'solid #6c757d 3px',
      color:  '#6c757d',
      borderRadius: '7px'
    },
  },
  headRow: {
    style: {
      backgroundColor: 'rgb(33 37 41)',
    },
  },
  headCells: {
    style: {
      fontWeight: 'bold',
      color:  '#6c757d'
    },
  },
  rows: {
    style: {
      cursor: 'pointer',
      backgroundColor: '#343a40',
      color:  '#6c757d'
    },
  },
  pagination: {
    style: {
      backgroundColor: 'rgb(33 37 41)',
      color:  '#6c757d'
    },
  },
};

export default function MorningPriceTableComponent() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the data based on the search query
  const filteredData = stockData.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.yesterdayprice.includes(searchQuery) ||
    stock.todayprice.includes(searchQuery) ||
    stock.changeinprice.includes(searchQuery) ||
    stock.percentchange.includes(searchQuery)
  );

  return (
    <div className="container mt-3">
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
    </div>
  );
}