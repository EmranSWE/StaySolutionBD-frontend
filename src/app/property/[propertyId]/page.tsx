"use client";
import { Card, Button, List, Typography, Row, Col } from "antd";
import { useSinglePropertyQuery } from "@/redux/api/propertyApi";
import HeaderPage from "@/app/HeaderPage/page";
import { isLoggedIn } from "@/services/auth.service";

const { Title, Text } = Typography;

const PropertyDetailPage = ({ params }: any) => {
  const { data, isLoading } = useSinglePropertyQuery(params.propertyId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeaderPage></HeaderPage>
      <Card style={{ width: "100%" }}>
        <Row gutter={[16, 16]}>
          {/* Left Side: Image */}
          <Col xs={24} md={10}>
            <img
              src={data?.imageGallery[0]}
              alt="Property Image"
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Col>

          {/* Right Side: Property Details */}
          <Col xs={24} md={14}>
            <Title level={2} style={{ fontSize: "24px" }}>
              {data?.city}
            </Title>
            <Text style={{ fontSize: "18px" }}>{data?.description}</Text>
            <br />
            <Text style={{ fontSize: "18px" }}>
              Rooms: {data?.numberOfRooms}
            </Text>
            <br />
            <Text style={{ fontSize: "18px" }}>Rent: ${data?.monthlyRent}</Text>
            <br />
            <Text style={{ fontSize: "18px" }}>Size: {data?.size}</Text>
            <br />
            <Text style={{ fontSize: "18px" }}>Amenities:</Text>
            <List
              size="small"
              dataSource={data?.amenities}
              renderItem={(items) => (
                <List.Item style={{ fontSize: "18px" }}>{items}</List.Item>
              )}
            />
            <Button
              type="primary"
              style={{ marginTop: "16px", fontSize: "18px" }}
            >
              Book Now
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PropertyDetailPage;
