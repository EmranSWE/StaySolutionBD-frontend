"use client";
import { Row, Col, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { useDebounced } from "@/redux/hooks";
import { marketplaceCategory } from "@/constants/global";
import DataSlider from "@/components/Forms/FormDataSlider";
import FormDataSearchInput from "@/components/Forms/FormDataSearchInput";
import CategorySelect from "@/components/ui/CategorySelect";
import { usePropertiesQuery } from "@/redux/api/propertyApi";
import PropertyProductCard from "@/components/ui/PropertyProductCard";
import CustomLoading from "@/components/ui/CustomLoading";
import { BorderDiv } from "@/utils/borderDiv";

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
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [rent, setRent] = useState<number>(0);
  const [room, setRoom] = useState<number>(0);
  const [occupancy, setOccupancy] = useState<number>(0);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  if (category) {
    query["category"] = category;
  }
  if (rent) {
    query["monthlyRent"] = rent;
  }

  if (room) {
    query["numberOfRooms"] = room;
  }
  if (occupancy) {
    query["maxOccupancy"] = occupancy;
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
    return <CustomLoading />;
  }

  const handleRentChange = (value: number) => {
    setRent(value);
  };

  const handleRoomChange = (value: number) => {
    setRoom(value);
  };
  const handleMaxOccupancy = (value: number) => {
    setOccupancy(value);
  };
  const handleReset = () => {
    setSearchTerm("");
    setCategory(null);
    setRent(0);
    setRoom(0);
    setOccupancy(0);
    setSortBy("");
    setSortOrder("");
    setPage(1);
    setSize(100);
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
            <BorderDiv
              top
              gradient="linear-gradient(to right, green, red, blue, yellow)"
            />
            <BorderDiv
              bottom
              gradient="linear-gradient(to right, blue, yellow)"
            />
            <BorderDiv
              left
              gradient="linear-gradient(to bottom, green, blue)"
            />
            <BorderDiv
              right
              gradient="linear-gradient(to bottom, red, yellow)"
            />

            <p>Sort by relevance</p>

            <FormDataSearchInput
              placeholder="Search by title, ..etc"
              onChange={setSearchTerm}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <p>Monthly Rent</p>
            <DataSlider
              min={10000}
              max={100000}
              defaultValue={1000}
              onChange={handleRentChange}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <p>Number of Rooms</p>
            <DataSlider
              min={1}
              max={20}
              defaultValue={1}
              onChange={handleRoomChange}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <p>Max number of people</p>
            <DataSlider
              min={1}
              max={20}
              defaultValue={1}
              onChange={handleMaxOccupancy}
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
                  lg={8}
                  xl={8}
                  key={property.id}
                  style={{ margin: "0 auto" }}
                >
                  <PropertyProductCard data={property} />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default AllPropertyData;
