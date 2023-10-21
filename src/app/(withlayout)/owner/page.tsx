"use client";
import { getUserInfo } from "@/services/auth.service";
import React from "react";

const Owner = () => {
  const { role } = getUserInfo() as { role: string };

  return (
    <div>
      <h1>This is owner page</h1>
    </div>
  );
};

export default Owner;
