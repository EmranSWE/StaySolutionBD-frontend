import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { Divider } from "antd";
import React from "react";

const OwnerIssues = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, hsla(113, 96%, 81%, 1) 0%, hsla(188, 90%, 51%, 1) 100%)",
        minHeight: "100vh",
      }}
    >
      <SSBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "property",
            link: "/admin/manage-property/",
          },
        ]}
      />
      <Divider>
        <h1>Issues Tracker</h1>
      </Divider>
    </div>
  );
};

export default OwnerIssues;
