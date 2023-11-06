"use client";
import React, { useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import feedbackImage from "../../assets/Feedback-rafiki.svg";
import Image from "next/image";
const Feedback: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Feedback submitted successfully!");
    }, 1500);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Feedback Form</h1>
      <Row gutter={24} justify={"center"}>
        <Col xs={24} sm={24} md={12} lg={12}>
          {/* Replace with your image */}
          <Image
            src={feedbackImage}
            alt="Landscape picture"
            width={300}
            height={300}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input a valid email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="message"
              rules={[
                { required: true, message: "Please input your feedback!" },
              ]}
            >
              <Input.TextArea placeholder="Your Feedback" rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Feedback;
