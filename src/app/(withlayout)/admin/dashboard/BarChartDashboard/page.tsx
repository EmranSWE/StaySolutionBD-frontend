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

type MonthlyPayment = {
  month: number;
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

  const sortedData = [...monthlyPayments].sort((a, b) => {
    return a.year !== b.year ? a.year - b.year : a.month - b.month;
  });

  const dataForBarChart = sortedData.map((item: MonthlyPayment) => ({
    name: `${getMonthName(item.month)} ${item.year}`,
    Total: item.totalAmount,
  }));
  const totalAmount = sortedData.reduce(
    (sum, current) => sum + current.totalAmount,
    0
  );

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        marginBottom: "15%",
      }}
    >
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
          <Bar dataKey="Total" fill="red" barSize={20}>
            <LabelList dataKey="Total" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ textAlign: "center" }}>
        <strong>Total Amount Collected: </strong>
        {totalAmount.toLocaleString()} Taka
      </div>
    </div>
  );
};

export default BarChartDashboard;
