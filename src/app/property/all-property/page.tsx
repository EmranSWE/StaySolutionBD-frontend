"use client";
import HeaderPage from "@/app/HeaderPage/page";
import { usePropertiesQuery } from "@/redux/api/propertyApi";
import { useDebounced } from "@/redux/hooks";
import React, { useState } from "react";
import { Card, Divider, Row, Col, Input, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
const { Meta } = Card;
const AllPropertyPage = () => {
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

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = usePropertiesQuery({ ...query });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return (
    <div>
      <HeaderPage />
      <Divider orientation="left">Featured Product</Divider>
      <Row gutter={16}>
        {/* Right Side: Search bar as 1 column */}
        <Col xs={24} sm={6} md={6} lg={6}>
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={18} md={18} lg={18}>
          <Row gutter={16}>
            {data?.map((property: any, index: any) => (
              <Col xs={24} sm={8} md={8} lg={8} key={index}>
                <Card
                  hoverable
                  style={{ width: "100%", marginBottom: 16 }}
                  cover={
                    <Image
                      src={property.imageGallery[0]}
                      alt="Landscape picture"
                      width={240}
                      height={240}
                    />
                  }
                >
                  <Card>
                    <Meta
                      title={property.city || "Property Title"}
                      description={
                        property.description || "Property Description"
                      }
                    />
                    <Link href={`/property/${property.id}`}>
                      <Button>More details</Button>
                    </Link>
                  </Card>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AllPropertyPage;
