"use client";
import { Row, Col, message, Button } from "antd";
import React, { useEffect, useState } from "react";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { useDebounced } from "@/redux/hooks";

import { marketplaceCategory } from "@/constants/global";
import DataSlider from "@/components/Forms/FormDataSlider";
import FormDataSearchInput from "@/components/Forms/FormDataSearchInput";

import CategorySelect from "@/components/ui/CategorySelect";

import MarketPlacePropertyCard from "@/components/ui/MarketPlacePropertyCard";
import { useMarketplacesQuery } from "@/redux/api/marketplaceApi";
import Loading from "@/app/loading";
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

const MarketplacePropertyPage = () => {
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
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0);
  const handleReset = () => {
    setSearchTerm("");
    setCategory(null);
    setSortBy("");
    setSortOrder("");
    setPrice(0);
    setPage(1);
    setSize(100);
  };
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  if (category) {
    query["category"] = category;
  }
  if (price) {
    query["price"] = price;
  }

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useMarketplacesQuery({ ...query });

  if (isLoading) {
    return <CustomLoading />;
  }

  const handleAddToCart = (property: Property) => {
    message.success("Added to cart");
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [property.id]: (prevCounts[property.id] || 0) + 1,
    }));
  };

  const handlePriceChange = (value: number) => {
    setPrice(value);
  };

  return (
    <>
      <SSBreadCrumb items={[{ label: "home", link: "/" }]} />
      <h1 style={{ textAlign: "center", marginBottom: "15px" }}>
        All <span style={{ color: "rgb(24, 144, 255)" }}>Selling</span> Property
      </h1>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={6} lg={6} xl={5}>
          <div
            style={{
              padding: "10px",
              marginLeft: "2%",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              border: "1px solid black",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "4px",
                background: "linear-gradient(to bottom, green, red, blue)",
              }}
            ></div>
            <div
              style={{
                content: "",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(to right, blue, yellow)", // Bottom border
              }}
            ></div>

            <div
              style={{
                content: "",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "4px",
                background: "linear-gradient(to bottom, green, blue)", // Left border
              }}
            ></div>

            <div
              style={{
                content: "",
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                width: "4px",
                background: "linear-gradient(to bottom, red, yellow)", // Right border
              }}
            ></div>
            <div
              style={{
                content: "",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(to right, blue, yellow)", // Bottom border
              }}
            ></div>

            <div
              style={{
                content: "",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "4px",
                background: "linear-gradient(to bottom, green, blue)", // Left border
              }}
            ></div>

            <div
              style={{
                content: "",
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                width: "4px",
                background: "linear-gradient(to bottom, red, yellow)", // Right border
              }}
            ></div>
            <div
              style={{
                content: "",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background:
                  "linear-gradient(to right, green, red, blue, yellow)", // Top border
              }}
            ></div>
            <p>Sort by relevance</p>
            <FormDataSearchInput
              placeholder="Search by title, ..etc"
              onChange={setSearchTerm}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <p>Search by category</p>
            <CategorySelect
              options={marketplaceCategory}
              value={category || undefined}
              onChange={setCategory}
              placeholder="Search The category"
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <p>Price</p>
            <DataSlider
              min={10000}
              max={100000}
              defaultValue={1000}
              onChange={handlePriceChange}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <Button
              type="primary"
              onClick={handleReset}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              Reset
            </Button>
          </div>
        </Col>

        {/* Products Section */}
        <Col xs={24} sm={24} md={18} lg={18} xl={19}>
          <Row
            gutter={[16, 20]}
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {data &&
              data?.map((property: Property) => (
                <Col
                  xs={20}
                  sm={24}
                  md={10}
                  lg={10}
                  xl={8}
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
        </Col>
      </Row>
    </>
  );
};

export default MarketplacePropertyPage;
