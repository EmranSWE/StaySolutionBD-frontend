"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { useAddFeedbackMutation } from "@/redux/api/feedbackApi";
import { FeedbackValidation } from "@/schemas/feedbackValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Divider, Row, message } from "antd";
import { useRouter } from "next/navigation";

const AddReviewPage = () => {
  const [addFeedback] = useAddFeedbackMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await addFeedback(values);
      //@ts-ignore
      if (res?.data.success === true) {
        message.success({
          content: "Feedback created successfully!",
          key: "loading",
          duration: 2,
        });

        //@ts-ignore
      } else if (res?.data.success === false) {
        message.error({
          content:
            "Feedback creation failed. Please check the data and try again.",
          key: "loading",
          duration: 5,
        });
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
            label: "renter",
            link: "/owner",
          },
          {
            label: "feedback",
            link: "/renter/feedback/",
          },
        ]}
      />
      <Divider orientation="center">
        <h1>
          Create <span style={{ color: "#1890ff" }}>Your Feedback</span>
        </h1>
      </Divider>

      <div>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(FeedbackValidation)}
        >
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Col
                className="gutter-row"
                sm={24}
                md={18}
                lg={18}
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
                sm={24}
                md={18}
                lg={18}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea name="feedback" label="Feedback" rows={4} />
              </Col>
              <Col
                className="gutter-row"
                sm={24}
                md={18}
                lg={18}
                style={{
                  marginBottom: "10px",
                }}
              >
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ width: "100%" }}
                >
                  Add Feedback
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
