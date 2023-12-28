"use client";
import Loading from "@/app/loading";
import CustomLoading from "@/components/ui/CustomLoading";
import FeedbackCard from "@/components/ui/FeedbackCard";
import { useFeedbacksQuery } from "@/redux/api/feedbackApi";
import { Col, Divider, Row } from "antd";
import React from "react";

const FeedbackPage = () => {
  const { data, isLoading, isError } = useFeedbacksQuery({});
  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }
  if (isError) {
    return <div>message.error</div>;
  }
  return (
    <div>
      <div style={{ padding: "20px" }}>
        <Divider>
          <h1>
            <span style={{ color: "#1890ff" }}>Feedback </span> Us
          </h1>
        </Divider>

        <Row gutter={16}>
          {[...data]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((feedbackData: any) => (
              <Col xs={24} sm={24} md={8} lg={8} xl={6} key={feedbackData.id}>
                <FeedbackCard feedbackData={feedbackData} />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default FeedbackPage;
