import { Divider } from "antd";
import React from "react";

const OwnerIssues = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #ff6e7f, #bfe9cf)",
        height: "100vh",
      }}
    >
      <Divider orientation="center">
        <h1>
          My <span style={{ color: "#1890ff" }}>Issues </span>List
        </h1>
      </Divider>
    </div>
  );
};

export default OwnerIssues;
