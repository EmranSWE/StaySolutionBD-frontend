"use client";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import React from "react";

const ManageOwner = () => {
  const { role } = getUserInfo() as any;
  return (
    <div>
      <SSBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
        ]}
      />
      <h1>Manage Owner</h1>
    </div>
  );
};

export default ManageOwner;
