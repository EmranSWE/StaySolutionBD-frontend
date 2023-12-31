"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import CustomLoading from "@/components/ui/CustomLoading";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { propertyAmenities } from "@/constants/global";
import { useMyProfileQuery, useUserUpdateMutation } from "@/redux/api/authApi";
import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const UpdateProfile = () => {
  const router = useRouter();
  const [userUpdate] = useUserUpdateMutation();

  const { id } = getUserInfo() as { id: string };

  const { data, isError, isLoading, isSuccess } = useMyProfileQuery({});

  if (isLoading) {
    return <CustomLoading />;
  }
  const onSubmit = async (values: any) => {
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating...");
    try {
      const res = await userUpdate({
        id: id,
        body: formData,
      });
      if (!res) {
        message.error("Data doesn't update");
      }
      message.success("User updated successfully!");
      // router.push("/owner/my-property");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, hsla(113, 96%, 81%, 1) 0%, hsla(188, 90%, 51%, 1) 100%)",
        minHeight: "100vh",
      }}
    >
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
      <h1>Profile Update</h1>

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
              <Col xs={24} sm={24} md={8} lg={8}>
                <UploadImage name="file" />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormInput
                  name="firstName"
                  type="text"
                  value={data?.firstName}
                  size="large"
                  label="First Name"
                  placeholder="Enter the first name"
                />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormInput
                  name="middleName"
                  type="text"
                  value={data?.middleName}
                  size="large"
                  label="Middle Name"
                  placeholder="Enter the Middle name"
                />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormInput
                  name="lastName"
                  type="text"
                  value={data?.lastName}
                  size="large"
                  label="Last Name"
                  placeholder="Enter the Last name"
                />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormInput
                  type="text"
                  name="phone"
                  value={data?.phone}
                  size="large"
                  label="Phone No"
                />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormInput
                  type="text"
                  name="preferredPropertyType"
                  value={data?.preferredPropertyType}
                  size="large"
                  label="Preferred Property Type"
                />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormSelectField
                  mode="multiple"
                  size="large"
                  defaultValue={data?.preferredAmenities}
                  name="preferredAmenities"
                  options={propertyAmenities}
                  label="Preferred Amenities"
                  placeholder="Select Amenities"
                />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormInput
                  type="text"
                  name="preferredLocation"
                  value={data?.preferredLocation}
                  size="large"
                  label="Preferred Location"
                />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormInput
                  type="text"
                  name="address"
                  value={data?.address}
                  size="large"
                  label="Your address"
                />
              </Col>
              <Col
                xs={24}
                sm={24}
                md={22}
                lg={22}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ width: "80%", marginTop: "5px" }}
                >
                  Update
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
