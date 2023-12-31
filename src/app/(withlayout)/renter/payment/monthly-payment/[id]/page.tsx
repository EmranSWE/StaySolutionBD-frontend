"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import CustomLoading from "@/components/ui/CustomLoading";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";

import {
  useAddRegularMonthlyPaymentMutation,
  useCurrentMonthMonthlyPaymentQuery,
} from "@/redux/api/monthlyPaymentApi";
import { getMonthName } from "@/utils/getUpcommingMonth";

import { Button, Col, Divider, Row, message } from "antd";
import { useRouter } from "next/navigation";

type BookingDetailsProps = {
  params: {
    id: string;
  };
};

const AddMonthlyPayments = ({ params }: BookingDetailsProps) => {
  const router = useRouter();
  const [addRegularMonthlyPayment] = useAddRegularMonthlyPaymentMutation();
  const { data, isLoading, isError } = useCurrentMonthMonthlyPaymentQuery(
    params?.id
  );

  if (isLoading) {
    return <CustomLoading />;
  }

  if (isError) {
    return <div>Error</div>;
  }
  // const uniqueMonths = Array.from(
  //   new Set(data?.map((data: { month: any }) => data.month))
  // );
  const uniqueMonths = Array.from(
    new Set(data?.map?.((dataItem: { month: any }) => dataItem?.month) || [])
  );

  const monthOptions = uniqueMonths?.map((month) => ({
    label: getMonthName(month as number),
    value: month,
  }));

  const defaultMonth = monthOptions[0];
  const defaultFirstMonth = data[0].month;
  const defaultYear = data ? data[0]?.year : new Date().getFullYear();
  const defaultAmount = data[0].amount;

  const onSubmit = async (values: any) => {
    const propertyId = params?.id;
    values.propertyId = propertyId;
    values.status = "Completed";
    if (values.month === undefined && defaultFirstMonth !== undefined) {
      values.month = defaultFirstMonth;
    }
    if (!values.paymentDate) {
      values.paymentDate = new Date();
    }
    try {
      const res = await addRegularMonthlyPayment(values);
      //@ts-ignore
      if (res?.data.success === true) {
        message.success({
          content: "Payment created successfully!",
          key: "loading",
          duration: 5,
        });
        router.push("/renter/my-property");
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
            label: "my-property",
            link: "/renter/my-property/",
          },
        ]}
      />
      <Divider orientation="center">
        <h1>
          Monthly <span style={{ color: "#4096FF" }}>Rent</span> Payment
        </h1>
      </Divider>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                fontSize: "24px",
                fontWeight: "bolder",
                marginBottom: "10px",
              }}
            >
              Payment Information
            </p>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={12}>
                <FormSelectField
                  size="large"
                  name="month"
                  //@ts-ignore
                  options={monthOptions}
                  label="Month"
                  placeholder="Select Payment Month"
                  //@ts-ignore
                  defaultValue={defaultMonth}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={12}>
                <FormInput
                  type="number"
                  name="year"
                  size="large"
                  label="Year"
                  value={defaultYear}
                />
              </Col>

              <Col xs={24} sm={12} md={8} lg={12}>
                <FormInput
                  type="number"
                  name="amount"
                  size="large"
                  value={defaultAmount}
                  label="Monthly Rent Amount"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={12}>
                <FormDatePicker
                  name="paymentDate"
                  label="Payment Date"
                  size="large"
                />
              </Col>
            </Row>
          </div>

          <Button
            htmlType="submit"
            type="primary"
            style={{ width: "100%", margin: "10px 0" }}
          >
            Pay Now
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddMonthlyPayments;
