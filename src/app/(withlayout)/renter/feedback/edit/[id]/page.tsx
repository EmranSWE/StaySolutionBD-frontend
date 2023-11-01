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
  locations,
  propertyAmenities,
  propertyRules,
} from "@/constants/global";
import {
  useSingleFeedbackQuery,
  useUpdateFeedbackMutation,
} from "@/redux/api/feedbackApi";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const UpdateFeedback = ({ params }: any) => {
  const [updateFeedback] = useUpdateFeedbackMutation();

  const router = useRouter();
  const { data, isLoading } = useSingleFeedbackQuery(params.id);
  if (isLoading) {
    return <CustomLoading />;
  }
  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }
  const onSubmit = async (values: any) => {
    try {
      const res = await updateFeedback({
        id: params.id,
        body: values,
      });
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
            link: "/renter",
          },
          {
            label: "feedback",
            link: "/renter/feedback/",
          },
        ]}
      />
      <h1>Update Feedback</h1>

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
                  value={data?.rating}
                  label="Rating"
                  placeholder="Enter the number of rooms"
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="feedback"
                  defaultValue={data?.feedback}
                  label="Feedback Description"
                  rows={4}
                />
              </Col>
            </Row>
          </div>
          <Button htmlType="submit" type="primary">
            Update Feedback
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateFeedback;
