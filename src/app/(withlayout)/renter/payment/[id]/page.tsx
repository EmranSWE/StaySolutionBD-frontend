"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { months, paymentStatus } from "@/constants/global";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import { useAddMonthlyPaymentMutation } from "@/redux/api/monthlyPaymentApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

type BookingDetailsProps = {
  params: {
    id: string;
  };
};

const AddMonthlyPayments = ({ params }: BookingDetailsProps) => {
  console.log(params.id);
  const [addMonthlyPayment] = useAddMonthlyPaymentMutation();
  const onSubmit = async (values: any) => {
    const bookingId = params?.id;
    values.bookingId = bookingId;
    console.log("values", values);

    try {
      const res = await addMonthlyPayment(values);
      if (!res) {
        message.error("Your Payment does not added");
      }
      console.log(res);
      message.success("Reviews created successfully!");
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
            label: "booking",
            link: "/renter/booking/",
          },
        ]}
      />
      <h1>Monthly Rent</h1>

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
                <FormSelectField
                  name="month"
                  options={months}
                  size="large"
                  label="Status"
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
                  type="number"
                  name="year"
                  size="large"
                  label="Year"
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
                  name="status"
                  options={paymentStatus}
                  size="large"
                  label="Status"
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
                  type="number"
                  name="amount"
                  size="large"
                  label="Monthly Rent Amount"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormDatePicker
                  name="paymentDate"
                  label="Payment Date"
                  size="large"
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

export default AddMonthlyPayments;
