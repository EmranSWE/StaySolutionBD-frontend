"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePropertiesQuery } from "@/redux/api/propertyApi";
import { useState } from "react";
import { Button, Card, Row } from "antd";
const { Meta } = Card;
import image1 from "../../../../assets/home1.jpg";
import Image from "next/image";
import "./styles.css";
import Link from "next/link";
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
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = usePropertiesQuery({ ...query });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("recent", data);
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
        Recent Properties
      </h2>
      <Slider {...settings}>
        {data?.map((property: any) => (
          <div className="slider-item-wrapper">
            <Card
              hoverable
              style={{ margin: "10px" }} // added margin
              cover={
                <Image
                  src={property.imageGallery[0]}
                  alt="Landscape picture"
                  width={200} // changed from 240
                  height={200} // changed from 240
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
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
