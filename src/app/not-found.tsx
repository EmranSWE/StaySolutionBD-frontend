import React from "react";
import notFound from "../assets/notFound.svg";
import Image from "next/image";
import { Row, Col } from "antd";

const NotFound = () => {
  return (
    <Row justify="center" align="middle" style={styles.container}>
      <Col span={12} style={styles.imageWrapper as React.CSSProperties}>
        <Image src={notFound} alt="not found" layout="responsive" />
      </Col>
    </Row>
  );
};

const styles = {
  container: {
    height: "50vh",
  },
  imageWrapper: {
    width: "100%", // Using 100% as the Col component will handle the width based on the span.
    position: "relative", // needed for the 'responsive' layout of Next.js Image
  },
};

export default NotFound;
