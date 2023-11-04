"use client";
import React, { useEffect, useState } from "react";
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
import RentalFooter from "./homepage/Footer/page";

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

const staticItems: MenuItem[] = [
  getItem("Home", "1", <HomeOutlined />, [], "/"),
  getItem(
    "Our Apartments",
    "2",
    undefined,
    undefined,
    "/property/all-property"
  ),
  getItem("Marketplace", "15", undefined, undefined, "/marketplace/"),
  getItem("Long term rental", "3", undefined, undefined, "/long-term"),
  getItem("About us", "4", undefined, undefined, "/about-us"),
  getItem("Contact us", "5", undefined, undefined, "/contact-us"),
  getItem("For sell", "sub2", <AppstoreOutlined />, [
    getItem("Studio", "9"),
    getItem("Ready Plot", "10"),
    getItem("Flat", "sub3", null, [getItem("Special Plat", "11")]),
  ]),
];

const HeaderLayoutPage = ({ children }: { children: React.ReactNode }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn());
  const [menuItems, setMenuItems] = useState<MenuItem[]>(staticItems);

  useEffect(() => {
    // No dependencies array, so it runs on every render
    const userLoggedIn = isLoggedIn();
    let dynamicItems: MenuItem[] = userLoggedIn
      ? [
          getItem("My Profile", "14", undefined, [], "/profile"),
          {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Logout",
            onClick: () => handleLogout(),
          },
        ]
      : [getItem("Login", "12", <UserAddOutlined />, [], "/login")];

    setMenuItems([...staticItems, ...dynamicItems]);
  }, [isUserLoggedIn]);
  const handleLogout = () => {
    removeUserInfo(authKey);
    setIsUserLoggedIn(false);
  };

  return (
    <>
      <Row
        align="middle"
        justify="space-between"
        gutter={16}
        style={{ padding: "16px 16px", display: "flex", margin: "10px 10px" }} // Added margin
      >
        {/* Logo for all devices */}
        <Col xs={2} sm={0} md={2} lg={2} xl={2}>
          <Link href="/">
            <h1>SSBD</h1>
          </Link>
        </Col>

        {/* Dropdown menu icon for mobile devices */}
        <Col xs={2} sm={0} md={0} lg={0} xl={0} style={{ textAlign: "left" }}>
          <Dropdown overlay={<Menu items={menuItems} />} trigger={["click"]}>
            <MenuUnfoldOutlined style={{ fontSize: "40px" }} />
          </Dropdown>
        </Col>

        <Col xs={0} sm={24} md={22} lg={22} xl={22}>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="horizontal"
            items={menuItems}
            style={{ justifyContent: "flex-end", fontWeight: "bolder" }}
            onClick={({ key }) => {
              if (key === "13") handleLogout();
            }}
          />
        </Col>
      </Row>
      {children}
      <RentalFooter></RentalFooter>
    </>
  );
};

export default HeaderLayoutPage;
