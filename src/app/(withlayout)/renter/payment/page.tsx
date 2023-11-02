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

  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }
  // Generate an array with all months initially set to "Complete"
  const allMonths = Array.from({ length: 12 }, (_, index) => ({
    month: index + 1,
    year: 2023, // Set the year to your desired value
    status: "Complete",
  }));

  // Update the "Status" for months that exist in the backend response
  monthlyPayments.forEach((payment: any) => {
    const monthIndex = payment.month - 1;
    allMonths[monthIndex] = payment;
  });

  const columns = [
    {
      title: "Month",
      dataIndex: "month",
      render: (month: number) => getMonthName(month),
      sorter: true,
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

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    // You can add sorting functionality here if needed
  };

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
