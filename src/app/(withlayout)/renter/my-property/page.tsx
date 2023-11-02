"use client";
import ActionBar from "@/components/ui/ActionBar";

import { Button, Divider, Input, message } from "antd";
import Link from "next/link";
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";

import dayjs from "dayjs";
import SSTable from "@/components/ui/SSBDTable";
import SSModal from "@/components/ui/SSModal";
import {
  useDeletePropertyMutation,
  usePropertiesQuery,
  useSingleRenterPropertyQuery,
  useSingleUserPropertyQuery,
} from "@/redux/api/propertyApi";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import CustomLoading from "@/components/ui/CustomLoading";

const MyPropertyPage = () => {
  const query: Record<string, any> = {};
  const [deleteProperty] = useDeletePropertyMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [propertyId, setPropertyId] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { id } = getUserInfo() as { id: String };
  if (!id) {
    console.error("User ID not found");
  }

  const { data, isLoading, isError, error } = useSingleRenterPropertyQuery(id);
  console.log(data);
  if (isError) {
    console.error("Error fetching property data:", error);
  }
  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }

  const meta = data?.meta;
  const columns = [
    {
      title: "Pay Now!",
      dataIndex: "id",
      render: function (propertyId: any) {
        return (
          <>
            <div>
              <Link href={`/renter/payment/${propertyId}`}>
                <Button
                  style={{
                    margin: "0px 10px",
                    backgroundColor: "green",
                  }}
                  onClick={() => ""}
                  type="primary"
                >
                  <PayCircleOutlined />
                </Button>
              </Link>
            </div>
          </>
        );
      },
    },
    {
      title: "Flat No",
      dataIndex: "flatNo",
    },
    {
      title: "Property Status",
      dataIndex: "propertyStatus",
    },
    {
      title: "Monthly Rent",
      dataIndex: "monthlyRent",
    },
    {
      title: "Title",
      dataIndex: "title",
      render: function (title: any) {
        return `${title.substring(0, 20)}...`;
      },
    },

    {
      title: "Locations",
      dataIndex: "location",
      render: function (location: any) {
        return `${location.substring(0, 16)}...`;
      },
    },

    {
      title: "Size",
      dataIndex: "size",
    },

    {
      title: "No. Rooms",
      dataIndex: "numberOfRooms",
    },
    {
      title: "City",
      dataIndex: "city",
      render: function (city: string[]) {
        return <>{city.join(", ")}</>;
      },
    },

    {
      title: "Size of FLat",
      dataIndex: "size",
    },

    {
      title: "Booking Start",
      dataIndex: "bookings",
      render: function (data: any) {
        const startAt = data[0]?.bookingStartDate;
        console.log(startAt);
        return startAt && dayjs(startAt).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const deletePropertyHandler = async (id: string) => {
    console.log(id);
    try {
      const res = await deleteProperty(id);
      console.log("response", res);
      if (res) {
        message.success("Property Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <SSBreadCrumb
        items={[
          {
            label: "owner",
            link: "/owner",
          },
        ]}
      />
      <Divider orientation="center">
        <h1>
          My All <span style={{ color: "#1890ff" }}>Property</span>
        </h1>
      </Divider>
      <SSTable
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <SSModal
        title="Remove property"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deletePropertyHandler(propertyId)}
      >
        <p className="my-5">Do you want to remove this property?</p>
      </SSModal>
    </div>
  );
};

export default MyPropertyPage;
