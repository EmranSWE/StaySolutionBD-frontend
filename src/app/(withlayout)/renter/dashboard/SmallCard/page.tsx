"use client";
import React from "react";
import { Card, Col, Row } from "antd";
import {
  BankTwoTone,
  DollarOutlined,
  HomeTwoTone,
  MoneyCollectTwoTone,
} from "@ant-design/icons";
import {
  useSingleUserMonthlyPaymentQuery,
  useSingleUserTotalPaymentQuery,
} from "@/redux/api/monthlyPaymentApi";

import CustomLoading from "@/components/ui/CustomLoading";
import { useSingleRenterPropertyQuery } from "@/redux/api/propertyApi";
import { getUserInfo } from "@/services/auth.service";

const commonCardStyle = {
  borderRadius: 10,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const SmallDetailsCard = () => {
  const { data: myTotalPayment, isLoading: isLoading2 } =
    useSingleUserTotalPaymentQuery({});
  const { id } = getUserInfo() as { id: String };
  if (!id) {
    console.error("Id not found");
  }
  const { data, isLoading, isError, error } = useSingleRenterPropertyQuery(id);
  const currentFlat = data;

  if (isLoading || isLoading2) {
    return <CustomLoading />;
  }
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
                {/* {currentFlat} */}
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
            title="Booked"
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
                {/* {booked} */}
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
              }}
            >
              Total booked property
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card
            title="This Month"
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
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <BankTwoTone style={{ fontSize: "30px", marginRight: "8px" }} />
              <p
                style={{
                  fontSize: "27px",
                  fontWeight: "bold",
                  color: "white",
                  margin: 0,
                }}
              >
                {/* {thisMonth} */}
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
              }}
            >
              This month revenue
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SmallDetailsCard;
