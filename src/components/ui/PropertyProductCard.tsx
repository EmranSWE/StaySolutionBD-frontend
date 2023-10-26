import {
  DollarOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Col } from "antd";
import Image from "next/image";
import Link from "next/link";
const { Meta } = Card;

type PropertyProductCardProps = {
  data?: any;
  onAddToCart?: any;
};
const PropertyProductCard = ({
  data,
  onAddToCart,
}: PropertyProductCardProps) => {
  console.log(data.amenities.join());

  const isAvailable = data.propertyStatus === "available";

  const baseStyle = {
    fontWeight: "bold",
    fontSize: "1.2em", // Increase font size for rooms and rent
    alignItems: "center",
  };

  const statusStyle = isAvailable
    ? {
        background: "green",
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
      }
    : {
        color: "black",
      };
  return (
    <Col xs={24} sm={12} md={6} lg={6}>
      <div>
        <Link href={`/property/${data.id}`}>
          <Card
            style={{ width: 300, position: "relative" }}
            cover={
              <Image
                src={data.propertyImage || data.imageGallery[0]}
                alt="Landscape picture"
                width={200}
                height={200}
              />
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
                <p style={{ ...baseStyle, color: "green" }}>
                  {data.numberOfRooms}
                </p>
              </div>
              <div>
                <p style={{ ...baseStyle, ...statusStyle }}>
                  {data.propertyStatus}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <DollarOutlined style={{ fontSize: "1.2em" }} />
                <p style={{ ...baseStyle, fontSize: "1.6em" }}>
                  {data.monthlyRent}
                </p>
              </div>
            </div>
            <Meta
              avatar={
                <Avatar src={data.propertyImage || data.imageGallery[0]} />
              }
              title={data.city}
              description={data.description}
            />
            <div>
              <p>Amenities:{data.amenities.join()}</p>
            </div>
            <Button
              type="text"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                border: "none",
                background: "transparent",
              }}
              icon={<ShoppingCartOutlined />}
              onClick={() => onAddToCart(data)}
            />
          </Card>
        </Link>
      </div>
    </Col>
  );
};

export default PropertyProductCard;
