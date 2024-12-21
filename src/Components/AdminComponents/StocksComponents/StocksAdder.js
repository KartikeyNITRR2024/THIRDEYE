import React, { useState, useContext, useRef } from "react";
import { Button, Container, Card, CardBody, Row, Col } from "reactstrap";
import StocksContext from "../../../Context/Stocks/StocksContext";
import NotificationContext from "../../../Context/Notification/NotificationContext";
import "./StocksAdder.css";
import uploadImage from '../../../images/uploadImage.webp';

export default function StocksAdder() {
  const [file, setFile] = useState(null);
  const stocksContext = useContext(StocksContext);
  const notificationContext = useContext(NotificationContext);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      notificationContext.showNotificationFunc({
        error: 1,
        notification: "Please select a file.",
      });
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      await stocksContext.uploadStocksList(formData);
      notificationContext.showNotificationFunc({
        error: 0,
        notification: "File uploaded successfully!",
      });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      notificationContext.showNotificationFunc({
        error: 1,
        notification: "Failed to upload file.",
      });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <Card>
            <CardBody>
              <div className="text-center">
                <img 
                  src={uploadImage} 
                  alt="Upload" 
                  style={{ cursor: 'pointer', width: '100px', height: '100px' }} 
                  onClick={() => fileInputRef.current.click()}
                />
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
              </div>
              <Button color="primary" block onClick={handleUpload} className="mt-3 uploadButton">
                Upload
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
