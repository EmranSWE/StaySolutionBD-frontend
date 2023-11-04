"use client";
import { Divider } from "antd";
import DashboardPage from "./dashboard/page";

const AdminPage = () => {
  return (
    <>
      <Divider orientation="center">Welcome to Admin Dashboard</Divider>
      <DashboardPage />
    </>
  );
};

export default AdminPage;
