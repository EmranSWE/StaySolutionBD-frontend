"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { message, Button, Col, Divider, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserSignupMutation } from "@/redux/api/authApi";
import { SignUpValidation } from "@/schemas/signupValidate";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import { userTypes } from "@/constants/global";
import sheikhHome from "../../../assets/sheikhHome.png";
import styles from "./signup.module.css";

const SignUpPage = () => {
  const router = useRouter();
  const [userSignup] = useUserSignupMutation();
  const [error, setError] = useState("");

  type FormDataType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    address: string;
  };
  const onSubmit = async (data: FormDataType) => {
    try {
      const res = await userSignup(data);
      //@ts-ignore
      if (res?.data?.id) {
        message.success("User registration was successful");
        router.push("/login");
        //@ts-ignore
      } else if (res?.data?.statusCode === 500) {
        setError("The email already exists. Please use a different email.");
      }
    } catch (err) {
      setError("An error occurred while processing your request.");
    }
  };

  return (
    <div>
      <Divider
        orientation="center"
        style={{ fontSize: "30px", fontWeight: "bold" }}
      >
        <Link href={`/`}>
          <span style={{ color: "#1890ff" }}>Stay Solution</span> BD{" "}
        </Link>
      </Divider>
      <div>
        <Form submitHandler={onSubmit} resolver={yupResolver(SignUpValidation)}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <Divider orientation="center" style={{ fontSize: "20px" }}>
              User <span style={{ color: "#1890ff" }}>Register</span> Form
            </Divider>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* Left Column for Image */}
              <Col
                xs={24}
                md={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Image
                  src={sheikhHome}
                  alt="Large Image"
                  style={{ width: "80%", height: "70%" }}
                  className={styles.rotatingImage}
                />
              </Col>
              <Col
                xs={24}
                md={8}
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                <FormInput
                  type="text"
                  name="firstName"
                  size="large"
                  label="First Name"
                />
                <FormInput
                  type="text"
                  name="lastName"
                  size="large"
                  label="Last Name"
                />
                <FormInput
                  type="password"
                  name="password"
                  size="large"
                  label="Password"
                />
                <FormInput
                  type="email"
                  name="email"
                  size="large"
                  label="Email"
                />
                <FormInput
                  type="text"
                  name="phone"
                  size="large"
                  label="Phone"
                />
                <FormSelectField
                  name="role"
                  size="large"
                  label="User Types"
                  options={userTypes}
                  placeholder="Select"
                />
                <FormInput
                  type="text"
                  name="address"
                  size="large"
                  label="Address"
                />
                {error && (
                  <div
                    style={{ color: "red", marginBottom: "5px !importance" }}
                  >
                    {error}
                  </div>
                )}
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginTop: "5px", width: "100%" }}
                >
                  Sign Up
                </Button>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  Already registered with StaySolutionBD?{" "}
                  <Link href={`/login`}>
                    <Button type="primary" style={{ marginLeft: "10px" }}>
                      Login Now!
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
