"use client";
import { getUserInfo } from "@/services/auth.service";
import React from "react";
import AdminPage from "../admin/page";
import UserDashboard from "../renter/dashboard/page";
import OwnerDashboard from "../owner/dashboard/page";

const ProfilePage = () => {
  const { email, role } = getUserInfo() as { email: string; role: string };

  return (
    <div>
      {role === "admin" || role === "super_admin" ? (
        <AdminPage />
      ) : role === "owner" ? (
        <OwnerDashboard />
      ) : role === "renter" ? (
        <UserDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
};

export default ProfilePage;
