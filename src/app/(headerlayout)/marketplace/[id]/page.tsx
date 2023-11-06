"use client";
import CustomLoading from "@/components/ui/CustomLoading";
import { PropertyImage } from "@/components/ui/PropertyImage";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { useGetSingleMarketplaceQuery } from "@/redux/api/marketplaceApi";
import { Avatar, Button, Col, Divider, Row, Typography } from "antd";
const { Title } = Typography;

import Link from "next/link";
import React from "react";

const MarketplacePropertyDetails = ({ params }: any) => {
  const {
    data: property,
    isLoading,
    isError,
  } = useGetSingleMarketplaceQuery(params.id);
  if (isLoading) {
    return <CustomLoading />;
  }

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
            label: "marketplace",
            link: "/marketplace/",
          },
        ]}
      />

      <Row gutter={24} style={{ display: "flex", justifyContent: "center" }}>
        {/* Image Column */}
        <Col xs={24} md={12}>
          <PropertyImage imageUrl={property?.propertyImage} />
          <div style={{ marginTop: "20px" }}>
            <h2>Description:</h2> {property?.itemDescription}
          </div>
          <p style={{ margin: "20px 0" }}>
            <h1>Price: {property.price}</h1>
          </p>
        </Col>

        {/* Details Column */}
        <Col xs={24} md={10}>
          <Title level={3}>{property.title}</Title>
          <Row gutter={16}>
            <Col xs={24} md={10}>
              <h4>Category:{property.category}</h4>
              <h2>Owner Details:</h2>
              <Avatar src={property?.owner?.profilePic} size={64} />
              <p>
                Name:{" "}
                {`${property?.owner?.firstName} ${property?.owner?.middleName}`}
              </p>
              <p>Phone: {property?.owner?.phone}</p>
            </Col>
          </Row>

          <Link href={`/renter/marketplaceBooking/${property.id}`}>
            <Button type="primary" size="large" style={{ marginTop: "20px" }}>
              Book Now
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default MarketplacePropertyDetails;
