"use client";
import React from "react";
import CustomLoading from "@/components/ui/CustomLoading";
import { useMonthWiseTotalsQuery } from "@/redux/api/monthlyPaymentApi";
import {
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

// Define the type for each payment entry
type MonthlyPayment = {
  month: number; // Assuming month is a number 1-12
  year: number;
  totalAmount: number;
};

const getMonthName = (monthNumber: number): string => {
  return new Date(0, monthNumber - 1).toLocaleString("default", {
    month: "long",
  });
};

const BarChartDashboard: React.FC = () => {
  const { data: monthlyPayments, isLoading } = useMonthWiseTotalsQuery({});

  if (isLoading) {
    return <CustomLoading />;
  }

  if (!monthlyPayments) {
    return <div>No data available</div>;
  }

  // Sort data by year and then by month
  const sortedData = [...monthlyPayments].sort((a, b) => {
    return a.year !== b.year ? a.year - b.year : a.month - b.month;
  });

  // Format the data for the BarChart
  const dataForBarChart = sortedData.map((item: MonthlyPayment) => ({
    name: `${getMonthName(item.month)} ${item.year}`,
    Total: item.totalAmount,
  }));
  const totalAmount = sortedData.reduce(
    (sum, current) => sum + current.totalAmount,
    0
  );

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <h2 style={{ textAlign: "center" }}>Monthly Rent</h2>
      <ResponsiveContainer>
        <BarChart
          data={dataForBarChart}
          margin={{ top: 20, right: 40, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            //@ts-ignore
            tick={{ angle: -50, textAnchor: "end" }}
          />
          <YAxis />
          <Tooltip formatter={(value: number) => [`${value} Taka`, "Total"]} />
          <Legend />
          <Bar dataKey="Total" fill="#8884d8" barSize={20}>
            <LabelList dataKey="Total" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <strong>Total Amount Collected: </strong>
        {totalAmount.toLocaleString()} Taka
      </div>
    </div>
  );
};

export default BarChartDashboard;
