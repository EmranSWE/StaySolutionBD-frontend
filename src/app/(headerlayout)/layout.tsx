"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
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
  getItem("Homes", "1", undefined, undefined, "/"),
  getItem(
    "Our Apartments",
    "2",
    undefined,
    undefined,
    "/property/all-property"
  ),
  getItem("Marketplace", "3", undefined, undefined, "/marketplace/"),
  getItem("Long term rental", "4", undefined, undefined, "/long-term"),
  getItem("About us", "5", undefined, undefined, "/about-us"),
  getItem("Contact us", "6", undefined, undefined, "/contact-us"),
  getItem("For sell", "sub2", <AppstoreOutlined />, [
    getItem("Studio", "7"),
    getItem("Ready Plot", "8"),
    getItem("Flat", "sub3", null, [getItem("Special Plat", "9")]),
  ]),
];

const HeaderLayoutPage = ({ children }: { children: React.ReactNode }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn());
  const [activeMenuItem, setActiveMenuItem] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("activeMenuItem") || "";
    }
    return "";
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>(staticItems);

  useEffect(() => {
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
      : [getItem("Login", "12", <UserAddOutlined />, undefined, "/login")];

    setMenuItems([...staticItems, ...dynamicItems]);
  }, [isUserLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("activeMenuItem");
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
        <Col xs={2} sm={0} md={2} lg={2} xl={2}>
          <Link href="/">
            <h1>SSBD</h1>
          </Link>
        </Col>

        <Col xs={2} sm={0} md={0} lg={0} xl={0} style={{ textAlign: "left" }}>
          <Dropdown overlay={<Menu items={menuItems} />} trigger={["click"]}>
            <MenuUnfoldOutlined style={{ fontSize: "40px" }} />
          </Dropdown>
        </Col>

        <Col xs={0} sm={24} md={22} lg={22} xl={22}>
          <Menu
            selectedKeys={[activeMenuItem]}
            defaultOpenKeys={["sub1"]}
            mode="horizontal"
            items={menuItems}
            style={{ justifyContent: "flex-end", fontWeight: "bolder" }}
            onClick={({ key }) => {
              localStorage.setItem("activeMenuItem", key.toString());
              setActiveMenuItem(key.toString());
              if (key === "logout") handleLogout();
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
