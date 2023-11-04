"use client";
import { Divider } from "antd";
import DashboardPage from "./dashboard/page";
import { getUserInfo } from "@/services/auth.service";
import { useMyProfileQuery } from "@/redux/api/authApi";
import { BounceLoader } from "react-spinners";

const AdminPage = () => {
  const { data, isError, isLoading } = useMyProfileQuery({});
  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "end", marginLeft: "20px" }}
      >
        <BounceLoader color="rgb(24, 144, 255)" size={20} speedMultiplier={5} />
      </div>
    );
  }
  if (isError) {
    return <div>{isError}</div>;
  }
  console.log(data);
  return (
    <>
      <p>Dear,{`${data?.firstName} ${data?.lastName}`}</p>
      <Divider orientation="center">
        <h1>
          Welcome to<span style={{ color: "#1890ff" }}> Admin </span>
          Dashboard
        </h1>
      </Divider>
      <DashboardPage />
    </>
  );
};

export default AdminPage;
