import { Button, Dropdown, Layout, Row, MenuProps } from "antd";
import { Avatar, Space } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { useMyProfileQuery } from "@/redux/api/authApi";
import { BounceLoader } from "react-spinners";
import Link from "next/link";
const { Header: AntHeader } = Layout;
const Header = () => {
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
  return (
    <AntHeader
      style={{
        backgroundColor: "#001529",
        color: "#fff",
      }}
    >
      <Row justify="end" align="middle" style={{ height: "100%" }}>
        <p>{`${data?.firstName} ${data?.lastName}`}</p>
        <Dropdown menu={{ items }}>
          <a>
            <Space wrap size={16}>
              <Avatar
                size="large"
                src={data?.profilePic}
                icon={<UserOutlined />}
              />
            </Space>
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
