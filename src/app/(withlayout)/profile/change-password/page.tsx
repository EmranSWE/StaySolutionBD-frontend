"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const ChangePasswordPage = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (values: any) => {
    const res = await changePassword(values);
    if (!res) {
      message.error("Data doesn't update");
    }

    message.success("User updated successfully!");
    // router.push("/owner/my-property");
  };

  return (
    <div>
      <SSBreadCrumb
        items={[
          {
            label: "profile",
            link: "/profile",
          },
          {
            label: "account",
            link: "/profile/account-profile/",
          },
        ]}
      />
      <h1>Change Password</h1>

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
              Profile Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  name="oldPassword"
                  type="text"
                  size="large"
                  label="Old Password"
                  placeholder="Enter your old password"
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  name="newPassword"
                  type="text"
                  size="large"
                  label="New Password"
                  placeholder="Enter the New Password"
                />
              </Col>
            </Row>
          </div>
          <Button htmlType="submit" type="primary">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
