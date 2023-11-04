import CustomLoading from "@/components/ui/CustomLoading";
import {
  useMonthlyPaymentsQuery,
  useTotalMonthlyPaymentQuery,
} from "@/redux/api/monthlyPaymentApi";
import { Tooltip } from "antd";
import React, { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

const DashboardColumnOne = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const query: Record<string, any> = {};

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data: paymentData, isLoading } = useMonthlyPaymentsQuery({
    ...query,
  });
  const { data: totalAmount, isLoading: isLoading1 } =
    useTotalMonthlyPaymentQuery({});

  if (isLoading1 || isLoading) {
    return <CustomLoading />;
  }

  const pieChartData = [{ name: "Total Amount", value: totalAmount }];
  const data = [
    { name: "Jan", uv: 4000 },
    { name: "Feb", uv: 3000 },
    { name: "Mar", uv: 2000 },
    { name: "Apr", uv: 2780 },
    { name: "May", uv: 1890 },
    { name: "Jun", uv: 2390 },
  ];

  console.log("Payment", paymentData);
  return (
    <div>
      <h1>Dashboard Column One</h1>
      <div>
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default DashboardColumnOne;
