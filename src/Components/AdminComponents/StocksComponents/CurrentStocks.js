import React, { useContext, useState, useEffect } from "react";
import StocksContext from "../../../Context/Stocks/StocksContext";
import { Row, Col, Container, Table, Input, Button } from "reactstrap";

export default function CurrentStocks() {
  const stocksContext = useContext(StocksContext);
  const [loader, setLoader] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    stocksContext.getStocksList();
  }, []);

  useEffect(() => {
    if (stocksContext.stocksList !== undefined) {
      setLoader(false);
    }
  }, [stocksContext.stocksList]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStocks = Object.entries(stocksContext.stocksList).filter(
    ([key, value]) =>
      key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="configvalues-container">
      <Row xs='1' sm='2' md='4' className="mb-3 justify-content-end">
        <Col>
          <Input
            type="text"
            placeholder="Search Stocks by ID or Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>
      {loader ? (
        <></>
      ) : (
        <Table dark hover striped>
          <thead>
            <tr>
              <th>Stocks Id</th>
              <th>Stocks Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
