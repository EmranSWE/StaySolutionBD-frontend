"use client";
"use client";
import { Col, Divider, Row } from "antd";
import React from "react";

import { useMyProfileQuery } from "@/redux/api/authApi";
import CustomLoading from "@/components/ui/CustomLoading";
import SmallDetailsCard from "./dashboard/SmallCard/page";
import PaymentDetails from "./dashboard/PaymentDetails/page";

const OwnerDashboard = () => {
  const { data, isError, isLoading } = useMyProfileQuery({});
  if (isLoading) {
    return <CustomLoading />;
  }
  const firstName = data.firstName;
  const lastName = data.lastName;
  return (
    <div
      style={{
        background: "linear-gradient(to right, #ff6e7f, #bfe9cf)",
        height: "100vh",
      }}
    >
      <h3>
        Dear, {`${firstName} ${lastName}`}
        <span
          style={{
            display: "inline-block",
            animation: "shake 2s ease-in-out infinite",
          }}
        >
          👋
        </span>
      </h3>
      <Divider orientation="center">
        <h1 style={{ color: "white" }}>
          Welcome to <br /> <span style={{ color: "#1890ff" }}> Your </span>
          Dashboard
        </h1>
      </Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <SmallDetailsCard />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <PaymentDetails />
        </Col>
      </Row>
    </div>
  );
};

export default OwnerDashboard;
