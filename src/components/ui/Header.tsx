import { Button, Dropdown, Layout, Row, MenuProps } from "antd";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { useMyProfileQuery } from "@/redux/api/authApi";
const { Header: AntHeader, Content, Footer } = Layout;
const Header = () => {
  const { data, isError, isLoading, isSuccess } = useMyProfileQuery({});
  console.log(data);
  if (isLoading) {
    return <div>Loading.......</div>;
  }
  const router = useRouter();
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
  ];
  return (
    <AntHeader
      style={{
        backgroundColor: "#fff",
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
