"use client";

import { Layout } from "antd";
import SSBreadCrumb from "./SSBreadCrumb";
const { Content } = Layout;
const Contents = ({ children }: { children: React.ReactNode }) => {
  const base = "admin";
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <SSBreadCrumb
        items={[
          {
            label: `${base}`,
            link: `/${base}`,
          },
          {
            label: `owner`,
            link: `/${base}/owner`,
          },
        ]}
      />
      {children}
    </Content>
  );
};

export default Contents;
