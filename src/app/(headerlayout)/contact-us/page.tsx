"use client";
import React from "react";
import { Form, Input, Button, Typography, Row, Col, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import contact from "../../../assets/contact-us.svg";
import Image from "next/image";
import { useAddContactMutation } from "@/redux/api/contactApi";

const { TextArea } = Input;
const { Title } = Typography;

const ContactUsPage = () => {
  const [addContact] = useAddContactMutation();
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const { ...rest } = values;
    console.log("Received values of form:", rest);
    // Handle the form values, e.g., send them to your backend
    try {
      const res = await addContact(rest);
      if (res) {
        form.resetFields(); // <-- Reset the form fields
        message.success("Message created successfully!");
      } else {
        message.error("Your review doesn't added");
      }
      console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
      <Row
        gutter={24}
        justify="center"
        align="middle"
        style={{ maxWidth: "1200px", width: "100%" }}
      >
        <Col xs={24} md={12}>
          <Image
            src={contact}
            alt="Large Image"
            style={{
              width: "80%",
              height: "70%",
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Title level={2}>
            <MailOutlined />{" "}
            <span style={{ color: "rgb(24, 144, 255)" }}>Contact </span> Us
          </Title>
          <Form
            form={form}
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
      </Row>
    </div>
  );
};

export default ContactUsPage;
