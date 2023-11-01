"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import CustomLoading from "@/components/ui/CustomLoading";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import {
  LOCATIONS,
  propertyAmenities,
  propertyRules,
} from "@/constants/global";
import {
  useAddPropertyMutation,
  useSinglePropertyQuery,
  useUpdatePropertyMutation,
} from "@/redux/api/propertyApi";
import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const UpdatePropertyPage = ({ params }: any) => {
  const router = useRouter();
  const { data, isLoading } = useSinglePropertyQuery(params.id);

  const [updateProperty] = useUpdatePropertyMutation();
  if (isLoading) {
    return <CustomLoading></CustomLoading>;
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
      const res = await updateProperty({
        id: params.id,
        body: formData,
      });
      if (!res) {
        message.error("Data doesn't update");
      }
      message.success("User updated successfully!");
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <SSBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "property",
            link: "/admin/manage-property/",
          },
        ]}
      />
      <h1>Update Property</h1>

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
              Property Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  value={data?.title}
                  label="Title"
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
                  name="location"
                  defaultValue={data?.location}
                  options={LOCATIONS}
                  label="Locations"
                  placeholder="Select Location"
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
                  name="city"
                  size="large"
                  label="City"
                  value={data?.city}
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
                  name="numberOfRooms"
                  type="number"
                  size="large"
                  value={data?.numberOfRooms}
                  label="Number Of Rooms"
                  placeholder="Enter the number of rooms"
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
                  name="monthlyRent"
                  type="number"
                  size="large"
                  value={data?.monthlyRent}
                  label="Monthly Rent"
                  placeholder="Enter the monthly rent"
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
                  name="flatNo"
                  size="large"
                  value={data?.flatNo}
                  label="Flat No"
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
                  name="rules"
                  defaultValue={data?.rules}
                  options={propertyRules}
                  label="Rules"
                  placeholder="Select Rules"
                />
              </Col>

              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="file" />
              </Col>
            </Row>
          </div>

          {/* basic info */}
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
              Basic Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormDatePicker
                  name="availableDate"
                  label="Available Date"
                  size="large"
                  value={data?.availableDate}
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
                  name="amenities"
                  defaultValue={data?.amenities || []}
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
                  name="size"
                  size="large"
                  value={data?.size}
                  label="Property Size"
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
                  name="maxOccupancy"
                  type="number"
                  size="large"
                  value={data?.maxOccupancy}
                  label="People Occupancy"
                  placeholder="Enter the highest number of people allowed"
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="description"
                  defaultValue={data?.description}
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

export default UpdatePropertyPage;
