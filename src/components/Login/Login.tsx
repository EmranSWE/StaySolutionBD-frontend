"use client";

import { Button, Col, Row, message } from "antd";
import loginImage from "../../assets/Loginsvg.svg";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
// import { useUserLoginMutation } from "@/redux/api/authApi";
// import {
//   getUserInfo,
//   isLoggedIn,
//   storeUserInfo,
// } from "@/services/auth.service";
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
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login Image" />
      </Col>

      <Col sm={12} md={8} lg={8}>
        <h1 style={{ margin: "15px 0px" }}>First login your account</h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div style={{ margin: "15px 0px" }}>
              <FormInput name="email" type="text" size="large" label="email" />
            </div>
            <div style={{ margin: "15px 0px" }}>
              <FormInput
                name="password"
                type="password"
                size="large"
                label="user password"
              />
            </div>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
          <div>
            Are you new in StaySolutionBD?
            <Link href={`/signup`}>
              <Button type="primary">SignUp Now!</Button>
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
