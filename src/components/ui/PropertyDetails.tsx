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
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: "20px", marginRight: "5px" }}>
              <HomeOutlined />
            </p>
            <p style={{ fontSize: "20px" }}>Rent:{monthlyRent}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: "20px", marginRight: "5px" }}>
              <UserOutlined />
            </p>
            <h4>Max Occupancy:{maxOccupancy}</h4>
          </div>

          <h4>
            <AppstoreOutlined /> Number of Rooms: {numberOfRooms}
          </h4>
          <h2>Size: {size}</h2>
        </Col>
      </Row>
    </>
  );
};
