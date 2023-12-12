"use client";
import { getUserInfo } from "@/services/auth.service";
import React from "react";
import AdminPage from "../admin/page";

const ProfilePage = () => {
  const { email, role } = getUserInfo() as { email: string; role: string };

  return (
    <div>
      {role === "admin" || role === "super_admin" ? (
        <AdminPage></AdminPage>
      ) : (
        <div>
          <h2>Welcome back to your profile </h2>
          <p>You are "{email}"</p>
          {/* Render your dashboard page here */}
          {/* <DashboardPage /> */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
