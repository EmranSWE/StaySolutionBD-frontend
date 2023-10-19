"use client";
import React, { useState } from "react";
import {
  HomeOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  UserAddOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu, Dropdown, Row, Col, MenuProps } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  href?: any,
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    label: href ? <Link href={href}>{label}</Link> : label,
    children,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Home", "1", <HomeOutlined />, [], "/"),
  getItem("Our Apartments", "2", "", undefined, "/property/all-property"),
  getItem("Long term rental", "3", "", undefined, "/long-term-rental"),
  getItem("About us", "4", "", undefined, "/about-us"),
  getItem("Contact us", "5", "", undefined, "/contact-us"),

  getItem("For sell", "sub2", <AppstoreOutlined />, [
    getItem("Studio", "9"),
    getItem("Ready Plot", "10"),
    getItem("Flat", "sub3", null, [getItem("Special Plat", "11")]),
  ]),
  getItem(
    "Sign Up / Register",
    "12",
    <UserAddOutlined />,
    undefined,
    "/signup"
  ),
];

const HeaderPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const mobileMenu = (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="vertical"
      theme="dark"
      items={items}
    />
  );

  return (
    <div>
      <Row
        align="middle"
        justify="space-between"
        gutter={16}
        style={{ padding: "0 16px", display: "flex" }}
      >
        {/* Logo for larger devices */}
        <Col xs={0} sm={0} md={2} lg={2} xl={2}>
          <h1>SSBD</h1>
        </Col>

        {/* Dropdown menu icon for mobile devices */}
        <Col xs={4} sm={0} md={0} lg={0} xl={0}>
          <Dropdown overlay={mobileMenu} trigger={["click"]}>
            <MenuUnfoldOutlined style={{ fontSize: "20px" }} />
          </Dropdown>
        </Col>

        {/* Horizontal menu for larger devices */}
        <Col xs={0} sm={24} md={22} lg={22} xl={22}>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="horizontal"
            items={items}
            style={{ justifyContent: "flex-end" }} // This ensures menu items are aligned to the right
          />
        </Col>
      </Row>
    </div>
  );
};

export default HeaderPage;
