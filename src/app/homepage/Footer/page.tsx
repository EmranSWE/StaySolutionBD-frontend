import { Layout, Row, Col } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const RentalFooter = () => {
  return (
    <div style={{ backgroundColor: "#001529", padding: "24px 50px" }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} sm={12} md={6} lg={6}></Col>

        {/* Column 2 - Info and Links */}
        <Col xs={24} sm={12} md={6} lg={6} style={{ color: "white" }}>
          <div>About Us</div>
          <div>Contact</div>
          <div>Terms & Conditions</div>
        </Col>

        {/* Column 3 - Social Media Links */}
        <Col xs={24} sm={12} md={6} lg={6} style={{ color: "white" }}>
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

        {/* Column 4 - Payment Systems */}
        <Col xs={24} sm={12} md={6} lg={6} style={{ color: "white" }}>
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
