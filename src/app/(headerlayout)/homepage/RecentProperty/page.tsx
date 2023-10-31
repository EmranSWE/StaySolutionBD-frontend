"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePropertiesQuery } from "@/redux/api/propertyApi";
import { useState } from "react";
import { Button, Card } from "antd";
const { Meta } = Card;
import Image from "next/image";

import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Loading from "@/app/loading";
import CustomLoading from "@/components/ui/CustomLoading";
const RecentPropertyPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = usePropertiesQuery({ ...query });
  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }

  return (
    <>
      <h2
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "bolder",
          padding: "20px 0px",
        }}
      >
        Recent<span style={{ color: "#1890ff" }}> Added Properties</span>
      </h2>
      <Slider {...settings}>
        {data?.map((property: any) => (
          <div
            style={{
              display: " flex",
              justifyContent: "center",
            }}
          >
            <Card
              hoverable
              style={{ margin: "50px" }}
              cover={
                <Image
                  src={property.imageGallery[0]}
                  alt="Landscape picture"
                  width={200}
                  height={200}
                />
              }
            >
              <Meta
                title={property?.title}
                description={truncateText({
                  text: property.description,
                  limit: 100,
                })}
              />
              <p>
                Monthly Rent:{" "}
                <span style={{ fontWeight: "bolder" }}>
                  {property.monthlyRent}
                </span>
              </p>
            </Card>
          </div>
        ))}
      </Slider>
      <div style={{ textAlign: "center", marginTop: "20px", width: "100%" }}>
        <Link href="/property/all-property">
          <Button type="primary">View All Properties</Button>
        </Link>
      </div>
    </>
  );
};

export default RecentPropertyPage;
