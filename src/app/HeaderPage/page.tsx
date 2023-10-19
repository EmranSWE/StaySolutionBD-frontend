"use client";
import React from "react";
import {
  HomeOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown, Row, Col, MenuProps } from "antd";
import Link from "next/link";
import { isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  href?: any
): MenuItem {
  return {
    key,
    icon,
    label: href ? <Link href={href}>{label}</Link> : label,
    children,
  } as MenuItem;
}

const userLoggedIn = isLoggedIn();

const items: MenuItem[] = [
  getItem("Home", "1", <HomeOutlined />, [], "/"),
  getItem(
    "Our Apartments",
    "2",
    undefined,
    undefined,
    "/property/all-property"
  ),
  getItem("Long term rental", "3", undefined, undefined, "/long-term-rental"),
  getItem("About us", "4", undefined, undefined, "/about-us"),
  getItem("Contact us", "5", undefined, undefined, "/contact-us"),
  getItem("For sell", "sub2", <AppstoreOutlined />, [
    getItem("Studio", "9"),
    getItem("Ready Plot", "10"),
    getItem("Flat", "sub3", null, [getItem("Special Plat", "11")]),
  ]),
  ...(!userLoggedIn
    ? [getItem("Login", "12", <UserAddOutlined />, undefined, "/login")]
    : []),
  ...(userLoggedIn ? [getItem("Logout", "13", <LogoutOutlined />)] : []),
];

const handleLogout = () => {
  removeUserInfo(authKey);
};

const HeaderPage: React.FC = () => {
  return (
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
        <Dropdown overlay={<Menu items={items} />}>
          <MenuUnfoldOutlined style={{ fontSize: "20px" }} />
        </Dropdown>
      </Col>

      <Col xs={0} sm={24} md={22} lg={22} xl={22}>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="horizontal"
          items={items}
          style={{ justifyContent: "flex-end" }}
          onClick={({ key }) => {
            if (key === "13") handleLogout();
          }}
        />
      </Col>
    </Row>
  );
};

export default HeaderPage;
