"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Button } from "antd";
import Image from "next/image";
import home1 from "../../../../assets/home100.jpg";
import home7 from "../../../../assets/rental2.jpg";
import home2 from "../../../../assets/home1.jpg";
import home5 from "../../../../assets/home5.jpg";
import home3 from "../../../../assets/home5.jpg";
import home4 from "../../../../assets/home3.jpg";
interface CarouselItem {
  src: string;
  alt: string;
  title: string;
  text: string;
  style?: React.CSSProperties;
  link?: string;
}

const items = [
  {
    src: home2,
    alt: "Modern Apartment in the Heart of the City",
    title: "Sheikh Home | Your rental solution",
    text: "Experience the luxury and comfort of Staysolutionbd's handpicked apartments. Redefine urban living today.",
    style: { color: "white" },
    link: "/contact-us",
  },
  {
    src: home5,
    alt: "Elegant Furnished Apartment Overlooking the Skyline",
    title: "Furnished Elegance at Your Fingertips",
    text: "Every apartment is a unique blend of comfort and style. Join Staysolutionbd and find your perfect match.",
    style: { color: "white" },
    link: "/contact-us",
  },
  {
    src: home4,
    alt: "Spacious Living with Modern Amenities",
    title: "Space, Comfort, Luxury",
    text: "Step into a world where every rental is more than just a house. It's a home, curated just for you by Staysolutionbd.",
    style: { color: "white" },

    link: "/marketplace",
  },
  {
    src: home7,
    alt: "Contemporary Studio with Stunning Views",
    title: "Simplicity Meets Modernity",
    text: "Discover studio spaces that resonate with your lifestyle. Welcome to a new era of renting with Staysolutionbd.",
    link: "/property/all-property",
    style: { color: "white" },
  },
];

const BannerPage: React.FC = () => {
  const [dynamicHeight, setDynamicHeight] = useState("400px");
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth > 2000 ? "600px" : "400px";
      setDynamicHeight(newWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Carousel autoplay fade={true}>
      {items.map((item, index) => (
        <div key={index}>
          <h3
            style={{
              height: dynamicHeight,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#364d79",
              position: "relative",
            }}
          >
            <div style={{ opacity: ".5" }}>
              <Image src={item.src} layout="fill" alt={item.alt} />
            </div>
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "45px",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                    color: "yellow",
                    opacity: "1",
                  }}
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
};

export default BannerPage;
