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
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(90deg, hsla(113, 96%, 81%, 1) 0%, hsla(188, 90%, 51%, 1) 100%)",
          padding: "20px",
          minHeight: "100vh",
        }}
      >
        <h3>
          Dear, {`${data?.firstName} ${data?.lastName}`}{" "}
          <span
            style={{
              display: "inline-block",
              animation: "shake 2s ease-in-out infinite",
            }}
          >
            👋
          </span>
        </h3>
        <Divider orientation="center">
          <h1 style={{ color: "white" }}>
            Welcome to <br /> <span style={{ color: "#1890ff" }}> Admin </span>
            Dashboard
          </h1>
        </Divider>
        <DashboardPage />
      </div>
    </>
  );
};

export default AdminPage;
