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
          <p>
            <HomeOutlined /> Rent: {monthlyRent}
          </p>
          <p>
            <UserOutlined /> Max Occupancy: {maxOccupancy}
          </p>
          <p>
            <AppstoreOutlined /> Number of Rooms: {numberOfRooms}
          </p>
          <p>Size: {size}</p>
        </Col>
      </Row>
    </>
  );
};
