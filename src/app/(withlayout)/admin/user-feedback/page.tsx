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
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { useUsersQuery } from "@/redux/api/authApi";
import { useFeedbacksQuery } from "@/redux/api/feedbackApi";

const ManageFeedbackPage = () => {
  const query: Record<string, any> = {};
  //   const [deleteProperty] = useDeletePropertyMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [propertyId, setPropertyId] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useFeedbacksQuery({ ...query });
  const meta = data?.meta;

  const columns = [
    {
      title: "Name",
      dataIndex: "user",
      render: function (data: any) {
        return `${data?.firstName} ${data?.lastName}`;
      },
    },
    {
      title: "Email",
      dataIndex: "user",
      render: function (data: any) {
        return `${data?.email}`;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      sorter: true,
    },

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
                setPropertyId(propertyId); // Corrected this line
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

  //   const deletePropertyHandler = async (id: string) => {
  //     console.log(id);
  //     try {
  //       const res = await deleteProperty(id);
  //       console.log("response", res);
  //       if (res) {
  //         message.success("Property Successfully Deleted!");
  //         setOpen(false);
  //       }
  //     } catch (error: any) {
  //       message.error(error.message);
  //     }
  //   };

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

      {/* <SSModal
        title="Remove property"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deletePropertyHandler(propertyId)}
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </SSModal> */}
    </div>
  );
};

export default ManageFeedbackPage;
