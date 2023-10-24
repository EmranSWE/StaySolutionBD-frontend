import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col } from "antd";
import Image from "next/image";
const { Meta } = Card;

type ProductCardProps = {
  data?: any;
  onAddToCart?: any;
};
const ProductCard = ({ data, onAddToCart }: ProductCardProps) => {
  return (
    <Col xs={24} sm={12} md={6} lg={6}>
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
        <Meta
          avatar={<Avatar src={data.propertyImage || data.imageGallery[0]} />}
          title={data.category}
          description={data.itemDescription}
        />
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
    </Col>
  );
};

export default ProductCard;
