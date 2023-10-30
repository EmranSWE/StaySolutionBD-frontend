import { truncateText } from "@/utils/truncateText";
import {
  CheckOutlined,
  DollarOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Col } from "antd";
import Image from "next/image";
import Link from "next/link";
const { Meta } = Card;
import styles from "./css/propertyCard.module.css";
type MarketPlacePropertyCardProps = {
  data?: any;
  onAddToCart?: any;
};
const MarketPlacePropertyCard = ({
  data,
  onAddToCart,
}: MarketPlacePropertyCardProps) => {
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
    <Col
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <Link href={`/marketplace/${data?.id}`}>
          <Card
            style={{ width: 300 }}
            cover={
              <div className={styles.imageContainer}>
                <Image
                  src={data.propertyImage}
                  alt="Landscape picture"
                  className={styles.zoom}
                  width={300}
                  height={200}
                />
              </div>
            }
          >
            <Meta
              avatar={<Avatar src={data?.owner?.profilePic} />}
              title={data?.title}
              description={truncateText({
                text: data?.itemDescription,
                limit: 100,
              })}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <CheckOutlined style={{ fontSize: "1.2em" }} />
                <p style={{ ...baseStyle, fontSize: "1.6em" }}>
                  {data?.category}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <DollarOutlined style={{ fontSize: "1.2em" }} />
                <p style={{ ...baseStyle, fontSize: "1.6em" }}>{data?.price}</p>
              </div>
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

export default MarketPlacePropertyCard;
