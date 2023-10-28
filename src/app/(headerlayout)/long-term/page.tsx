"use client";
import React from "react";
import { Row, Col, Typography, Card } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import style from "./term.module.css";
const { Title, Paragraph } = Typography;

const LongTermRental = () => {
  return (
    <div className={style.longTermRental}>
      <Title level={1} style={{ textAlign: "center" }}>
        Stay Solution BD: Long Term Rental Policy
      </Title>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card
            title={
              <>
                <HomeOutlined /> Property Requirements
              </>
            }
            bordered={false}
            style={{ marginBottom: "20px" }}
          >
            <Paragraph>
              All homes under the Stay Solution BD umbrella must meet our
              stringent property requirements, ensuring safety and comfort for
              all our tenants.
            </Paragraph>
          </Card>
        </Col>

        <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card
            title={
              <>
                <CalendarOutlined /> Rental Duration
              </>
            }
            style={{ marginBottom: "20px" }}
            bordered={false}
          >
            <Paragraph>
              For long-term rentals, the minimum lease period is 6 months.
              Tenants have the option to renew or terminate the lease after its
              duration.
            </Paragraph>
          </Card>
        </Col>

        <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card
            title={
              <>
                <SafetyOutlined /> Safety and Compliance
              </>
            }
            bordered={false}
            style={{ marginBottom: "20px" }}
          >
            <Paragraph>
              We prioritize the safety of our tenants. All our homes are
              regularly inspected and comply with local housing and safety
              regulations.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LongTermRental;
