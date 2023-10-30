"use client";
import { Row, Col, Button, message, Divider } from "antd";
import React, { useEffect, useState } from "react";

import { useFeaturedPropertyQuery } from "@/redux/api/propertyApi";
import PropertyProductCard from "@/components/ui/PropertyProductCard";

//Types of marketplace property
type Property = {
  id: string;
  location: string[];
  city?: string;
  numberOfRooms: number;
  monthlyRent?: number;
  flatNo?: string;
  description?: string;
  availableDate?: Date;
  size?: string;
  maxOccupancy: number;
};

const AllPropertyData = () => {
  const [cartCounts, setCartCounts] = useState<Record<string, number>>(() => {
    if (typeof window !== "undefined") {
      const savedCounts = localStorage.getItem("cartCounts");
      return savedCounts ? JSON.parse(savedCounts) : {};
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("propertyCount", JSON.stringify(cartCounts));
  }, [cartCounts]);
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(4);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useFeaturedPropertyQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (property: Property) => {
    message.success("Added to cart");
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [property.id]: (prevCounts[property.id] || 0) + 1,
    }));
  };

  return (
    <>
      <Divider
        orientation="center"
        style={{ fontSize: "30px", fontWeight: "bolder" }}
      >
        <span style={{ color: "#1890ff" }}>Featured</span> Property
      </Divider>

      <Row
        gutter={[0, 20]}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {data &&
          data.map((property: Property) => (
            <Col
              xs={24}
              sm={24}
              md={6}
              lg={6}
              xl={6}
              key={property.id}
              style={{ margin: "0 auto" }}
            >
              <PropertyProductCard
                data={property}
                onAddToCart={handleAddToCart}
              />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default AllPropertyData;
