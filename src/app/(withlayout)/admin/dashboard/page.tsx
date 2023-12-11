"use client";
import { Col, Row } from "antd";
import React from "react";
import PieChartDashboard from "./PieChartDashboard/page";
import BarChartDashboard from "./BarChartDashboard/page";
import CurrentFlatStatus from "./FlatStatus/page";

const DashboardPage = () => {
  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <CurrentFlatStatus />
        </Col>

        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <BarChartDashboard />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <PieChartDashboard />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}></Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
