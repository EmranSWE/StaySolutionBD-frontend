import CustomLoading from "@/components/ui/CustomLoading";
import { useTotalMonthlyPaymentQuery } from "@/redux/api/monthlyPaymentApi";
import React from "react";

const AdminPage = () => {
  const { data, isLoading } = useTotalMonthlyPaymentQuery({});
  console.log(data);
  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <>
      <p>Welcome to Admin Page</p>
      <h1>Total Money: {data}</h1>
    </>
  );
};

export default AdminPage;
