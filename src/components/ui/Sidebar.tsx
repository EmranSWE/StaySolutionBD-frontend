"use client";
import { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { role } = getUserInfo() as any;

  return (
    <div>
      {isMobile && !collapsed && (
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setCollapsed(true)}
          style={{
            position: "fixed",
            zIndex: 2,
            top: "1rem",
            left: "1rem",
          }}
        />
      )}

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={280}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setIsMobile(broken);
          setCollapsed(broken);
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          <Link href="/" style={{ color: "white" }}>
            SSBD
          </Link>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems(role)}
        />
      </Sider>
    </div>
  );
};

export default SideBar;
