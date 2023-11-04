"use client";
import { usePopularCategoryQuery } from "@/redux/api/propertyApi";
import { Button, Card, Col, Divider, Row } from "antd";
import React from "react";
import Link from "next/link";
import CustomLoading from "@/components/ui/CustomLoading";
import Image from "next/image";

const PopularPageCategory = () => {
  const { data, isLoading } = usePopularCategoryQuery({});

  if (isLoading) {
    return <CustomLoading />;
  }
  console.log(data);

  // Create a map to store unique categories with their first image
  const categoryToImageMap = new Map();

  data?.forEach((item: any) => {
    item.category.forEach((category: any) => {
      if (!categoryToImageMap.has(category)) {
        categoryToImageMap.set(category, item.imageGallery[0]);
      }
    });
  });

  // Convert the map to an array for rendering
  const uniqueCategories = Array.from(
    categoryToImageMap,
    ([category, imageUrl]) => ({
      category,
      imageUrl,
    })
  );

  return (
    <div>
      <Divider orientation="center">
        <h1>
          <span style={{ color: "#1890ff" }}>Popular</span> Categories
        </h1>
      </Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
        {uniqueCategories.map((item, index) => (
          // Ensure lg and xl are set to span 6 grid units to have four items per row
          <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
            {/* Adjust maxWidth if needed and make sure the margin auto is working */}
            <Card
              hoverable
              style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}
            >
              <Link href={`/property/all-property`}>
                {" "}
                {/* Make sure the anchor tag is used correctly for the Link component */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "200px",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={`${item.category} property image`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      background: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "2px",
                    }}
                  >
                    {item.category}
                  </div>
                </div>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link href="/property/all-property">
          <Button type="primary">View All Properties</Button>
        </Link>
      </div>
    </div>
  );
};

export default PopularPageCategory;
