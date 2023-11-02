import { truncateText } from "@/utils/truncateText";
import {
  DollarOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Card, Col } from "antd";
import Image from "next/image";
import Link from "next/link";
const { Meta } = Card;
import styles from "./css/propertyCard.module.css";
import React, { useMemo } from "react";
type PropertyProductCardProps = {
  data?: any;
  onAddToCart?: any;
};
const PropertyProductCard = ({
  data,
  onAddToCart,
}: PropertyProductCardProps) => {
  const isAvailable = data.propertyStatus === "available";

  const baseStyle = useMemo(
    () => ({
      fontWeight: "bold",
      fontSize: "1.2em",
      alignItems: "center",
    }),
    []
  );

  const statusStyle = useMemo(
    () =>
      isAvailable
        ? {
            background: "green",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
          }
        : {
            background: "gray",
            padding: "4px 8px",
            borderRadius: "4px",
            color: "black",
          },
    [isAvailable]
  );
  return (
    <Col
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <Link href={`/property/${data?.id}`}>
          <Card
            style={{ width: 300 }}
            cover={
              <div className={styles.imageContainer}>
                <Image
                  src={data.propertyImage || data.imageGallery[0]}
                  alt="Landscape picture"
                  className={styles.zoom}
                  width={300}
                  height={200}
                />
              </div>
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "10px",
                }}
              >
                <HomeOutlined style={{ fontSize: "1.2em", color: "green" }} />
                <p style={{ ...baseStyle, color: "green", fontSize: "1.3em" }}>
                  {data.numberOfRooms}
                </p>
              </div>
              <div>
                <p style={{ ...statusStyle }}>{data.propertyStatus}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <DollarOutlined style={{ fontSize: "1.2em" }} />
                <p style={{ ...baseStyle, fontSize: "1.6em" }}>
                  {data.monthlyRent}
                </p>
              </div>
            </div>
            <Meta
              title={data.title}
              description={truncateText({ text: data.description, limit: 150 })}
            />
            <div>
              <p>
                <span
                  style={{ fontWeight: "bolder", color: "rgb(24, 144, 255)" }}
                >
                  Location:{" "}
                </span>
                {data.city}
              </p>
              <p>
                <span style={{ fontWeight: "bolder", color: "green" }}>
                  Amenities
                </span>
                :{data.amenities.join()}
              </p>
            </div>
            <div>
              <p>
                <span
                  style={{ fontWeight: "bolder", color: "rgb(24, 144, 255)" }}
                >
                  Rules
                </span>{" "}
                :{data.rules.join()}
              </p>
            </div>
          </Card>
        </Link>
        <Button
          type="text"
          style={{
            position: "absolute",
            top: 10,
            right: 60,
            border: "none",
            background: "gray",
            borderRadius: "50%",
          }}
          icon={<ShoppingCartOutlined />}
          onClick={() => onAddToCart(data)}
        />
      </div>
    </Col>
  );
};

export default React.memo(PropertyProductCard);
