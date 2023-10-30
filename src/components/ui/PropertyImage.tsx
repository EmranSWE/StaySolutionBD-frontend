import Image from "next/image";
import styles from "./css/propertyCard.module.css";
type PropertyImageProps = {
  imageUrl: string;
  altText?: string;
};

export const PropertyImage = ({ imageUrl, altText }: PropertyImageProps) => (
  <Image
    src={imageUrl}
    alt={altText || "Property Image"}
    width={320}
    height={240}
    className={styles.zoomDetails}
    layout="responsive"
  />
);
