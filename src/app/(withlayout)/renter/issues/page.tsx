"use client";
import ActionBar from "@/components/ui/ActionBar";

import { Button, Input, message } from "antd";
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
import { getUserInfo } from "@/services/auth.service";
import { useReviewsQuery } from "@/redux/api/reviewApi";
import { useIssuesQuery } from "@/redux/api/issueApi";

const PropertyIssuePage = () => {
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
    // Handle the error as required, maybe redirect the user or show an error message
  }

  const { data, isLoading, isError, error } = useIssuesQuery({ ...query });
  if (isError) {
    console.error("Error fetching property data:", error);
    // Handle the error as needed
  }

  const meta = data?.meta;

  const columns = [
    {
      title: "Issue Status",
      dataIndex: "issueStatus",
    },
    {
      title: "Priority",
      dataIndex: "priorityLevel",
    },

    {
      title: "Description",
      dataIndex: "issueDescription",
    },

    {
      title: "Action",
      dataIndex: "id",
      render: function (propertyId: any) {
        return (
          <>
            <Link href={`/renter/manage-property/edit/${propertyId}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => ""}
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
    <div>
      <SSBreadCrumb
        items={[
          {
            label: "renter",
            link: "/renter",
          },
        ]}
      />
      <ActionBar title="Issue List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "60%",
          }}
        />
        <div>
          <Link href="/renter/issues/add-issue">
            <Button type="primary">Create Issue</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

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
        <p className="my-5">Do you want to remove this admin?</p>
      </SSModal>
    </div>
  );
};

export default PropertyIssuePage;
