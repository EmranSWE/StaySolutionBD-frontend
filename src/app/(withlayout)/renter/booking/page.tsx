"use client";
import ActionBar from "@/components/ui/ActionBar";

import { Button, Divider, Input, message } from "antd";
import Link from "next/link";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";

import dayjs from "dayjs";
import SSTable from "@/components/ui/SSBDTable";
import SSModal from "@/components/ui/SSModal";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import {
  useBookingsQuery,
  useDeleteBookingMutation,
  useSingleUserBookingQuery,
} from "@/redux/api/bookingApi";
import CustomLoading from "@/components/ui/CustomLoading";

const PropertyBookingPage = () => {
  const query: Record<string, any> = {};
  const [deleteBooking] = useDeleteBookingMutation();
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

  const { data, isLoading, isError, error, refetch } =
    useSingleUserBookingQuery({});

  if (isLoading) {
    return <CustomLoading />;
  }
  if (isError) {
    console.error("Error fetching property data:", error);
  }

  const meta = data?.meta;

  const columns = [
    {
      title: "Flat No",
      dataIndex: "property",
      render: function (data: any) {
        return `${data.flatNo}`;
      },
      sorter: true,
    },
    {
      title: "Monthly Rent",
      dataIndex: "property",
      render: function (data: any) {
        return `${data?.monthlyRent}`;
      },
      sorter: true,
    },
    {
      title: "Booking Status",
      dataIndex: "bookingStatus",
    },
    {
      title: "Special Request",
      dataIndex: "specialRequest",
    },

    {
      title: "Booking Start",
      dataIndex: "bookingStartDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
      width: 150,
    },
    {
      title: "Booking End",
      dataIndex: "bookingEndDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Updated Booking",
      dataIndex: "updatedAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (id: any, record: any) {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setPropertyId(id);
              }}
              danger
              style={{ marginLeft: "3px" }}
            >
              <DeleteOutlined />
            </Button>

            {record.bookingStatus === "Pending" && (
              <Link href={`/renter/payment/${id}`}>
                <Button
                  style={{
                    margin: "0px 5px",
                  }}
                  onClick={() => ""}
                  type="primary"
                >
                  <PayCircleOutlined />
                </Button>
              </Link>
            )}
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
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

  const deleteBookingHandler = async (id: string) => {
    try {
      const res = await deleteBooking(id);
      console.log("deleted response", res);
      //@ts-ignore
      if (res?.data.success === true) {
        message.success("Booking Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #ff6e7f, #bfe9cf)",
        height: "100vh",
      }}
    >
      <SSBreadCrumb
        items={[
          {
            label: "renter",
            link: "/renter",
          },
        ]}
      />

      <Divider orientation="center">
        <h1>
          My <span style={{ color: "#1890ff" }}>All</span> Booking
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
        title="Remove Booking"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteBookingHandler(propertyId)}
      >
        <p className="my-5">Do you want to delete the property?</p>
      </SSModal>
    </div>
  );
};

export default PropertyBookingPage;
