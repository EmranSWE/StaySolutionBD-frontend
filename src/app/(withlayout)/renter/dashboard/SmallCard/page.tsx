"use client";
import React from "react";
import { Button, Card, Col, Row } from "antd";
import {
  BankTwoTone,
  DollarOutlined,
  HomeTwoTone,
  MoneyCollectTwoTone,
  PayCircleOutlined,
} from "@ant-design/icons";
import {
  useSingleUserMonthlyPaymentQuery,
  useSingleUserTotalPaymentQuery,
} from "@/redux/api/monthlyPaymentApi";

import CustomLoading from "@/components/ui/CustomLoading";
import { useSingleRenterPropertyQuery } from "@/redux/api/propertyApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const commonCardStyle = {
  borderRadius: 10,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const SmallDetailsCard = () => {
  const { id } = getUserInfo() as { id: String };
  if (!id) {
    console.error("Id not found");
  }
  const { data: myTotalPayment, isLoading: isLoading2 } =
    useSingleUserTotalPaymentQuery({});

  const { data, isLoading, isError, error } = useSingleRenterPropertyQuery(id);
  if (isLoading || isLoading2) {
    return <CustomLoading />;
  }

  const propertyId = data[0]?.id;
  const property = data[0];
  console.log(myTotalPayment);
  return (
    <div style={{ marginBottom: "5%" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card
            title="Total Payment"
            //@ts-ignore

            style={{
              ...commonCardStyle,
              background: "linear-gradient(45deg, #4CAF50, #434242)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <p>
                <MoneyCollectTwoTone
                  style={{ fontSize: "30px", marginRight: "8px" }}
                />
              </p>
              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "white",
                  margin: 0,
                }}
              >
                <DollarOutlined /> {myTotalPayment}
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
              }}
            >
              My total rent paid
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card
            title="My Flat"
            //@ts-ignore
            style={{
              ...commonCardStyle,
              background: "linear-gradient(45deg, #FF2B3C, purple)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <HomeTwoTone style={{ fontSize: "30px", marginRight: "8px" }} />
              <p
                style={{
                  fontSize: "27px",
                  fontWeight: "bold",
                  color: "white",
                  margin: 0,
                }}
              >
                {property?.flatNo}
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
              }}
            >
              My current Apartment
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card
            title="Monthly Rent"
            //@ts-ignore

            style={{
              ...commonCardStyle,
              background: "linear-gradient(45deg, #ab2d2f, purple)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <HomeTwoTone style={{ fontSize: "30px", marginRight: "8px" }} />
              <p
                style={{
                  fontSize: "27px",
                  fontWeight: "bold",
                  color: "white",
                  margin: 0,
                }}
              >
                {property?.monthlyRent}
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
              }}
            >
              My month wise Rent
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card
            title="Pay For the month"
            //@ts-ignore
            style={{
              ...commonCardStyle,
              background: "linear-gradient(45deg, #4CAF50, purple)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <Link href={`/renter/payment/monthly-payment/${propertyId}`}>
                <Button
                  style={{
                    margin: "0px 10px",
                    backgroundColor: "green",
                  }}
                  onClick={() => ""}
                  type="primary"
                >
                  <PayCircleOutlined />
                </Button>
              </Link>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
              }}
            >
              Please Pay Now!
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SmallDetailsCard;
