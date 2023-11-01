"use client";
import ActionBar from "@/components/ui/ActionBar";
import { Button, Input, message } from "antd";
import Link from "next/link";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";

import dayjs from "dayjs";
import SSTable from "@/components/ui/SSBDTable";
import SSModal from "@/components/ui/SSModal";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import {
  useDeleteMarketplaceDataMutation,
  useMarketplacesQuery,
  useSingleUserMarketplaceDataQuery,
} from "@/redux/api/marketplaceApi";
import CustomLoading from "@/components/ui/CustomLoading";

const MyMarketplaceProduct = () => {
  const query: Record<string, any> = {};
  const [deleteMarketplaceData] = useDeleteMarketplaceDataMutation();

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

  const { data, isLoading, isError, error } =
    useSingleUserMarketplaceDataQuery(id);

  if (isError) {
    console.error("Error fetching property data:", error);
    // Handle the error as needed
  }
  if (isLoading) {
    return <CustomLoading />;
  }
  console.log("data", data);

  const meta = data?.meta;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (data: any) => {
        const name = [data?.firstName, data?.middleName, data?.lastName]
          .filter(Boolean)
          .join(" ");
        return name;
      },
    },

    {
      title: "Description",
      dataIndex: "itemDescription",
    },

    {
      title: "Action",
      dataIndex: "id",
      render: function (id: any) {
        return (
          <>
            <Link href={`/owner/marketplace/edit/${id}`}>
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
                setPropertyId(id); // Corrected this line
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
      const res = await deleteMarketplaceData(id);
      console.log("response", res);
      if (res) {
        message.success("Marketplace Data Successfully Deleted!");
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
      <ActionBar title="Property List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "60%",
          }}
        />
        <div>
          <Link href="/owner/marketplace/add-to-marketplace">
            <Button type="primary">Create Property</Button>
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

export default MyMarketplaceProduct;
