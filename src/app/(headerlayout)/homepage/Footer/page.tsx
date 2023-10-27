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
import appPlay from "../../../../assets/png-clipart-app-store-google-play-apple-apple-text-logo.png";
import Image from "next/image";
const RentalFooter = () => {
  const iconStyle = { fontSize: "24px", margin: "0 5px" };
  return (
    <div style={{ backgroundColor: "rgb(24, 130, 200)", padding: "24px 50px" }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col
          xs={24}
          sm={12}
          md={6}
          lg={6}
          style={{ color: "white", marginBottom: "16px" }}
        >
          <h1>ABOUT US</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MailOutlined style={{ ...iconStyle, color: "#FDCB58" }} />
            Contact us staysolutionbd.com.
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <HomeOutlined style={{ ...iconStyle, color: "#4DA8DA" }} />
            Address: Arshinagar,Bosila, Mohammadpur, Dhaka -1212.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MailOutlined style={{ ...iconStyle, color: "#FDCB58" }} />
            Have any questions? mdemran.swe@gmail.com
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <PhoneOutlined style={{ ...iconStyle, color: "#67D5B5" }} />
            Help Line: +880 1838235450
          </div>
        </Col>

        <Col
          xs={24}
          sm={12}
          md={6}
          lg={6}
          style={{ color: "white", marginBottom: "16px" }}
        >
          <h1>QUICK LINKS</h1>
          <div>
            <Link href="/list-for-rent">
              <p style={{ color: "white" }}>LIST FOR RENT</p>
            </Link>
          </div>
          <div>
            <Link href="/list-for-sale">
              <p style={{ color: "white" }}>LIST FOR SALE</p>
            </Link>
          </div>
          <div>
            <Link href="/submit-property">
              <p style={{ color: "white" }}>SUBMIT PROPERTY</p>
            </Link>
          </div>
          <div>
            <Link href="/contact-us">
              <p style={{ color: "white" }}>CONTACT US</p>
            </Link>
          </div>
          <div>
            <Link href="/faq">
              <p style={{ color: "white" }}>FAQ(HELP)</p>
            </Link>
          </div>
          <div>
            <Link href="/terms">
              <p style={{ color: "white" }}>TERMS</p>
            </Link>
          </div>
        </Col>

        <Col
          xs={24}
          sm={12}
          md={6}
          lg={6}
          style={{ color: "white", marginBottom: "16px" }}
        >
          <h1>Stay In Touch</h1>
          <div>
            <h2>
              <FacebookOutlined /> Facebook
            </h2>
          </div>
          <div>
            <h2>
              <TwitterOutlined /> Twitter
            </h2>
          </div>
          <div>
            <h2>
              {" "}
              <InstagramOutlined /> Instagram
            </h2>
          </div>
        </Col>

        <Col
          xs={24}
          sm={12}
          md={6}
          lg={6}
          style={{ color: "white", marginBottom: "16px" }}
        >
          <h1>Payment Accepted</h1>
          <div>
            <Image src={appPlay} width={300} height={100} alt="play"></Image>
          </div>
          <div>
            <CreditCardOutlined /> Visa
          </div>
          <div>
            <CreditCardOutlined /> Mastercard
          </div>
          <div>
            <CreditCardOutlined /> PayPal
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: "24px", color: "white", textAlign: "center" }}>
        <Col span={24}>Home Rental Service ©2023. All rights reserved.</Col>
      </Row>
    </div>
  );
};

export default RentalFooter;
