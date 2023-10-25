"use client";

import { Button, Col, Row, message } from "antd";
import loginImage from "../../assets/Loginsvg.svg";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUserLoginMutation } from "@/redux/api/authApi";
import {
  getUserInfo,
  isLoggedIn,
  storeUserInfo,
} from "@/services/auth.service";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};
const LoginPage = () => {
  console.log(getUserInfo());
  console.log(isLoggedIn());
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      console.log(res);

      if (res?.accessToken) {
        router.push("/");
        message.success("User is logged in successful");
      }
      storeUserInfo({ accessToken: res?.accessToken });
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <h1
        style={{
          fontSize: "50px",
          textAlign: "center",
          color: "purple",
          marginTop: "20px",
        }}
      >
        Stay Solution BD
      </h1>
      <Row justify="center" align="middle" style={{ minHeight: "50vh" }}>
        <Col xs={24} sm={12} md={16} lg={10}>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Image src={loginImage} width={300} alt="login Image" />
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
