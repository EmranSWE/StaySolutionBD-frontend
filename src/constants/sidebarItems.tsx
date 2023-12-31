import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  CreditCardOutlined,
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
          label: <Link href={`/profile/account-profile`}>Account Profile</Link>,
          key: `/profile/account-profile`,
        },
        {
          label: <Link href={`/profile/change-password`}>Change Password</Link>,
          key: `/profile/change-password`,
        },
        {
          label: <Link href={`/profile/update-profile`}>Update Profile</Link>,
          key: `/profile/update-profile`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/rent-management`}>Rent Management</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/rent-management`,
    },
    {
      label: <Link href={`/${role}/manage-user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-user`,
    },
    {
      label: <Link href={`/${role}/manage-property`}>Manage Property</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-property`,
    },
    {
      label: <Link href={`/${role}/contact-us`}>Contact Us Information</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/contact-us`,
    },
    {
      label: <Link href={`/${role}/user-feedback`}>Feedback Us </Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/user-feedback`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,

    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/issues`}>Issues</Link>,
          key: `/${role}/issues`,
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
      label: <Link href={`/${role}/create-admin`}>Create Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/create-admin`,
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
          label: <Link href={`/${role}/my-property`}>My Property</Link>,
          key: `/${role}/my-property`,
        },
        {
          label: <Link href={`/${role}/create-property`}>Add Property</Link>,
          key: `/${role}/create-property`,
        },
        {
          label: (
            <Link href={`/${role}/property-insurance`}>
              {" "}
              Property Insurance
            </Link>
          ),
          key: `/${role}/property-insurance`,
        },
        {
          label: (
            <Link href={`/${role}/property-booking`}> Property Booking</Link>
          ),
          key: `/${role}/property-booking`,
        },
        {
          label: <Link href={`/${role}/safety`}>Safety Management</Link>,

          key: `/${role}/safety`,
        },
      ],
    },

    {
      label: "Marketplace",
      key: "marketplace",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: (
            <Link href={`/${role}/marketplace`}>My Marketplace Property</Link>
          ),
          key: `/${role}/marketplace`,
        },
        {
          label: (
            <Link href={`/${role}/marketplace/add-to-marketplace`}>
              Add To Marketplace
            </Link>
          ),
          key: `/${role}/marketplace/add-to-marketplace`,
        },
      ],
    },
    {
      label: <Link href={`/${role}/review`}>Manage Review</Link>,
      icon: <TableOutlined />,
      key: `/${role}/review`,
    },
    {
      label: <Link href={`/${role}/issues`}>Manage Issues</Link>,
      icon: <TableOutlined />,
      key: `/${role}/issues`,
    },

    {
      label: <Link href={`/${role}/message`}>Check Message</Link>,
      icon: <TableOutlined />,
      key: `/${role}/message`,
    },
    {
      label: <Link href={`/${role}/notification`}> Notification</Link>,
      icon: <TableOutlined />,
      key: `/${role}/notification`,
    },
    {
      label: <Link href={`/${role}/feedback`}> Feedback</Link>,
      icon: <CreditCardOutlined />,
      key: `/${role}/feedback`,
    },
  ];

  const renterSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Property",
      key: "property",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/my-property`}>My Property</Link>,
          key: `/${role}/my-property`,
        },
        {
          label: <Link href={`/${role}/my-wishlist`}>Property Wishlist</Link>,
          key: `/${role}/my-wishlist`,
        },
        {
          label: <Link href={`/${role}/my-voucher`}> My Voucher</Link>,
          key: `/${role}/property-voucher`,
        },
        {
          label: <Link href={`/${role}/insurance`}> My Insurance</Link>,
          key: `/${role}/property-insurance`,
        },
      ],
    },
    {
      label: <Link href={`/${role}/review`}>Review Property</Link>,
      icon: <TableOutlined />,
      key: `/${role}/review`,
    },
    {
      label: <Link href={`/${role}/booking`}>Booking Property</Link>,
      icon: <TableOutlined />,
      key: `/${role}/booking`,
    },
    {
      label: <Link href={`/${role}/payment`}>Payment</Link>,
      icon: <CreditCardOutlined />,
      key: `/${role}/payment`,
    },
    {
      label: <Link href={`/${role}/issues`}>Issues</Link>,
      icon: <CreditCardOutlined />,
      key: `/${role}/issues`,
    },
    {
      label: <Link href={`/${role}/notification`}>Notification</Link>,
      icon: <CreditCardOutlined />,
      key: `/${role}/notification`,
    },
    {
      label: <Link href={`/${role}/feedback`}> Feedback</Link>,
      icon: <CreditCardOutlined />,
      key: `/${role}/feedback`,
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
