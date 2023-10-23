"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const AddBookingPage = () => {
  const router = useRouter();
  const [addBooking] = useAddBookingMutation();

  const onSubmit = async (values: any) => {
    const { id } = getUserInfo() as { id: string };

    console.log("values", values);

    try {
      const res = await addBooking(values);
      if (!res) {
        message.error("Your issue doesnot added");
      }
      console.log(res);
      message.success("Reviews created successfully!");
      router.push("/renter/booking");
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
            label: "issue",
            link: "/renter/my-issue/",
          },
        ]}
      />
      <h1>Create Issue</h1>

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
                <FormDatePicker
                  name="bookingStartDate"
                  label="Booking  Date"
                  size="large"
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
                  name="specialRequest"
                  size="large"
                  label="Special Request"
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
                  name="propertyId"
                  size="large"
                  label="Property Id"
                />
              </Col>
            </Row>
          </div>

          <Button htmlType="submit" type="primary">
            Add Review
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddBookingPage;
