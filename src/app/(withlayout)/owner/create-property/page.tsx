"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import {
  locations,
  propertyAmenities,
  propertyRules,
  propertyTags,
} from "@/constants/global";
import { useAddPropertyMutation } from "@/redux/api/propertyApi";
import propertySchema from "@/schemas/propertyValidation";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreatePropertyPage = () => {
  const router = useRouter();
  const [addProperty] = useAddPropertyMutation();

  const onSubmit = async (values: any) => {
    const { id } = getUserInfo() as { id: string };
    values.ownerId = id;
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading({ content: "Creating...", key: "loading" });
    try {
      const res = await addProperty(formData);
      //@ts-ignore
      if (res?.data.data.success === true) {
        message.success({
          content: "Property created successfully!",
          key: "loading",
          duration: 2,
        });
        router.push("/owner/my-property");
        //@ts-ignore
      } else if (res?.data.success === false) {
        message.error({
          content:
            "Property creation failed. Please check the data and try again.",
          key: "loading",
          duration: 5,
        });
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #ff6e7f, #bfe9cf)",
        height: "100vh",
      }}
    >
      <SSBreadCrumb
        items={[
          {
            label: "owner",
            link: "/owner",
          },
          {
            label: "property",
            link: "/owner/my-property/",
          },
        ]}
      />
      <h1>Create Property</h1>

      <div>
        <Form submitHandler={onSubmit} resolver={yupResolver(propertySchema)}>
          {/* Property Information */}
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>
              Property Information
            </p>
            <Row gutter={[8, 16]}>
              <Col xs={24} sm={24} md={12} lg={8}>
                <UploadImage name="file" />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8}>
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Title"
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8}>
                <FormSelectField
                  mode="multiple"
                  size="large"
                  name="city"
                  options={locations}
                  label="City"
                  placeholder="Select City"
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8}>
                <FormInput
                  type="text"
                  name="location"
                  size="large"
                  label="Location"
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8}>
                <FormInput
                  type="text"
                  name="size"
                  size="large"
                  label="Property Size"
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8}>
                <FormInput
                  name="numberOfRooms"
                  type="number"
                  size="large"
                  label="Number Of Rooms"
                  placeholder="Enter the number of rooms"
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8}>
                <FormInput
                  name="monthlyRent"
                  type="number"
                  size="large"
                  label="Monthly Rent"
                  placeholder="Enter the monthly rent"
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8}>
                <FormInput
                  type="text"
                  name="flatNo"
                  size="large"
                  label="Flat No"
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8}>
                <FormInput
                  name="maxOccupancy"
                  type="number"
                  size="large"
                  label="People Occupancy"
                  placeholder="Enter the highest number of people allowed"
                />
              </Col>
            </Row>
          </div>

          {/* More Info info */}
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>
              Basic Information
            </p>
            <Row gutter={[8, 16]}>
              <Col xs={24} sm={24} md={12} lg={8}>
                <FormDatePicker
                  name="availableDate"
                  label="Available Date"
                  size="large"
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8}>
                <FormSelectField
                  mode="multiple"
                  size="large"
                  name="amenities"
                  options={propertyAmenities}
                  label="Property Amenities"
                  placeholder="Select Amenities"
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8}>
                <FormSelectField
                  mode="multiple"
                  size="large"
                  name="propertyTags"
                  options={propertyTags}
                  label="Property Tags"
                  placeholder="Select Property Tags"
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8}>
                <FormSelectField
                  mode="multiple"
                  size="large"
                  name="rules"
                  options={propertyRules}
                  label="Rules"
                  placeholder="Select Rules"
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <FormTextArea
                  name="description"
                  label="Property Description"
                  rows={4}
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

export default CreatePropertyPage;
