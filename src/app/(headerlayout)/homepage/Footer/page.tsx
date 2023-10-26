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
          <h3>ABOUT US</h3>
          <div>
            <MailOutlined style={{ ...iconStyle, color: "#FDCB58" }} />
            Contact us bdto-let.com.
          </div>
          <div>
            <HomeOutlined style={{ ...iconStyle, color: "#4DA8DA" }} />
            Address: 555 South Manda Mugda Dhaka-1214.
          </div>
          <div>
            <MailOutlined style={{ ...iconStyle, color: "#FDCB58" }} />
            Have any questions? support@bdto-let.com
          </div>
          <div>
            <PhoneOutlined style={{ ...iconStyle, color: "#67D5B5" }} />
            Help Line: +880 16211 73 197
          </div>
        </Col>

        <Col
          xs={24}
          sm={12}
          md={6}
          lg={6}
          style={{ color: "white", marginBottom: "16px" }}
        >
          <h3>QUICK LINKS</h3>
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
          <h3>Stay In Touch</h3>
          <div>
            <FacebookOutlined /> Facebook
          </div>
          <div>
            <TwitterOutlined /> Twitter
          </div>
          <div>
            <InstagramOutlined /> Instagram
          </div>
        </Col>

        <Col
          xs={24}
          sm={12}
          md={6}
          lg={6}
          style={{ color: "white", marginBottom: "16px" }}
        >
          <h3>Payment Accepted</h3>
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
