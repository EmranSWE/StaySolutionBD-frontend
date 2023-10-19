/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { userTypes } from "@/constants/global";
import { useUserSignupMutation } from "@/redux/api/authApi";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const SignUpPage = () => {
  const [userSignup] = useUserSignupMutation();

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      await userSignup(data);
      message.success("Admin created successfully");
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <Form submitHandler={onSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Admin Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="firstName"
                  size="large"
                  label="FirstName"
                ></FormInput>
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="middleName"
                  size="large"
                  label="Middle Name"
                ></FormInput>
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="lastName"
                  size="large"
                  label="Last Name"
                ></FormInput>
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="password"
                  name="password"
                  size="large"
                  label="Password"
                ></FormInput>
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  name="role"
                  size="large"
                  label="User Types"
                  options={userTypes}
                  placeholder="Select"
                ></FormSelectField>
              </Col>
            </Row>
          </div>

          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Admin Basic
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="email"
                  name="email"
                  size="large"
                  label="Email"
                ></FormInput>
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="address"
                  size="large"
                  label="Address"
                ></FormInput>
              </Col>

              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="phone"
                  size="large"
                  label="Phone"
                ></FormInput>
              </Col>
            </Row>
          </div>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
