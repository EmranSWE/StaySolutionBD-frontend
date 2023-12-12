"use client";
import CustomLoading from "@/components/ui/CustomLoading";
import { useTotalMonthlyPaymentQuery } from "@/redux/api/monthlyPaymentApi";
import { CalendarOutlined, DollarOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const PieChartDashboard = () => {
  const { data: totalAmount, isLoading: isLoading1 } =
    useTotalMonthlyPaymentQuery({});

  if (isLoading1) {
    return <CustomLoading />;
  }

  if (!totalAmount) {
    return <div>No data available</div>;
  }

  const totalValue = totalAmount;
  const maxValue = 1000000;
  const remainingValue = Math.max(maxValue - totalValue, 0);

  const pieChartData = [
    { name: "Total Amount", value: totalValue },
    { name: "Remaining", value: remainingValue },
  ];

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return (
    <div>
      <div style={{ marginLeft: "20px" }}>
        <h2 style={{ marginTop: "5%" }}>Pie Status</h2>
        <p style={{ fontSize: "18px", fontWeight: "bolder" }}>
          <CalendarOutlined />
          <span>{`${month}/${day}/${year}`}</span>
        </p>
        <p style={{ fontSize: "20px", fontWeight: "bolder", color: "green" }}>
          <DollarOutlined />
          <span
            style={{ fontSize: "20px", fontWeight: "bolder", color: "green" }}
          >
            {totalAmount} Taka
          </span>
        </p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartDashboard;
