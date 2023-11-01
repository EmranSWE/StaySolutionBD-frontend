"use client";
import { getUserInfo } from "@/services/auth.service";
import React from "react";
import AdminPage from "../admin/page";

const ProfilePage = () => {
  const { email, role } = getUserInfo() as { email: string; role: string };
  console.log(role);
  return (
    <div>
      <h2>Welcome back to your profile </h2>
      <p>Dear: {email}</p>
      {role === "admin" ? <AdminPage></AdminPage> : ""}
    </div>
  );
};

export default ProfilePage;
