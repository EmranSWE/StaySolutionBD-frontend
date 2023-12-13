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

import { Button, Col, Divider, Row, message } from "antd";
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
    message.loading({ content: "Creating...", key: "loading" });
    try {
      const res = await addToMarketplace(formData);
      //@ts-ignore
      if (res?.data.success === true) {
        message.success({
          content: "Property created successfully!",
          key: "loading",
          duration: 2,
        });
        console.log("success", res);
        // router.push("/owner/my-property");
        //@ts-ignore
      } else if (res?.data.success === false) {
        message.error({
          content:
            "Property creation failed. Please check the data and try again.",
          key: "loading",
          duration: 5,
        });
        console.log("error", res);
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
            label: "marketplace",
            link: "/owner/marketplace/",
          },
        ]}
      />
      <Divider orientation="center">
        <h1>
          Add <span style={{ color: "#1890ff" }}>To Marketplace </span>
        </h1>
      </Divider>

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
                xs={24}
                sm={12}
                md={12}
                lg={12}
                style={{ marginBottom: "10px" }}
              >
                <FormInput
                  name="title"
                  type="text"
                  size="large"
                  label="Title"
                  placeholder="Enter the property Title"
                />
              </Col>

              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                style={{ marginBottom: "10px" }}
              >
                <FormSelectField
                  name="category"
                  size="large"
                  label="Category"
                  options={marketplaceCategory}
                  placeholder="Select"
                />
              </Col>

              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                style={{ marginBottom: "10px" }}
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
                xs={24}
                sm={24}
                md={12}
                lg={8}
                style={{ marginBottom: "10px" }}
              >
                <p>Upload Image</p>
                <UploadImage name="file" />
              </Col>

              <Col xs={24} sm={24} md={12} lg={24} style={{ margin: "10px 0" }}>
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
