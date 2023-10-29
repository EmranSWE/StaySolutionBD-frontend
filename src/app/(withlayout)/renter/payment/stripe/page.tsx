"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout/page";
import { useAddPaymentToStripeMutation } from "@/redux/api/paymentApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const PaymentPage = ({ params }: any) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { paymentId } = params;
  const [addPaymentToStripe] = useAddPaymentToStripeMutation();
  const handleTokenReceived = async (token: any) => {
    setLoading(true);
    const data = {
      token: token.id,
      paymentId,
    };
    const res = await addPaymentToStripe(data);
    if (!!res) {
      router.push("/renter/booking");
    }
  };
  if (loading) {
    return <div>Loading..........</div>;
  }
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onSubmit={handleTokenReceived} />
    </Elements>
  );
};

export default PaymentPage;
