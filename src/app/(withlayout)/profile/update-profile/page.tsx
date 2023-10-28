"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import {
  LOCATIONS,
  propertyAmenities,
  propertyRules,
} from "@/constants/global";
import { useAddPropertyMutation } from "@/redux/api/propertyApi";
import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const UpdateProfile = () => {
  const router = useRouter();
  const [addProperty] = useAddPropertyMutation();

  const onSubmit = async (values: any) => {
    const { id } = getUserInfo() as { id: string };
    console.log(values);
    // values.ownerId = id;
    // console.log("values", values);
    // const obj = { ...values };
    // const file = obj["file"];
    // delete obj["file"];
    // const data = JSON.stringify(obj);
    // const formData = new FormData();
    // formData.append("file", file as Blob);
    // formData.append("data", data);
    // message.loading("Creating...");
    // console.log("form data", formData);
    // try {
    //   const res = await addProperty(formData);
    //   if (!res) {
    //     message.error("Your property doesnot added");
    //   }
    //   console.log(res);
    //   message.success("Property created successfully!");
    //   router.push("/owner/my-property");
    // } catch (err: any) {
    //   console.error(err.message);
    // }
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
                  name="email"
                  type="number"
                  size="large"
                  label="Email"
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
                <FormSelectField
                  mode="multiple"
                  size="large"
                  name="socialMediaLink"
                  options={propertyAmenities}
                  label="Social Media Links"
                  placeholder="Select Links"
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
                  size="large"
                  label="Your address"
                />
              </Col>
            </Row>
          </div>
          <Button htmlType="submit" type="primary">
            Add Property
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
