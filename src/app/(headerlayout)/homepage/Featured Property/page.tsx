"use client";
import { Row, Col, message, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { useFeaturedPropertyQuery } from "@/redux/api/propertyApi";
import PropertyProductCard from "@/components/ui/PropertyProductCard";
import CustomLoading from "@/components/ui/CustomLoading";

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

  const { data, isLoading } = useFeaturedPropertyQuery({});
  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }

  console.log(data);
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

      <Row justify="space-around" align="top">
        {data &&
          data?.map((property: Property) => (
            <Col xs={24} sm={24} md={10} lg={8} xl={4} key={property.id}>
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
