import { React, useState } from "react";
import { Row, Button, Table } from "reactstrap";
import "./LatestStockHolder.css";
import redTriangle from "../../images/Red_triangle.svg.png";
import greenTriangle from "../../images/green-triangle.png";

export default function LatestStocks(props) {
  const { index, stock } = props;
  const [showtable, setShowTable] = useState(false);

  const showTableFunc = () => {
    setShowTable(!showtable);
  };

  // Reverse the pastSumScores array
  const sortedScores = [...stock.pastSumScores].reverse();

  // Calculate fiveMinuteGap only if there are more than 5 scores
  let fiveMinuteGap = 0;
  let threeMinuteGap = 0;
  if (sortedScores.length > 5) {
    fiveMinuteGap = sortedScores[0] - sortedScores[4];
  }
  if (sortedScores.length > 3) {
    threeMinuteGap = sortedScores[0] - sortedScores[2];
  }

  // Determine which image to display based on the comparison
  const icon = threeMinuteGap > 0 ? greenTriangle : redTriangle;

  // Conditional rendering of the Row if there are scores to display
  if (sortedScores.length === 0 || sortedScores[0] <= 1000) {
    return null; // Render nothing if the condition is met
  }

  return (
    <Row key={index} xs="2" className="p-2">
      <Button className="leftButton">{stock.stockName}</Button>
      <Button className="rightButton" onClick={showTableFunc}>
        {sortedScores[0] + " (" + stock.pastSumScores.length + ") "}
        {fiveMinuteGap !== -1 && fiveMinuteGap !== undefined
          ? fiveMinuteGap
          : ""}
        <img
          src={icon}
          alt="icon"
          className="icon mx-3"
          style={{
            width: "16px",
            height: "16px",
          }}
        />
      </Button>
      {showtable && (
        <Table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedScores.map((pastscore, index) => (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{pastscore}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Row>
  );
}
