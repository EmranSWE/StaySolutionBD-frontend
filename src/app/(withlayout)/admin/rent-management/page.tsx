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
} from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";

import dayjs from "dayjs";
import SSTable from "@/components/ui/SSBDTable";
import SSModal from "@/components/ui/SSModal";
import { useDeletePropertyMutation } from "@/redux/api/propertyApi";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { useUsersQuery } from "@/redux/api/authApi";
import { useMonthlyPaymentsQuery } from "@/redux/api/monthlyPaymentApi";
import CustomLoading from "@/components/ui/CustomLoading";

interface PaymentData {
  flatNo: string;
  [key: string]: string;
}
const RentManagement = () => {
  const query: Record<string, any> = {};
  const [deleteProperty] = useDeletePropertyMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(50);
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
  const { data, isLoading } = useMonthlyPaymentsQuery({ ...query });

  if (isLoading) {
    return <CustomLoading />;
  }

  const meta = data?.meta;
  const transformData = (data: any[]): PaymentData[] => {
    const transformed: Record<string, PaymentData> = {};

    data?.forEach((entry) => {
      const monthName = new Date(0, entry.month - 1).toLocaleString("default", {
        month: "long",
      });

      if (!transformed[entry.property.flatNo]) {
        transformed[entry.property.flatNo] = {
          flatNo: entry.property.flatNo,
        };
      }

      transformed[entry.property.flatNo][monthName] = entry.status;
    });

    return Object.values(transformed);
  };

  const transformedDataSource: PaymentData[] = transformData(data);

  // Dynamic columns generation
  const monthColumns = Array.from({ length: 12 }).map((_, index) => {
    const monthName = new Date(0, index).toLocaleString("default", {
      month: "long",
    });
    return {
      title: monthName,
      dataIndex: monthName,
      sorter: true,
      render: (status: string) => {
        return (
          <span
            style={{
              backgroundColor: status ? "green" : "inherit",
              fontSize: status ? "15px" : "",
              fontWeight: status ? "bolder" : "", // Example font size
              color: status ? "white" : "black",
            }}
          >
            {status || "Not Available"}
          </span>
        );
      },
    };
  });

  const columns = [
    {
      title: "Flat No",
      dataIndex: "flatNo",
      sorter: true,
    },
    ...monthColumns,

    {
      title: "Action",
      dataIndex: "id",
      render: function (propertyId: any) {
        return (
          <>
            <Link href={`/admin/manage-property/edit/${propertyId}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setPropertyId(propertyId);
              }}
              danger
              style={{ marginLeft: "3px" }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
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
            label: "admin",
            link: "/admin",
          },
        ]}
      />
      <Divider orientation="center">
        <h1>
          Payment<span style={{ color: "#1890ff" }}> Information</span>
        </h1>
      </Divider>

      <SSTable
        loading={isLoading}
        columns={columns}
        dataSource={transformedDataSource}
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
        <p className="my-5">Do you want to remove this admin?</p>
      </SSModal>
    </div>
  );
};

export default RentManagement;
