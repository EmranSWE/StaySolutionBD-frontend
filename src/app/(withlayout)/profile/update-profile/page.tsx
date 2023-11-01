"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
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
    return <div>Loading....</div>;
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
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="file" />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  name="firstName"
                  type="text"
                  value={data?.firstName}
                  size="large"
                  label="First Name"
                  placeholder="Enter the first name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  name="middleName"
                  type="text"
                  value={data?.middleName}
                  size="large"
                  label="Middle Name"
                  placeholder="Enter the Middle name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  name="lastName"
                  type="text"
                  value={data?.lastName}
                  size="large"
                  label="Last Name"
                  placeholder="Enter the Last name"
                />
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
                  value={data?.phone}
                  size="large"
                  label="Phone No"
                />
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
                  name="preferredPropertyType"
                  value={data?.preferredPropertyType}
                  size="large"
                  label="Preferred Property Type"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
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
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="preferredLocation"
                  value={data?.preferredLocation}
                  size="large"
                  label="Preferred Location"
                />
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
                  value={data?.address}
                  size="large"
                  label="Your address"
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

export default UpdateProfile;
