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
import {
  useDeletePropertyMutation,
  usePropertiesQuery,
} from "@/redux/api/propertyApi";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { setPriority } from "os";
import {
  useContactsQuery,
  useDeleteContactMutation,
} from "@/redux/api/contactApi";
import CustomLoading from "@/components/ui/CustomLoading";

const AdminPage = () => {
  const query: Record<string, any> = {};
  const [deleteContact] = useDeleteContactMutation();

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
  const { data, isLoading } = useContactsQuery({ ...query });

  if (isLoading) {
    return <CustomLoading />;
  }
  const meta = data?.meta;

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Message",
      dataIndex: "message",
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

  const deleteContactHandler = async (id: string) => {
    try {
      const res = await deleteContact(id);

      if (res) {
        message.success("Contact Successfully Deleted!");
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
      <ActionBar title="Property List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
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
        dataSource={data?.data}
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
        handleOk={() => deleteContactHandler(propertyId)}
      >
        <p className="my-5">Do you want to remove this contactus data?</p>
      </SSModal>
    </div>
  );
};

export default AdminPage;
