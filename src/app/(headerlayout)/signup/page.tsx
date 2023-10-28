/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import { userTypes } from "@/constants/global";
import { useUserSignupMutation } from "@/redux/api/authApi";
import { Button, Col, Divider, Row, message } from "antd";
import { useRouter } from "next/navigation";
import sheikhHome from "../../../assets/sheikhHome.png";
import React from "react";
import Image from "next/image";
import styles from "./signup.module.css";
import Link from "next/link";
import { Metadata } from "next";
const metadata: Metadata = {
  title: "SSBD | Login",
};
const SignUpPage = () => {
  const router = useRouter();
  const [userSignup] = useUserSignupMutation();

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const response = await userSignup(data);
      console.log("responsee", response);
      //@ts-ignore
      if (response?.error) {
        // Check if the response contains an error
        //@ts-ignore
        throw new Error(response?.error?.message); // Throw the error to be caught in the catch block
      }

      message.success("User created successfully");
      // Redirect to the home route
      router.push("/login");
    } catch (err: any) {
      console.error(err.message);
      message.error(
        err.message || "An error occurred while creating the user."
      );
    }
  };
  return (
    <div>
      <Divider
        orientation="center"
        style={{ fontSize: "30px", fontWeight: "bolder" }}
      >
        <Link href={`/`}>
          {" "}
          <span style={{ color: "#1890ff" }}>Stay Solution</span> BD{" "}
        </Link>
      </Divider>
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
            <Divider orientation="center" style={{ fontSize: "20px" }}>
              User
              <span style={{ color: "#1890ff" }}> Register</span> Form
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
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={sheikhHome}
                  alt="Large Image"
                  style={{
                    width: "80%",
                    height: "70%",
                  }}
                  className={styles.rotatingImage}
                />
              </Col>

              <Col
                xs={24}
                md={8}
                style={{
                  fontWeight: "bolder",
                  fontSize: "20px",
                }}
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
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginTop: "5px", width: "100%" }}
                >
                  Sign Up
                </Button>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  Already register to StaySolutionBD?
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
