"use client";
import { usePropertiesQuery } from "@/redux/api/propertyApi";
import { Card, Row, Col, Divider } from "antd";
import Image from "next/image";
import React, { useState } from "react";

const { Meta } = Card;

const FeaturedPropertyPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = usePropertiesQuery({ ...query });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      <Divider orientation="left">Featured Product</Divider>
      <Row gutter={8}>
        {data?.map((property: any, index: any) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              hoverable
              style={{ width: "100%", marginBottom: 16 }} // Note the width change to 100% for responsiveness
              cover={
                <Image
                  src={property.imageGallery[0]}
                  alt="Landscape picture"
                  width={240}
                  height={240}
                />
              }
            >
              <Meta
                title={property.city || "Property Title"}
                description={property.description || "Property Description"}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedPropertyPage;
