import React from "react";
import { Row, Col, Input } from "reactstrap";

export default function StatusDiv({
  index,
  updateStatusValue,
  status,
  type
}) {
  return (
    <Col>
      <Row xs="2" sm="2" md="2" lg="2">
        <Col className="mt-2">
          <Input
            id={`statusId-${index}`}
            placeholder="Status Id"
            name="statusid"
            type="number"
            value={status.statusId}
            readOnly
          />
        </Col>
        <Col className="mt-2">
          <Input
            id={`statusPrice-${index}`}
            placeholder={type === 1 ? "Status Price" : "Status Percent" }
            name="statusPrice"
            type="number"
            value={status.statusPrice}
            onChange={(e) => updateStatusValue(index, 'statusPrice', e.target.value, type)}
          />
        </Col>
      </Row>
    </Col>
  );
}
