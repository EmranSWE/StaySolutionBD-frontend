"use client";
import { Row, Col, Typography, Divider } from "antd";
import {
  HomeOutlined,
  PhoneOutlined,
  EditOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const AboutUsPage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Row justify="center">
        <Col xs={24} md={16} lg={12}>
          <Title level={2} style={{ textAlign: "center" }}>
            Why Use<span style={{ color: "#1890ff" }}> StaySolutionBD.COM</span>
          </Title>
          <Divider />
          <Paragraph>
            Discover <strong>StaySolutionBD</strong> - the epitome of home
            rental experiences in Bangladesh! We're not just a platform; we're
            your partner in navigating the world of rentals. We've remained the
            journey of finding homes, ensuring it's not just simple but also
            delightful. Dive in, and let's transform your house-hunting venture
            into a memorable adventure.
          </Paragraph>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <div style={{ textAlign: "center" }}>
                <HomeOutlined style={{ fontSize: "3rem", color: "#1890ff" }} />
                <Title level={4}>Find perfect property</Title>
                <Paragraph>
                  find the best property according your need in your area
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              {" "}
              {/* Adjusted the sm and md values */}
              <div style={{ textAlign: "center" }}>
                <PhoneOutlined style={{ fontSize: "3rem", color: "#1890ff" }} />
                <Title level={4}>Directly Contact</Title>
                <Paragraph>
                  We directly connect you to verified owners to save brokerage
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ textAlign: "center" }}>
                <EditOutlined style={{ fontSize: "3rem", color: "#1890ff" }} />
                <Title level={4}>All Access</Title>
                <Paragraph>
                  You can delete and edit your property ad at any time
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              {" "}
              {/* Adjusted the sm and md values */}
              <div style={{ textAlign: "center" }}>
                <DollarCircleOutlined
                  style={{ fontSize: "3rem", color: "#1890ff" }}
                />
                <Title level={4}>Free property ad</Title>
                <Paragraph>
                  You can advertise your property on this platform absolutely
                  free.
                </Paragraph>
              </div>
            </Col>
          </Row>

          <Divider />
        </Col>
      </Row>
    </div>
  );
};

export default AboutUsPage;
