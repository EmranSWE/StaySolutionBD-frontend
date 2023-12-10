"use client";
import React from "react";
import SSTable from "@/components/ui/SSBDTable";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import CustomLoading from "@/components/ui/CustomLoading";
import { useSingleUserMonthlyPaymentQuery } from "@/redux/api/monthlyPaymentApi";
import "./payment.style.css";
function getMonthName(monthNumber: number) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[monthNumber - 1];
}

const BookingPaymentPage = () => {
  const { data: monthlyPayments, isLoading } = useSingleUserMonthlyPaymentQuery(
    {}
  );

  if (isLoading || !monthlyPayments || monthlyPayments.length === 0) {
    return <CustomLoading></CustomLoading>;
  }

  const currentYear = new Date().getFullYear();
  const next10Years = Array.from(
    { length: 11 },
    (_, index) => currentYear + index
  );

  const validYears = monthlyPayments
    .map((payment: any) => payment.year)
    .filter((year: number) => typeof year === "number" && !isNaN(year));

  if (validYears.length === 0) {
    return <div>No valid data available</div>;
  }

  const minYear = Math.min(...validYears, ...next10Years);
  const maxYear = Math.max(...validYears, ...next10Years);

  const allMonths = [];
  for (let year = minYear; year <= maxYear; year++) {
    for (let month = 1; month <= 12; month++) {
      const monthIndex = (year - minYear) * 12 + (month - 1);
      const payment = monthlyPayments.find(
        (p: any) => p.year === year && p.month === month
      );
      allMonths.push({
        month,
        year,
        amount: payment ? payment.amount : 0,
        status: payment ? payment.status : "Incomplete",
      });
    }
  }

  const columns = [
    {
      title: "Month",
      dataIndex: "month",
      render: (month: number) => getMonthName(month),
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Rent",
      dataIndex: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) =>
        status === "Completed" ? (
          <span style={{ fontSize: "15px" }}>{status}</span>
        ) : (
          <span style={{ fontSize: "15px" }}>Incomplete</span>
        ),
    },
  ];

  const onTableChange = (pagination: any, filters: any, sorter: any) => {};

  const rowClassName = (record: any) => {
    return record.status === "Completed" ? "green" : "yellow";
  };
  return (
    <div>
      <SSBreadCrumb
        items={[
          {
            label: "renter",
            link: "/renter",
          },
        ]}
      />

      {isLoading ? (
        <CustomLoading />
      ) : (
        <SSTable
          loading={isLoading}
          columns={columns}
          dataSource={allMonths}
          onTableChange={onTableChange}
          rowClassName={rowClassName}
        />
      )}
    </div>
  );
};

export default BookingPaymentPage;
