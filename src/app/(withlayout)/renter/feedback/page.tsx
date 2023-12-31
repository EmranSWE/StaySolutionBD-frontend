"use client";
import ActionBar from "@/components/ui/ActionBar";

import { Button, Divider, Input, message } from "antd";
import Link from "next/link";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import SSTable from "@/components/ui/SSBDTable";
import SSModal from "@/components/ui/SSModal";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import {
  useDeleteFeedbackMutation,
  useMyFeedbackQuery,
} from "@/redux/api/feedbackApi";
import CustomLoading from "@/components/ui/CustomLoading";

const MyReviewPage = () => {
  const query: Record<string, any> = {};
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [ids, setIds] = useState<string>("");

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

  const { data, isLoading, isError, error } = useMyFeedbackQuery(id);
  console.log(data);
  if (isLoading) {
    return <CustomLoading />;
  }

  const meta = data?.meta;

  const columns = [
    {
      title: "rating",
      dataIndex: "rating",
      sorter: true,
    },
    {
      title: "Comments",
      dataIndex: "feedback",
    },

    {
      title: "Action",
      dataIndex: "id",
      render: function (id: any) {
        return (
          <>
            <Link href={`/renter/feedback/edit/${id}`}>
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
                setIds(id);
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

  const DeleteFeedbackHandler = async (ids: string) => {
    try {
      const res = await deleteFeedback(ids);

      if (res) {
        message.success("Feedback Successfully Deleted!");
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
            link: "/profile",
          },
        ]}
      />
      <Divider orientation="center">
        <h1>
          Your <span style={{ color: "#1890ff" }}>Feedback</span> List
        </h1>
      </Divider>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "60%",
            marginBottom: "10px",
          }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/renter/feedback/add-feedback">
            <Button type="primary" style={{ marginRight: "10px" }}>
              Create Issue
            </Button>
          </Link>
          {!!searchTerm && (
            <Button
              style={{ marginRight: "10px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </div>

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
        title="Remove Feedback ⚠️"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => DeleteFeedbackHandler(ids)}
      >
        <p className="my-5">Do you want to remove this feedback?</p>
      </SSModal>
    </div>
  );
};

export default MyReviewPage;
