"use client";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Form, Button, message, Row, Col } from "antd";

const CheckoutForm = ({ onSubmit }) => {
  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  };

  const handleStripeSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(card);

    if (error) {
      console.error(error);
      message.error(error.message);
    } else {
      onSubmit(token);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleStripeSubmit}>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={18} lg={16} xl={8}>
          <Form.Item label="Card Details">
            <CardElement options={{ style: cardStyle }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Payment
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CheckoutForm;
