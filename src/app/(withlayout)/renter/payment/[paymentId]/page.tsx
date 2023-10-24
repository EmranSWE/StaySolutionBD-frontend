"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { paymentStatus } from "@/constants/global";
import { useAddPaymentMutation } from "@/redux/api/paymentApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

type PaymentParamsProp = {
  params: {
    paymentId: string;
  };
};
const AddPaymentPage = ({ params }: PaymentParamsProp) => {
  const router = useRouter();
  const [addPayment] = useAddPaymentMutation();

  const onSubmit = async (values: any) => {
    const { id } = getUserInfo() as { id: string };
    const paymentId = params?.paymentId;

    if (!paymentId) {
      console.error("Property ID is missing");
      return;
    }

    values.bookingId = paymentId;
    console.log("values", values);

    try {
      const res = await addPayment(values);
      if (!res) {
        message.error("Your issue doesnot added");
      }
      console.log(res);
      message.success("Reviews created successfully!");
      router.push("/renter/payment");
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
            label: "payment",
            link: "/renter/payment/",
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
                <FormSelectField
                  size="large"
                  name="paymentStatus"
                  options={paymentStatus}
                  label="Payment Status"
                  placeholder="Select Payment"
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
                  name="paymentMethod"
                  type="text"
                  size="large"
                  label="Payment"
                  placeholder="Enter the security money"
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
                  name="securityDeposit"
                  type="number"
                  size="large"
                  label="Security Deposit"
                  placeholder="Enter the security money"
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
                  name="paymentAmount"
                  type="number"
                  size="large"
                  label="Payment Amount"
                  placeholder="Enter the security money"
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

export default AddPaymentPage;
