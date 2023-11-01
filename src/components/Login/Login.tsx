"use client";
import { useState } from "react";
import { Button, Col, Divider, Row, message } from "antd";
import loginImage from "../../assets/computer-login-animate.svg";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [userLogin] = useUserLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      if (res?.accessToken) {
        message.success("User is logged in successfully");
        storeUserInfo({ accessToken: res.accessToken });
        router.push("/");
      } else {
        if (res?.statusCode === 500) {
          setErrorMessage(
            "Invalid email or password. Please check your credentials."
          );
        }
      }
    } catch (err: any) {
      setErrorMessage("An error occurred while processing your request.");
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
      <Row justify="center" align="middle" style={{ minHeight: "80vh" }}>
        <Col xs={24} sm={12} md={16} lg={10}>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Image src={loginImage} width={350} alt="login Image" />
          </div>
        </Col>

        <Col xs={22} sm={12} md={8} lg={8}>
          <h1 style={{ fontSize: "1.2rem", margin: "10px 0px" }}>
            Login your account
          </h1>
          <div>
            <Form submitHandler={onSubmit}>
              <div style={{ margin: "10px 0px" }}>
                <FormInput
                  name="email"
                  type="text"
                  size="large"
                  label="Email"
                />
              </div>
              <div style={{ margin: "10px 0px" }}>
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="Password"
                />
              </div>
              {errorMessage && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                  {errorMessage}
                </div>
              )}
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Form>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              Are you new in StaySolutionBD?
              <Link href={`/signup`}>
                <Button type="primary" style={{ marginLeft: "10px" }}>
                  SignUp Now!
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
