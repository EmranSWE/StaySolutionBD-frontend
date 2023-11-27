"use client";
import { Col, Divider, Row, Typography } from "antd";
import Image from "next/image";
import React from "react";
import sheikhHome from "../../../../assets/sheikhHome.png";
import styles from "./ComponentName.module.css";
const OurMissionPage = () => {
  return (
    <div style={{ position: "relative" }}>
      <Divider orientation="center">
        <h1>
          Our <span style={{ color: "#1890ff" }}>Mission</span>
        </h1>
      </Divider>
      <div className={styles.backgroundDroplet}></div>
      <Row
        className="rowContent"
        gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Col
          xs={24}
          sm={24}
          md={10}
          lg={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src={sheikhHome}
            alt="Large Image"
            style={{
              width: "80%",
              height: "80%",
            }}
            className={styles.rotatingImage}
          />
        </Col>

        <Col xs={24} sm={24} md={14} lg={10}>
          <div className={styles.missionContainer}>
            <Typography.Title level={1}>Stay Solution BD</Typography.Title>
            <Typography.Paragraph className={styles.intro}>
              At <span className={styles.highlight}>StaySolutionBD</span>,
              nestled in the heart of{" "}
              <span className={styles.highlight}>
                Arshinagar, Mohammadpur, Dhaka
              </span>
              , Bangladesh, we are not just another home rental platform.
            </Typography.Paragraph>
            <Typography.Paragraph>
              Our mission is twofold:
              <ul>
                <li>
                  For our cherished{" "}
                  <span className={styles.highlight}>renters</span>: Presenting
                  top-notch, quality properties that you can proudly call home.
                </li>
                <li>
                  For our esteemed{" "}
                  <span className={styles.highlight}>property owners</span>:
                  Ensuring that you find reliable renters in the shortest
                  possible time.
                </li>
              </ul>
            </Typography.Paragraph>
            <Typography.Paragraph>
              We understand that a home is more than just bricks and mortar.
              It's where memories are made. It's where life happens. Join us in
              our journey to redefine the home rental experience in Bangladesh.
            </Typography.Paragraph>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OurMissionPage;
