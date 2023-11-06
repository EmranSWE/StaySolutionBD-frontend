"use client";
import { Layout, Row, Col } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  CreditCardOutlined,
  MailOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import appPlay from "../../../../assets/Pay-with.png";
import Image from "next/image";

const RentalFooter = () => {
  const date = new Date().getFullYear();
  const iconStyle = { fontSize: "24px", margin: "0 10px", color: "white" };
  const linkStyle = { color: "white", marginBottom: "10px" };

  return (
    <Layout.Footer
      style={{ backgroundColor: "rgb(24, 130, 200)", padding: "40px" }}
    >
      <Row gutter={[32, 32]} justify="space-around">
        {/* About us */}
        <Col xs={24} sm={12} md={6} lg={6}>
          <h2 style={{ color: "white", marginBottom: "20px" }}>ABOUT US</h2>
          <div style={{ color: "white", marginBottom: "10px" }}>
            <MailOutlined style={{ ...iconStyle, color: "#FDCB58" }} />
            Contact us staysolutionbd.com
          </div>
          <div style={{ color: "white", marginBottom: "10px" }}>
            <HomeOutlined style={{ ...iconStyle, color: "#4DA8DA" }} />
            Address: Arshinagar, Bosila, Mohammadpur, Dhaka -1212
          </div>
          <div style={{ color: "white", marginBottom: "10px" }}>
            <MailOutlined style={{ ...iconStyle, color: "#FDCB58" }} />
            Questions? mdemran.swe@gmail.com
          </div>
          <div style={{ color: "white" }}>
            <PhoneOutlined style={{ ...iconStyle, color: "#67D5B5" }} />
            Help Line: +880 1838235450
          </div>
        </Col>

        {/* Quick Links */}
        <Col xs={24} sm={12} md={6} lg={6}>
          <h2 style={{ color: "white", marginBottom: "20px" }}>QUICK LINKS</h2>
          <div style={{ color: "white", marginBottom: "10px" }}>
            <Link
              href="/list-for-rent"
              style={{ color: "white", marginBottom: "10px" }}
            >
              List for Rent
            </Link>
          </div>
          <div style={{ color: "white", marginBottom: "10px" }}>
            <Link
              href="/list-for-sale"
              style={{ color: "white", marginBottom: "10px" }}
            >
              List for Sale
            </Link>
          </div>
          <div style={{ color: "white", marginBottom: "10px" }}>
            <Link
              href="/submit-property"
              style={{ color: "white", marginBottom: "10px" }}
            >
              Submit Property
            </Link>
          </div>
          <div style={{ color: "white", marginBottom: "10px" }}>
            <Link
              href="/contact-us"
              style={{ color: "white", marginBottom: "10px" }}
            >
              Contact Us
            </Link>
          </div>
          <div style={{ color: "white", marginBottom: "10px" }}>
            <Link href="/faq">FAQ (Help)</Link>
          </div>
          <div style={{ color: "white" }}>
            <Link
              href="/terms"
              style={{ color: "white", marginBottom: "10px" }}
            >
              Terms
            </Link>
          </div>
        </Col>
        {/* Stay In Touch */}
        <Col xs={24} sm={12} md={6} lg={6}>
          <h2 style={{ color: "white", marginBottom: "20px" }}>
            STAY IN TOUCH
          </h2>
          <div style={{ color: "white", marginBottom: "10px" }}>
            <Link
              href="https://www.facebook.com/"
              style={{ color: "white", marginBottom: "10px" }}
            >
              <FacebookOutlined style={iconStyle} /> Facebook
            </Link>
          </div>
          <div style={{ color: "white", marginBottom: "10px" }}>
            <Link
              href="https://www.twitter.com/"
              style={{ color: "white", marginBottom: "10px" }}
            >
              <TwitterOutlined style={iconStyle} /> Twitter
            </Link>
          </div>
          <div style={{ color: "white" }}>
            <Link
              href="https://www.instagram.com/"
              style={{ color: "white", marginBottom: "10px" }}
            >
              <InstagramOutlined style={iconStyle} /> Instagram
            </Link>
          </div>
        </Col>
        {/* Payment Accepted */}
        <Col xs={24} sm={12} md={6} lg={6}>
          <h2 style={{ color: "white", marginBottom: "20px" }}>
            PAYMENT ACCEPTED
          </h2>
          <div style={{ marginBottom: "10px" }}>
            <Image
              src={appPlay}
              width={300}
              height={100}
              alt="Payment Methods"
            />
          </div>
          {/* ... your payment methods here */}
        </Col>
      </Row>

      <Row style={{ marginTop: "40px", color: "white", textAlign: "center" }}>
        <Col span={24}>
          <p>
            Home Rental Service ©{date}. All rights reserved. Developed by
            Emran.
          </p>
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export default RentalFooter;
