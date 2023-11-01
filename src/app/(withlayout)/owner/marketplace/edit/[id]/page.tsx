"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import CustomLoading from "@/components/ui/CustomLoading";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { categoryOptions, marketplaceCategory } from "@/constants/global";
import {
  useGetSingleMarketplaceQuery,
  useUpdateMarketplaceMutation,
} from "@/redux/api/marketplaceApi";

import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const UpdateMarketplaceData = ({ params }: any) => {
  const router = useRouter();
  const { data, isLoading } = useGetSingleMarketplaceQuery(params.id);
  const [updateMarketplace] = useUpdateMarketplaceMutation();
  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }
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
      const res = await updateMarketplace({
        id: params.id,
        body: formData,
      });
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

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={12} lg={12}>
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
                xs={24}
                sm={12}
                md={12}
                lg={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  //@ts-ignore
                  mode="single"
                  size="large"
                  name="category"
                  defaultValue={data?.category}
                  options={categoryOptions}
                  label="Category"
                  placeholder="Select Location"
                />
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <FormInput
                  name="price"
                  type="number"
                  size="large"
                  value={data?.price}
                  label="Number Of Price"
                  placeholder="Enter the number of price"
                />
              </Col>

              <Col xs={24} sm={12} md={8} lg={8}>
                <p>Upload image</p>
                <UploadImage name="file" />
              </Col>

              <Col xs={24} md={24} lg={24}>
                <FormTextArea
                  name="description"
                  defaultValue={data?.itemDescription}
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

export default UpdateMarketplaceData;
