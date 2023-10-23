"use client";
import { usePropertiesQuery } from "@/redux/api/propertyApi";
import { Button, Card, Col, Divider, Row } from "antd";
import React, { useState } from "react";
const { Meta } = Card;
import "./styles.css";
import Link from "next/link";
const style: React.CSSProperties = { background: "#0092ff", padding: "8px 0" };
const PopularPageCategory = () => {
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

  const tagToPropertyMap = new Map();

  data?.forEach((prop) => {
    prop.propertyTags?.forEach((tag) => {
      if (!tagToPropertyMap.has(tag)) {
        tagToPropertyMap.set(tag, prop);
      }
    });
  });

  return (
    <div>
      <h1>Popular Page Category</h1>
      <Divider orientation="left">Responsive</Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {Array.from(tagToPropertyMap).map(([tag, property]) => (
          <Col className="gutter-row" span={6}>
            <Card hoverable style={{ width: 240 }}>
              <div className="image-container">
                <Link href={`/property/all-property`}>
                  <div className="centered-tag clickable">{tag}</div>
                </Link>
                <img
                  alt="example"
                  src={property.imageGallery[0]}
                  style={{ width: "100%" }}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: "center", marginTop: "20px", width: "100%" }}>
        <Link href="/property/all-property">
          <Button type="primary">View All Properties</Button>
        </Link>
      </div>
    </div>
  );
};

export default PopularPageCategory;
