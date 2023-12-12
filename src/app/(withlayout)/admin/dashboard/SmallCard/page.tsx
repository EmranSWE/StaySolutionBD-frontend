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
  useThisMonthTotalRentsQuery,
  useTotalMonthlyPaymentQuery,
} from "@/redux/api/monthlyPaymentApi";
import {
  useAvailablePropertyQuery,
  useBookedPropertyQuery,
} from "@/redux/api/propertyApi";
import CustomLoading from "@/components/ui/CustomLoading";

const commonCardStyle = {
  borderRadius: 10,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const SmallDetailsCard = () => {
  const { data: totalAmount, isLoading: isLoading1 } =
    useTotalMonthlyPaymentQuery({});
  const { data: available, isLoading: isLoading2 } = useAvailablePropertyQuery(
    {}
  );
  const { data: booked, isLoading: isLoading3 } = useBookedPropertyQuery({});
  const { data: thisMonth, isLoading: isLoading4 } =
    useThisMonthTotalRentsQuery({});

  if (isLoading1 || isLoading2 || isLoading3 || isLoading4) {
    return <CustomLoading />;
  }
  return (
    <div style={{ marginBottom: "5%" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card
            title="Total Revenue"
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
                <DollarOutlined /> {totalAmount}
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
              }}
            >
              Total revenue generated
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card
            title="Available"
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
                {available}
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
              }}
            >
              Total available property
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
                {booked}
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
                {thisMonth}
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
