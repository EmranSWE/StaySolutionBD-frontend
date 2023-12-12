"use client";
import { getUserInfo } from "@/services/auth.service";
import React from "react";
import AdminPage from "../admin/page";
import UserDashboard from "../renter/dashboard/page";

const ProfilePage = () => {
  const { email, role } = getUserInfo() as { email: string; role: string };

  return (
    <div>
      {role === "admin" || role === "super_admin" ? (
        <AdminPage></AdminPage>
      ) : (
        <div>
          <UserDashboard />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
