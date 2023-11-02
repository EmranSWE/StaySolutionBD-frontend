"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { months, paymentStatus } from "@/constants/global";
import {
  useAddBookingMutation,
  useSingleBookingQuery,
} from "@/redux/api/bookingApi";
import { useAddMonthlyPaymentMutation } from "@/redux/api/monthlyPaymentApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Divider, Row, message } from "antd";
import { useRouter } from "next/navigation";

type BookingDetailsProps = {
  params: {
    id: string;
  };
};

const AddMonthlyPayments = ({ params }: BookingDetailsProps) => {
  const { data } = useSingleBookingQuery(params?.id);
  console.log(data);
  const [addMonthlyPayment] = useAddMonthlyPaymentMutation();
  const onSubmit = async (values: any) => {
    const bookingId = params?.id;
    values.bookingId = bookingId;
    try {
      const res = await addMonthlyPayment(values);
      console.log(res);
      //@ts-ignore
      if (res?.data.success === true) {
        message.success({
          content: "Payment created successfully!",
          key: "loading",
          duration: 5,
        });
        //@ts-ignore
      } else if (res?.data.statusCode === 500) {
        message.error({
          content:
            "Payment creation failed. Please check the data and try again.",
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
            label: "booking",
            link: "/renter/booking/",
          },
        ]}
      />
      <Divider orientation="center">
        <h1>
          Monthly <span style={{ color: "#1890ff" }}>Rent</span> Payment
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
              Payment Information
            </p>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormSelectField
                  size="large"
                  name="month"
                  //@ts-ignore
                  options={months}
                  label="Month"
                  placeholder="Select Payment Month"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormInput
                  type="number"
                  name="year"
                  size="large"
                  label="Year"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormSelectField
                  name="status"
                  options={paymentStatus}
                  size="large"
                  label="Status"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormInput
                  type="number"
                  name="amount"
                  size="large"
                  label="Monthly Rent Amount"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormDatePicker
                  name="paymentDate"
                  label="Payment Date"
                  size="large"
                />
              </Col>
            </Row>
          </div>

          <Button htmlType="submit" type="primary">
            Pay Now
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddMonthlyPayments;
