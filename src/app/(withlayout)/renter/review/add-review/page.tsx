"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import CustomLoading from "@/components/ui/CustomLoading";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { useSingleRenterPropertyQuery } from "@/redux/api/propertyApi";

import { useAddReviewMutation } from "@/redux/api/reviewApi";
import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Divider, Row, message } from "antd";
import { useRouter } from "next/navigation";

const AddReviewPage = () => {
  const { id } = getUserInfo() as { id: String };
  const [addReview] = useAddReviewMutation();
  const router = useRouter();

  if (!id) {
    console.error("Id not found");
  }
  const { data, isLoading, isError, error } = useSingleRenterPropertyQuery(id);
  if (isLoading) {
    return <CustomLoading />;
  }
  const propertyId = data[0]?.id;
  const flatNo = data[0]?.flatNo;
  if (isLoading) {
    return <CustomLoading />;
  }
  const onSubmit = async (values: any) => {
    values.renterId = id;
    values.propertyId = propertyId;
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating...");
    try {
      const res = await addReview(formData);
      if (!res) {
        message.error("Your review doesn't added");
      }
      console.log(res);
      message.success("Reviews created successfully!");
      router.push("/renter/review");
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
            label: "renter",
            link: "/renter",
          },
          {
            label: "review",
            link: "/renter/review/",
          },
        ]}
      />
      <Divider orientation="center">
        <h1>
          Add <span style={{ color: "#1890ff" }}>New</span> Review
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
              <Col xs={24} sm={24} lg={8} xl={8} style={{ fontSize: "20px" }}>
                <UploadImage name="file" />
              </Col>

              <Col xs={24} sm={24} lg={8} xl={8} style={{ fontSize: "20px" }}>
                <FormInput
                  name="rating"
                  type="number"
                  size="large"
                  label="rating"
                  placeholder="Enter the rating"
                />
              </Col>

              <Col
                xs={24}
                sm={24}
                lg={8}
                xl={8}
                style={{ fontSize: "20px", marginTop: "2px" }}
              >
                <FormInput
                  name="propertyId"
                  type="text"
                  value={flatNo}
                  disabled
                  size="large"
                  label="Your Flat"
                />
              </Col>
              <Col xs={24} sm={24} lg={24} xl={24} style={{ fontSize: "20px" }}>
                <FormTextArea
                  name="comments"
                  label="Property Comments"
                  rows={4}
                />
              </Col>
              <Col
                xs={24}
                sm={24}
                lg={24}
                xl={24}
                style={{ fontSize: "20px", textAlign: "center" }}
              >
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  Add Review
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddReviewPage;
