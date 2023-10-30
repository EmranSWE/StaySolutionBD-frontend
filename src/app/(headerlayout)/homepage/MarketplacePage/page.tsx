"use client";
import { Row, Col, Button, message, Divider } from "antd";
import React, { useEffect, useState } from "react";

import { usePropertiesQuery } from "@/redux/api/propertyApi";
import PropertyProductCard from "@/components/ui/PropertyProductCard";
import { useMarketplacesQuery } from "@/redux/api/marketplaceApi";
import MarketPlacePropertyCard from "@/components/ui/MarketPlacePropertyCard";

//Types of marketplace property

const MarketPlacePropertyPage = () => {
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

  const { data, isLoading } = useMarketplacesQuery({ ...query });
  console.log("marketplace", data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (property: any) => {
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
        <span style={{ color: "#1890ff" }}>Marketplace</span> Property
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
          data.map((property: any) => (
            <Col
              xs={24}
              sm={24}
              md={6}
              lg={6}
              xl={6}
              key={property.id}
              style={{ margin: "0 auto" }}
            >
              <MarketPlacePropertyCard
                data={property}
                onAddToCart={handleAddToCart}
              />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default MarketPlacePropertyPage;
