import { Button, Dropdown, Layout, Row, MenuProps } from "antd";
import { Avatar, Space } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { useMyProfileQuery } from "@/redux/api/authApi";
import { BounceLoader } from "react-spinners";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
const { Header: AntHeader } = Layout;
const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const router = useRouter();
  const { data, isError, isLoading } = useMyProfileQuery({});
  if (isLoading) {
    return (
      <div>
        <BounceLoader color="rgb(24, 144, 255)" size={20} speedMultiplier={5} />
      </div>
    );
  }
  if (isError) {
    return <div>{isError}</div>;
  }
  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };
  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
    {
      key: "1",
      label: (
        <Link href={`/profile/account-profile`}>
          <Button type="text">My Profile</Button>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href={`/profile`}>
          <Button type="text">Dashboard</Button>
        </Link>
      ),
    },
  ];
  const marqueeStyle = {
    overflow: "hidden",
    whiteSpace: "nowrap",
  };

  const antHeaderStyle = {
    backgroundColor: "#001529",
    color: "#fff",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "end",
  };
  const gradientColor = {
    background: "linear-gradient(to right, #ff4500, #ff8c00)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    fontFamily: "Arial, sans-serif",
    padding: "10px",
    fontSize: "16px",
  };
  const adjustedWidth = width <= 800 ? "50px" : "700px";
  return (
    <AntHeader style={antHeaderStyle}>
      {/* <div style={{ ...marqueeStyle, width: adjustedWidth }}>
        <Marquee>
          <h3
            style={gradientColor}
          >{`💚Dear  ${data?.firstName} ${data?.lastName} 💚`}</h3>
          Welcome to your Dashboard. We hope you enjoy your experience. If you
          need any assistance with the dashboard, feel free to contact us at
          mdemranswe@gmail.com or by phone at 01838235450.
        </Marquee>
      </div> */}
      <Row>
        <h3>{`${data?.firstName} ${data?.lastName}`}</h3>

        <Dropdown menu={{ items }}>
          <Space wrap size={16}>
            <Avatar
              size="large"
              src={data?.profilePic}
              icon={<UserOutlined />}
            />
          </Space>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
