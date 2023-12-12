"use client";
import ActionBar from "@/components/ui/ActionBar";

import { Divider, message } from "antd";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import SSTable from "@/components/ui/SSBDTable";
import SSModal from "@/components/ui/SSModal";
import { useDeletePropertyMutation } from "@/redux/api/propertyApi";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";

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

      render: (status: string) => {
        return (
          <span
            style={{
              backgroundColor: status ? "green" : "inherit",
              fontSize: status ? "15px" : "",
              fontWeight: status ? "bolder" : "",
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
    },
    ...monthColumns,
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

  const deletePropertyHandler = async (id: string) => {
    try {
      const res = await deleteProperty(id);
      if (res) {
        message.success("Property Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, hsla(113, 96%, 81%, 1) 0%, hsla(188, 90%, 51%, 1) 100%)",
        minHeight: "100vh",
      }}
    >
      <SSBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
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
