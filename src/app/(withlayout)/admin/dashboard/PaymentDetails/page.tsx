"use client";
import React, { useState } from "react";
import {
  useAllPropertiesQuery,
  useSpecificPropertyMonthWiseDetailsQuery,
} from "@/redux/api/monthlyPaymentApi";
import { Button, Col, Form, Row, Select, Spin, Table } from "antd";
import SSTable from "@/components/ui/SSBDTable";
import dayjs from "dayjs";
const { Option } = Select;

const PaymentDetails = () => {
  const { data: properties, isLoading } = useAllPropertiesQuery({});
  const [selectedFlat, setSelectedFlat] = useState(null);
  const { data: paymentDetails, isLoading: paymentLoading } =
    useSpecificPropertyMonthWiseDetailsQuery(selectedFlat);
  const handleReset = () => {
    setSelectedFlat(null);
  };
  const handleFlatSelect = (value: any) => {
    setSelectedFlat(value);
  };
  const handlePrint = () => {
    const tableContainer = document.getElementById("paymentDetailsTable");
    const printWindow = window.open("", "_blank");
    //@ts-ignore
    printWindow.document.body.appendChild(tableContainer.cloneNode(true));
    //@ts-ignore
    printWindow.print();
  };
  const columns = [
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      render: (text: any) =>
        dayjs()
          .month(text - 1)
          .format("MMMM"),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      render: function (data: any) {
        const paymentDate = dayjs(data);
        const isAfter10th = paymentDate.date() > 10;
        return (
          <span style={{ color: isAfter10th ? "red" : "green" }}>
            {data && paymentDate.format("MMM D, YYYY hh:mm A")}
          </span>
        );
      },
    },
  ];

  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      <h1>Payment Details</h1>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <Form>
            <Row gutter={[8, 0]}>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Form.Item label="Select Flat">
                  <Select
                    onChange={handleFlatSelect}
                    placeholder="Select a flat"
                    style={{ width: "100%" }}
                  >
                    {properties.map((property: any) => (
                      <Option key={property.id} value={property.id}>
                        {property.flatNo}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Button
                  type="primary"
                  onClick={handleReset}
                  style={{ width: "100%", marginBottom: "16px" }}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>

          {selectedFlat && (
            <div id="paymentDetailsContent">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Payment Details</h2>
                <Button
                  type="primary"
                  onClick={handlePrint}
                  style={{
                    width: "20%",
                    marginBottom: "16px",
                    backgroundColor: "green",
                  }}
                >
                  Print
                </Button>
              </div>
              {paymentLoading ? (
                <Spin />
              ) : (
                <div id="paymentDetailsTable">
                  <SSTable
                    loading={isLoading}
                    columns={columns}
                    dataSource={paymentDetails}
                    showSizeChanger={true}
                    showPagination={true}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentDetails;
