import React from "react";
import { Row, Space, Spin } from "antd";

const Loading: React.FC = () => {
  return (
    <Row>
      <Space>
        <Spin tip="Loading" size="large"></Spin>
      </Space>
    </Row>
  );
};

export default Loading;
