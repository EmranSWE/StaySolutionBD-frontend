"use client";

import { usePropertiesQuery } from "@/redux/api/propertyApi";
import { Card, Avatar, Row, Col, Divider, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const FeaturedProduct = () => {
  const [cartCounts, setCartCounts] = useState<Record<string, number>>(() => {
    // This function runs during SSR as well, so check for window object
    if (typeof window !== "undefined") {
      const savedCounts = localStorage.getItem("cartCounts");
      return savedCounts ? JSON.parse(savedCounts) : {};
    }
    return {}; // default value if not in browser context
  });

  useEffect(() => {
    localStorage.setItem("propertyCount", JSON.stringify(cartCounts));
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

  const { data, isLoading } = usePropertiesQuery({ ...query });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (property: any) => {
    console.log(`Added ${property} to cart!`);
    console.log(property);
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [property.id]: (prevCounts[property.id] || 0) + 1,
    }));
  };

  return (
    <div style={{ padding: "30px" }}>
      <Divider
        orientation="center"
        style={{ fontSize: "30px", fontWeight: "bolder" }}
      >
        <span style={{ color: "#1890ff" }}>Featured</span> Property
      </Divider>
      <Row justify="center" gutter={[16, 16]}>
        {data?.slice(0, 4).map((property: any, index: any) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index} className="custom-col">
            <Card
              style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}
              cover={
                <Image
                  src={property.imageGallery[0]}
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>
                  Available:
                  <span style={{ fontSize: "16px", fontWeight: "bolder" }}>
                    {new Date(property.availableDate).toLocaleDateString()}
                  </span>
                </p>
                <p>
                  Rent:
                  <span style={{ fontSize: "16px", fontWeight: "bolder" }}>
                    ${property.monthlyRent}
                  </span>
                </p>
              </div>
              <Meta
                avatar={<Avatar src={property.imageGallery[0]} />}
                title={property.city}
                description={property.description}
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

export default FeaturedProduct;
