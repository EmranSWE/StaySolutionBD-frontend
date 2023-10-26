"use client";
import { useMarketplacesQuery } from "@/redux/api/marketplaceApi";
import { usePropertiesQuery } from "@/redux/api/propertyApi";
import { Card, Avatar, Row, Col, Divider, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const MarketPlaceProperty = () => {
  const [cartCounts, setCartCounts] = useState<Record<string, number>>(() => {
    // This function runs during SSR as well, so check for window object
    if (typeof window !== "undefined") {
      const savedCounts = localStorage.getItem("cartCounts");
      return savedCounts ? JSON.parse(savedCounts) : {};
    }
    return {}; // default value if not in browser context
  });

  useEffect(() => {
    // Since useEffect runs only on the client side, this is safe
    localStorage.setItem("marketplaceCounts", JSON.stringify(cartCounts));
  }, [cartCounts]);
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(4);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useMarketplacesQuery({ ...query });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("market", data);

  const handleAddToCart = (property: any) => {
    console.log(`Added ${property} to cart!`);
    console.log(property);
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [property.id]: (prevCounts[property.id] || 0) + 1,
    }));
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      <Divider
        orientation="center"
        style={{ fontSize: "30px", fontWeight: "bolder" }}
      >
        Featured Product
      </Divider>
      <Row gutter={16}>
        {data?.slice(0, 4).map((property: any, index: any) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              style={{ width: 300, position: "relative" }} // added position: "relative"
              cover={
                <Image
                  src={property.propertyImage}
                  alt="Landscape picture"
                  width={200}
                  height={200}
                />
              }
              actions={[
                <ShoppingCartOutlined
                  key="addToCart"
                  onClick={() => handleAddToCart(property)}
                />,
              ]}
            >
              <Meta
                avatar={<Avatar src={property.propertyImage} />}
                title={property.category}
                description={property.itemDescription}
              />
              <Button
                type="text"
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  border: "none",
                  background: "transparent",
                }}
                icon={<ShoppingCartOutlined />}
                onClick={() => handleAddToCart(property)}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MarketPlaceProperty;
