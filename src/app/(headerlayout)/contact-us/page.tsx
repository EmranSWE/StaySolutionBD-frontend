"use client";
import React from "react";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import { MailOutlined } from "@ant-design/icons";
import contact from "../../../assets/contact-us.svg";
import Image from "next/image";
const { TextArea } = Input;
const { Title } = Typography;

const ContactUsPage = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    // Handle the form values, e.g., send them to your backend
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Title level={2}>
            <MailOutlined /> Contact Us
          </Title>
          <Form
            name="contact_us"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "The input is not a valid email!" },
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="subject"
              rules={[{ required: true, message: "Please input a subject!" }]}
            >
              <Input placeholder="Subject" />
            </Form.Item>

            <Form.Item
              name="message"
              rules={[
                { required: true, message: "Please input your message!" },
              ]}
            >
              <TextArea rows={4} placeholder="Message" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col xs={24} md={12}>
          <Image src={contact} width={500} alt="login Image" />
        </Col>
      </Row>
    </div>
  );
};

export default ContactUsPage;
