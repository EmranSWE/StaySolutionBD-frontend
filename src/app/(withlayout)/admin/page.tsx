"use client";
import CustomLoading from "@/components/ui/CustomLoading";
import { useTotalMonthlyPaymentQuery } from "@/redux/api/monthlyPaymentApi";
import { Col, Divider, Row } from "antd";
import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const AdminPage = () => {
  const { data: totalAmount, isLoading } = useTotalMonthlyPaymentQuery({});

  if (isLoading) {
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

  const dataS = [
    { name: "Jan", amount: 1000 },
    { name: "Feb", amount: 1500 },
    { name: "Mar", amount: 800 },
    { name: "Apr", amount: 2000 },
    { name: "May", amount: 1200 },
    { name: "Jun", amount: 1800 },
    { name: "Jul", amount: 1400 },
    { name: "Aug", amount: 900 },
    { name: "Sep", amount: 1100 },
    { name: "Oct", amount: 1600 },
    { name: "Nov", amount: 2100 },
    { name: "Dec", amount: 1300 },
  ];
  return (
    <>
      <Divider orientation="left">Welcome to Admin Page</Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
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
        </Col>

        <Col className="gutter-row" span={6}>
          <div>
            {" "}
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            {" "}
            <BarChart width={600} height={400} data={dataS}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>col-6</div>
        </Col>
      </Row>
    </>
  );
};

export default AdminPage;
