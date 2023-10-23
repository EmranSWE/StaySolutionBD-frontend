import React from "react";
import { Carousel, Button } from "antd";
import Image from "next/image";
import home1 from "../../../../assets/home100.jpg";
import home2 from "../../../../assets/home1.jpg";
import home3 from "../../../../assets/home2.jpg";
import home4 from "../../../../assets/home3.jpg";
const contentStyle: React.CSSProperties = {
  height: "600px",
  color: "#fff",
  width: "100%",
  textAlign: "center",
  background: "#364d79",
  position: "relative",
};

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  display: "flex",
  top: "0",
  bottom: "10px",
  left: "25%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const items = [
  {
    src: home1,
    alt: "Picture of the author",
    title: "LOOKING FOR A RENT HOUSE",
    text: "Rental of furnished apartments with services since 1992 Mobility contract : one month minimum",
    style: { color: "red" },
    link: "/login",
  },
  {
    src: home2,
    alt: "Picture of the author",
    title: "",
    text: "",
    link: "",
  },
  {
    src: home3,
    alt: "Picture of the author",
    title: "",
    text: "",

    link: "",
  },
  {
    src: home4,
    alt: "Picture of the author",
    title: "",
    text: "",
    link: "",
  },
];

const BannerPage: React.FC = () => (
  <Carousel autoplay>
    {items.map((item, index) => (
      <div key={index}>
        <h3 style={contentStyle}>
          <Image src={item.src} layout="fill" alt={item.alt} />
          <div style={overlayStyle}>
            <div>
              <p
                style={{ color: "white", fontSize: "40px", fontWeight: "bold" }}
              >
                {item.title}
              </p>
              <p style={item.style}>{item.text}</p>
              {item.link && (
                <Button type="primary" href={item.link}>
                  Click Here
                </Button>
              )}
            </div>
          </div>
        </h3>
      </div>
    ))}
  </Carousel>
);

export default BannerPage;
