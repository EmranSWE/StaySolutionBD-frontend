"use client";
import { getUserInfo } from "@/services/auth.service";
import React from "react";

const ProfilePage = () => {
  const { email } = getUserInfo() as { email: string };
  console.log(email);
  return (
    <div>
      <h2>Welcome back to your profile </h2>
      <p>Dear: {email}</p>
    </div>
  );
};

export default ProfilePage;
