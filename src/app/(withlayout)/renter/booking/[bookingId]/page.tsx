"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import { Button, Col, Divider, Row, message } from "antd";
import { useRouter } from "next/navigation";

type BookingDetailsProps = {
  params: {
    bookingId: string;
  };
};

const AddBookingPage = ({ params }: BookingDetailsProps) => {
  const router = useRouter();
  const [addBooking] = useAddBookingMutation();

  const onSubmit = async (values: any) => {
    const propertyId = params?.bookingId;
    if (!propertyId) {
      console.error("Property ID is missing");
      return;
    }
    values.propertyId = propertyId;
    try {
      const res = await addBooking(values);

      //@ts-ignore
      if (res?.data.success === true) {
        message.success({
          content: "Booking created successfully!",
          key: "loading",
          duration: 5,
        });
        router.push("/renter/booking");
        //@ts-ignore
      } else if (res?.data.statusCode === 500) {
        message.error({
          content:
            "Booking creation failed. Please check the data and try again.",
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
            label: "booking",
            link: "/renter/booking/",
          },
        ]}
      />
      <Divider orientation="center">
        <h1>
          Book <span style={{ color: "#1890ff" }}>Your</span> Flat
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
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
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
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="specialRequest"
                  size="large"
                  required
                  label="Booking Request"
                  placeholder="Request if any extra facility you need ...."
                />
              </Col>
            </Row>
          </div>

          <Button htmlType="submit" type="primary">
            Add Booking
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddBookingPage;
