import React from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row, Typography } from "antd";

const { Title, Paragraph } = Typography;

type PropertyDetailsProps = {
  flatNo: string;
  city: string;
  monthlyRent: number;
  maxOccupancy: number;
  numberOfRooms: number;
  size: string;
};

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  flatNo,
  city,
  monthlyRent,
  maxOccupancy,
  numberOfRooms,
  size,
}) => {
  const iconStyle = {
    fontSize: "24px",
    marginRight: "8px",
  };

  return (
    <div style={{ padding: "16px" }}>
      <Row gutter={16}>
        <Col span={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <HomeOutlined style={iconStyle} />
            <p>Rent: {monthlyRent}</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <UserOutlined style={iconStyle} />
            <p>Max Occupancy: {maxOccupancy}</p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <AppstoreOutlined style={iconStyle} />
            <p>Number of Rooms: {numberOfRooms}</p>
          </div>

          <p>Size: {size}</p>
          <p>Flat: {flatNo}</p>
        </Col>
      </Row>
    </div>
  );
};
