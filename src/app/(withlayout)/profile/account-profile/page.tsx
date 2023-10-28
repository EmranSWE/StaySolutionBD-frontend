"use client";
import React from "react";
import { Card, Avatar, List, Divider, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useMyProfileQuery } from "@/redux/api/authApi";

interface ProfileData {
  address: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  preferredAmenities: string[];
  preferredLocation: string;
  preferredPropertyType: string;
  profilePic: string;
  role: string;
}

const AccountProfile = () => {
  const {
    data: profileData,
    isError,
    isLoading,
    isSuccess,
  } = useMyProfileQuery({});

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <Card style={{ width: "90vw", maxWidth: 800 }}>
        <Row gutter={24} justify="center" align="middle">
          <Col xs={24} md={12} style={{ textAlign: "center" }}>
            <Avatar
              size={100}
              src={profileData.profilePic}
              icon={<UserOutlined />}
            />
            <h2>
              {profileData.firstName} {profileData.middleName}{" "}
              {profileData.lastName}
            </h2>
          </Col>
          <Col xs={24} md={12}>
            <List>
              <List.Item>
                <strong>Email:</strong> {profileData.email}
              </List.Item>
              <List.Item>
                <strong>Address:</strong> {profileData.address}
              </List.Item>
              <List.Item>
                <strong>Phone:</strong> {profileData.phone}
              </List.Item>
              <List.Item>
                <strong>Preferred Location:</strong>{" "}
                {profileData.preferredLocation}
              </List.Item>
              <List.Item>
                <strong>Preferred Property Type:</strong>{" "}
                {profileData.preferredPropertyType}
              </List.Item>
              <List.Item>
                <strong>Role:</strong> {profileData.role}
              </List.Item>
            </List>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AccountProfile;
