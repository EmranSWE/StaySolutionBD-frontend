"use client";
import React from "react";
import { Avatar, Divider, Card, List, Rate, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./Feedbackpage.module.css";
const dummyFeedback = [
  {
    id: 1,
    name: "John Doe",
    feedback: "The experience was seamless and easy!",
    rating: 5,
    avatar:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png", // Replace with the actual link or path to your avatar
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback: "I found the perfect place thanks to Stay Solution.",
    rating: 4,
    avatar:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png", // Replace with the actual link or path to your avatar
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback: "I found the perfect place thanks to Stay Solution.",
    rating: 4,
    avatar:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png", // Replace with the actual link or path to your avatar
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback: "I found the perfect place thanks to Stay Solution.",
    rating: 4,
    avatar:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png", // Replace with the actual link or path to your avatar
  },
];

const FeedbackCard = ({ feedbackData }: any) => {
  const { name, feedback, rating, avatar } = feedbackData;
  return (
    <div className={styles.cardContainer}>
      <div className={styles.avatarBackground}>
        <div className={styles.avatarSection}>
          <Avatar size={64} icon={<UserOutlined />} src={avatar} alt={name} />
        </div>
      </div>
      <div className={styles.contentSection}>
        <h3 className={styles.userName}>{name}</h3>
        <Rate disabled value={rating} />
        <p className={styles.feedbackText}>{feedback}</p>
      </div>
    </div>
  );
};

const FeedbackPage = () => {
  return (
    <div>
      <div style={{ padding: "20px" }}>
        <Divider>
          <h1>
            <span style={{ color: "#1890ff" }}>Feedback </span> page
          </h1>
          <p>
            Your feedback <span style={{ color: "#1890ff" }}>helps us</span>{" "}
            improve and <br /> provide a better experience for everyone.
          </p>
        </Divider>

        <Row gutter={16}>
          {dummyFeedback.map((item) => (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
              <FeedbackCard feedbackData={item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FeedbackPage;
