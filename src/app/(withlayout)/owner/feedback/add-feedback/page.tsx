"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { useAddFeedbackMutation } from "@/redux/api/feedbackApi";
import { useAddReviewMutation } from "@/redux/api/reviewApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const AddReviewPage = () => {
  const router = useRouter();
  const [addFeedback] = useAddFeedbackMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await addFeedback(values);
      if (!res) {
        message.error("Your feedback doesnot added");
      }
      console.log(res);
      message.success("Feedback created successfully!");
      //   router.push("/renter/review");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <SSBreadCrumb
        items={[
          {
            label: "renter",
            link: "/renter",
          },
          {
            label: "feedback",
            link: "/renter/feedback/",
          },
        ]}
      />
      <h1>Create Review</h1>

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
              Feedback Information
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
                  name="rating"
                  type="number"
                  size="large"
                  label="Rating"
                  placeholder="Enter the rating"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea name="feedback" label="Feedback" rows={4} />
              </Col>
            </Row>
          </div>

          <Button htmlType="submit" type="primary">
            Add Feedback
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddReviewPage;
