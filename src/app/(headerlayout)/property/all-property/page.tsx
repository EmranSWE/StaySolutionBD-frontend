"use client";
import { Row, Col, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { useDebounced } from "@/redux/hooks";
import { useMarketplacesQuery } from "@/redux/api/marketplaceApi";
import { marketplaceCategory } from "@/constants/global";
import DataSlider from "@/components/Forms/FormDataSlider";
import FormDataSearchInput from "@/components/Forms/FormDataSearchInput";
import ProductCard from "@/components/ui/ProductCard";
import CategorySelect from "@/components/ui/CategorySelect";
import { usePropertiesQuery } from "@/redux/api/propertyApi";
import PropertyProductCard from "@/components/ui/PropertyProductCard";

//Types of marketplace property
type Property = {
  id: string;
  location: string[];
  city?: string; // The "?" denotes this is optional.
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
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0);

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
  const { data, isLoading } = usePropertiesQuery({ ...query });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("Marketplace", data);

  const handleAddToCart = (property: Property) => {
    console.log(`Added ${property} to cart!`);
    console.log(property);
    message.success("Added to cart");
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [property.id]: (prevCounts[property.id] || 0) + 1,
    }));
  };

  const handlePriceChange = (value: number) => {
    console.log("Selected Value:", value);
    setPrice(value);
  };
  const fieldWidth = "80%";
  return (
    <>
      <SSBreadCrumb items={[{ label: "home", link: "/" }]} />
      <h1
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "bolder",
          margin: "10px 0px",
        }}
      >
        All Selling Property
      </h1>
      <Row gutter={[16, 16]} style={{ marginLeft: "20px" }}>
        {/* Filters Section */}
        <Col xs={18} sm={24} md={6} lg={5} xl={5}>
          <div className="filters">
            <FormDataSearchInput
              placeholder="Search"
              onChange={setSearchTerm}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <CategorySelect
              options={marketplaceCategory}
              value={category || undefined}
              onChange={setCategory}
              placeholder="Search The category"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <DataSlider
              min={10000}
              max={100000}
              defaultValue={1000}
              onChange={handlePriceChange}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <Button style={{ width: "100%", marginTop: "1rem" }}>
              Check Button
            </Button>
          </div>
        </Col>

        {/* Products Section */}
        <Col xs={24} sm={24} md={18} lg={19} xl={19}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {data &&
              data.map((property: Property) => (
                <Col xs={24} sm={12} md={8} lg={8} xl={8} key={property.id}>
                  <PropertyProductCard
                    data={property}
                    onAddToCart={handleAddToCart}
                  />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>

      <style jsx>{`
        .filters {
          padding: 10px;
        }
      `}</style>
    </>
  );
};

export default AllPropertyData;
