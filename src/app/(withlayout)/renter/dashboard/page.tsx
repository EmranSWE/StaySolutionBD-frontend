"use client";
import { Col, Divider, Row } from "antd";
import React from "react";

import PaymentDetails from "./PaymentDetails/page";
import SmallDetailsCard from "./SmallCard/page";
import { useMyProfileQuery } from "@/redux/api/authApi";
import CustomLoading from "@/components/ui/CustomLoading";

const UserDashboard = () => {
  const { data, isError, isLoading } = useMyProfileQuery({});
  if (isLoading) {
    return <CustomLoading />;
  }
  const firstName = data.firstName;
  return (
    <div
      style={{
        background: "linear-gradient(to right, #ff6e7f, #bfe9cf)",
        height: "100vh",
      }}
    >
      <h3>
        Dear, {`${firstName} `}
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

        <Col xs={24} sm={24} md={24} lg={24} xl={16}>
          <PaymentDetails />
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
