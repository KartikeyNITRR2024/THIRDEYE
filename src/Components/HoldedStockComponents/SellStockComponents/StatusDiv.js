import React from "react";
import { Row, Col, Input } from "reactstrap";

export default function StatusDiv({ status, current }) {
  return (
    <Col>
      <Row
        xs="2"
        sm="2"
        md="2"
        lg="2"
        className={`p-2 ${current ? "bg-success text-white" : ""}`}
      >
        <Col className="mt-2">
          <Input
            placeholder="Status Id"
            name="sellingPriceOfSingleStock"
            type="number"
            value={status.statusId} 
            disabled
          />
        </Col>
        <Col className="mt-2">
          <Input
            placeholder="Status Price"
            name="statusPrice"
            type="number"
            value={status.statusPrice}
            disabled
          />
        </Col>
      </Row>
    </Col>
  );
}
