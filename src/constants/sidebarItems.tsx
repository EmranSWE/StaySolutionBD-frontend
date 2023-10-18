import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
        {
          label: <Link href={`/${role}/update-profile`}>Update Profile</Link>,
          key: `/${role}/update-profile`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-owner`}>Manage Owner</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-owner`,
    },
    {
      label: <Link href={`/${role}/manage-property`}>Manage Property</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-property`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: "Manage academic",
      key: "manage-academic",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/review/reviews`}>Reviews</Link>,
          key: `/${role}/review/reviews`,
        },
      ],
    },
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/payment`}>Payment</Link>,
          key: `/${role}/payment`,
        },

        {
          label: (
            <Link href={`/${role}/semester-registration`}>
              Semester registration
            </Link>
          ),
          key: `/${role}/semester-registration`,
        },
        {
          label: <Link href={`/${role}/offered-course`}>Offered courses</Link>,
          key: `/${role}/offered-course`,
        },
        {
          label: (
            <Link href={`/${role}/offered-course-section`}>
              Course sections
            </Link>
          ),
          key: `/${role}/offered-course-section`,
        },
        {
          label: (
            <Link href={`/${role}/offered-course-schedule`}>
              Course schedules
            </Link>
          ),
          key: `/${role}/offered-course-schedule`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/manage-admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },

    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/department`}>Node</Link>,
          key: `/${role}/node`,
        },
      ],
    },
  ];

  const ownerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Property",
      key: "property",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/property`}>Property</Link>,
          key: `/${role}/property`,
        },
      ],
    },
    {
      label: <Link href={`/${role}/review`}>Manage Review</Link>,
      icon: <TableOutlined />,
      key: `/${role}/review`,
    },
  ];

  const renterSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/review`}>Review Property</Link>,
      icon: <TableOutlined />,
      key: `/${role}/review`,
    },

    {
      label: <Link href={`/${role}/payment`}>Payment</Link>,
      icon: <CreditCardOutlined />,
      key: `/${role}/payment`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.OWNER) return ownerSidebarItems;
  else if (role === USER_ROLE.RENTER) return renterSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
