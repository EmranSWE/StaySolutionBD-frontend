"use client";
import { Col, Row } from "antd";
import React from "react";

import DashboardColumnOne from "./dashboardColumn1/page";
import DashboardColumnTwo from "./dashboardcolumntwo/page";

const DashboardPage = () => {
  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {/* For larger screens, each column takes half the width */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <DashboardColumnTwo />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <DashboardColumnOne />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          {" "}
          hello
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}></Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
