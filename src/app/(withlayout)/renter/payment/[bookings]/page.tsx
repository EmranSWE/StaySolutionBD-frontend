"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import CustomLoading from "@/components/ui/CustomLoading";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { months } from "@/constants/global";
import { useSingleBookingQuery } from "@/redux/api/bookingApi";
import { useAddMonthlyPaymentMutation } from "@/redux/api/monthlyPaymentApi";
import { Button, Col, Divider, Row, message } from "antd";
import { useRouter } from "next/navigation";
type BookingDetailsProps = {
  params: {
    bookings: string;
  };
};

const AddMonthlyPayments = ({ params }: BookingDetailsProps) => {
  const router = useRouter();
  const [addMonthlyPayment] = useAddMonthlyPaymentMutation();

  const { data, isLoading } = useSingleBookingQuery(params?.bookings);
  if (isLoading) {
    return <CustomLoading />;
  }

  const bookingEndDate = data?.bookingEndDate;
  const defaultMonth = bookingEndDate
    ? new Date(bookingEndDate).getMonth()
    : undefined;

  const year = data?.bookingEndDate
    ? new Date(data.bookingEndDate).getFullYear()
    : undefined;
  const onSubmit = async (values: any) => {
    const bookingId = params?.bookings;
    values.bookingId = bookingId;
    values.status = "Completed";
    if (values.month === undefined && defaultMonth !== undefined) {
      values.month = defaultMonth;
    }
    if (!values.paymentDate) {
      // Set your default payment date here
      values.paymentDate = new Date(); // Replace this with your desired default date
    }

    try {
      const res = await addMonthlyPayment(values);
      //@ts-ignore
      if (res?.data.success === true) {
        message.success({
          content: "Payment created successfully!",
          key: "loading",
          duration: 5,
        });
        router.push("/renter/booking");
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
                  //@ts-ignore
                  defaultValue={defaultMonth}
                  placeholder="Select Payment Month"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormInput
                  type="number"
                  name="year"
                  size="large"
                  label="Year"
                  value={year}
                  disabled={true}
                />
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <FormInput
                  type="number"
                  name="amount"
                  size="large"
                  label="Monthly Rent Amount"
                  required
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
