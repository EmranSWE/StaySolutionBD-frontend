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
  useSingleOwnerTotalEarnQuery,
  useSingleOwnerTotalPropertiesQuery,
  useSingleUserMonthlyPaymentQuery,
} from "@/redux/api/monthlyPaymentApi";

import CustomLoading from "@/components/ui/CustomLoading";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const commonCardStyle = {
  borderRadius: 10,
  width: "90%",
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
  const { data: myTotalEarn, isLoading: isLoading2 } =
    useSingleOwnerTotalEarnQuery(id);
  const { data, isLoading, isError, error } =
    useSingleOwnerTotalPropertiesQuery(id);
  if (isLoading || isLoading2) {
    return <CustomLoading />;
  }

  return (
    <div style={{ marginBottom: "5%" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card
            title="Total Earning"
            //@ts-ignore

            style={{
              ...commonCardStyle,
              background: "linear-gradient(45deg, #4CAF50, #434242)",
            }}
          >
            {typeof myTotalEarn === "number" ? (
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
                  <DollarOutlined /> {myTotalEarn}
                </p>
              </div>
            ) : (
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.8)",
                  textAlign: "center",
                }}
              >
                Add Property to earn Money.
              </p>
            )}

            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
              }}
            >
              My total earn money
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card
            title="My All Apartment"
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
                {data?.totalFlat}
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
              }}
            >
              My total Apartment
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card
            title="Total Booked"
            //@ts-ignore

            style={{
              ...commonCardStyle,
              background: "linear-gradient(45deg,#e32323, #bcad34)",
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
                {data?.totalBooked}
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
              }}
            >
              Already booked apartment
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card
            title="Available"
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
              <HomeTwoTone style={{ fontSize: "30px", marginRight: "8px" }} />
              <p
                style={{
                  fontSize: "27px",
                  fontWeight: "bold",
                  color: "white",
                  margin: 0,
                }}
              >
                {data?.totalAvailable}
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
              }}
            >
              Currently available apartment
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SmallDetailsCard;
