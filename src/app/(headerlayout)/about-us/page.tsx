"use client";
import React from "react";
import { Typography, Row, Col, Divider } from "antd";
import { HomeOutlined, TeamOutlined, SafetyOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const AboutUsPage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Row justify="center">
        <Col xs={24} md={16} lg={12}>
          <Title level={2} style={{ textAlign: "center" }}>
            About <span style={{ color: "#1890ff" }}>StaySolutionBD</span>
          </Title>
          <Divider />
          <Paragraph>
            Welcome to <strong>StaySolutionBD</strong>, your comprehensive home
            rental solution in Bangladesh. Our mission is to simplify the
            renting process and make finding a home hassle-free for everyone.
          </Paragraph>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <div style={{ textAlign: "center" }}>
                <HomeOutlined style={{ fontSize: "3rem", color: "#1890ff" }} />
                <Title level={4}>Our Homes</Title>
                <Paragraph>
                  We provide a curated selection of quality homes tailored to
                  your needs.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div style={{ textAlign: "center" }}>
                <TeamOutlined style={{ fontSize: "3rem", color: "#1890ff" }} />
                <Title level={4}>Our Team</Title>
                <Paragraph>
                  A dedicated team working around the clock to serve you better.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div style={{ textAlign: "center" }}>
                <SafetyOutlined
                  style={{ fontSize: "3rem", color: "#1890ff" }}
                />
                <Title level={4}>Trust & Safety</Title>
                <Paragraph>
                  Safety and trust are our utmost priority. We ensure every
                  rental is secure.
                </Paragraph>
              </div>
            </Col>
          </Row>

          <Divider />
          <Paragraph style={{ textAlign: "center" }}>
            Thank you for choosing StaySolutionBD. Your comfort is our success.
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUsPage;
