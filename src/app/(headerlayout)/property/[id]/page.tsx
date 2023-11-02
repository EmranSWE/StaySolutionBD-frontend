"use client";
import { useSinglePropertyQuery } from "@/redux/api/propertyApi";
import { Card, Col, Row, List, Typography, Button, Divider } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  ExclamationCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { PropertyDetails } from "@/components/ui/PropertyDetails";
import { IconList } from "@/components/ui/IconList";
import Link from "next/link";
import styles from "./singleproperty.module.css";
import CustomLoading from "@/components/ui/CustomLoading";
const { Title, Paragraph } = Typography;
type PageDetailsProps = {
  params: {
    id: string;
  };
};

type Property = {
  amenities: string[];
  availableDate: string;
  city: string;
  createdAt: string;
  description: string;
  flatNo: string;
  id: string;
  imageGallery: string[];
  insuranceId?: string | null;
  location: string[];
  maxOccupancy: number;
  monthlyRent: number;
  numberOfRooms: number;
  ownerId: string;
  propertyStatus: string;
  propertyTags: string[];
  rules: string[];
  size: string;
  videoLink?: string | null;
};
const PageDetails = ({ params }: PageDetailsProps) => {
  if (!params || !params.id) return <div>Error: Invalid Property ID</div>;

  const {
    data: property,
    isLoading,
    isError,
  } = useSinglePropertyQuery(params.id);
  console.log(property);
  if (isLoading) {
    return <CustomLoading />;
  }
  if (isError) return <div>Error fetching property details.</div>;

  return (
    <div>
      <Divider>
        <h1 style={{ textAlign: "center", marginBottom: "15px" }}>
          Property <span style={{ color: "rgb(24, 144, 255)" }}>Details</span>
        </h1>
      </Divider>
      <SSBreadCrumb
        items={[
          {
            label: "all property",
            link: "/property/all-property",
          },
        ]}
      />
      <Row gutter={24} style={{ display: "flex", justifyContent: "center" }}>
        {/* Image Column */}
        <Col xs={24} md={12}>
          <PropertyImage imageUrl={property.imageGallery[0]} />
          <div style={{ marginTop: "20px" }}>
            <h2>Description:</h2> {property.description}
          </div>
          <p style={{ margin: "20px 20px" }}>
            <IconList
              title="Rules"
              dataSource={property.rules}
              icon={<ExclamationCircleOutlined />}
            />
          </p>
        </Col>

        {/* Details Column */}
        <Col xs={24} md={10}>
          <Title level={3}>
            {property.title}, {property.city}
          </Title>
          <Row gutter={16}>
            <Col xs={24} md={10}>
              <PropertyDetails
                flatNo={property.flatNo}
                city={property.city}
                monthlyRent={property.monthlyRent}
                maxOccupancy={property.maxOccupancy}
                numberOfRooms={property.numberOfRooms}
                size={property.size}
              />
            </Col>
          </Row>

          <IconList
            title="Amenities"
            dataSource={property.amenities}
            icon={<SmileOutlined />}
          />

          {property.propertyStatus === "available" ? (
            <Link href={`/renter/booking/${property.id}`}>
              <Button
                type="primary"
                size="large"
                style={{ width: "100%", margin: "50px 0" }}
              >
                Book Now
              </Button>
            </Link>
          ) : (
            <Link href={`/property/all-property/`}>
              <Button
                type="primary"
                size="large"
                disabled
                style={{
                  width: "100%",
                  margin: "50px 0",
                  backgroundColor: "gray",
                }}
              >
                Not Available
              </Button>
            </Link>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PageDetails;
