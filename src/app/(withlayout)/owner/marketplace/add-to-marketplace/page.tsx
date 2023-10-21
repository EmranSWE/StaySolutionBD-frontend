"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { marketplaceCategory } from "@/constants/global";
import { useAddToMarketplaceMutation } from "@/redux/api/marketplaceApi";

import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const AddPropertyToMarketplace = () => {
  const router = useRouter();
  const [addToMarketplace] = useAddToMarketplaceMutation();

  const onSubmit = async (values: any) => {
    const { id } = getUserInfo() as { id: string };
    values.ownerId = id;
    console.log("values", values);
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating...");
    console.log("form data", formData);
    try {
      const res = await addToMarketplace(formData);
      if (!res) {
        message.error("Your data doesn't added");
      }
      console.log(res);
      message.success("Property created successfully!");
      // router.push("/owner/marketplace");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <SSBreadCrumb
        items={[
          {
            label: "owner",
            link: "/owner",
          },
          {
            label: "marketplace",
            link: "/owner/marketplace/",
          },
        ]}
      />
      <h1>Create Property</h1>

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
                span={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  name="category"
                  size="large"
                  label="Category"
                  options={marketplaceCategory}
                  placeholder="Select"
                ></FormSelectField>
              </Col>

              <Col
                className="gutter-row"
                span={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  name="price"
                  type="number"
                  size="large"
                  label="Price"
                  placeholder="Enter the property price"
                />
              </Col>

              <Col
                className="gutter-row"
                span={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="file" />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="itemDescription"
                  label="Property Description"
                  rows={4}
                />
              </Col>
            </Row>
          </div>

          {/* basic info */}

          <Button htmlType="submit" type="primary">
            Add Property
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddPropertyToMarketplace;
