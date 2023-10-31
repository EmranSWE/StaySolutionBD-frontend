"use client";
import { usePropertiesQuery } from "@/redux/api/propertyApi";
import { Button, Card, Col, Divider, Row } from "antd";
import React, { useState } from "react";
import Link from "next/link";
import CustomLoading from "@/components/ui/CustomLoading";

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
    return <CustomLoading></CustomLoading>;
  }

  const tagToPropertyMap = new Map();

  data?.forEach((prop: { propertyTags: any[] }) => {
    prop.propertyTags?.forEach((tag: any) => {
      if (!tagToPropertyMap.has(tag)) {
        tagToPropertyMap.set(tag, prop);
      }
    });
  });

  return (
    <div>
      <Divider orientation="center">
        <h1>
          <span style={{ color: "#1890ff" }}>Popular</span> Category
        </h1>
      </Divider>
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 16 }}>
          {Array.from(tagToPropertyMap).map(([tag, property]) => (
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Card
                hoverable
                style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}
              >
                <div style={{ position: "relative" }}>
                  <Link href={`/property/all-property`}>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "30px",
                        color: "#1890ff",
                        fontWeight: "bolder",
                        zIndex: 1,
                      }}
                    >
                      {tag}
                    </div>
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
      </div>

      <div style={{ textAlign: "center", marginTop: "20px", width: "100%" }}>
        <Link href="/property/all-property">
          <Button type="primary">View All Properties</Button>
        </Link>
      </div>
    </div>
  );
};

export default PopularPageCategory;
