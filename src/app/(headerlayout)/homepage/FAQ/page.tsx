"use client";
import React, { useLayoutEffect, useState } from "react";
import sheikhHome from "../../../../assets/sheikhHome.png";
import {
  useSpringRef,
  animated,
  useTransition,
  useSpring,
} from "@react-spring/web";
import sheikh from "../../../../assets/home100.jpg";
import sheikh1 from "../../../../assets/home1.jpg";
import styles from "./styles.module.css";
import { Col, Collapse, Divider, Row } from "antd";
import type { CollapseProps } from "antd";
import Image from "next/image";

const IMAGES = [sheikh, sheikh1];
export default function App() {
  const textAvailableHours = `
  Our application is accessible 24/7 for viewing listings. However, for direct support and inquiries, our team is available from 9:00 AM to 7:00 PM every day.
`;

  const textRentPrice = `
  The rent price varies depending on the property, its location, and amenities. All listings provide a clear breakdown of the rent and any additional charges. You can also use the filter feature to set your budget range.
`;

  const textApplicationProcess = `
  Our application process is straightforward. Once you find a property you're interested in, you can submit your details directly through the application. The property owner or manager will then be in touch to discuss the next steps.
`;

  const textLeaseTerms = `
  The standard lease term is 12 months. However, some property owners might offer short-term leases. All lease terms are specified in the listing details.
`;

  const textMaintenanceRequests = `
  Any maintenance requests or issues with the property can be reported directly through the application. We aim to address these within 48 hours.
`;

  const textPetsPolicy = `
  Pet policies vary by property. The pet policy, if any, will be specified in the property listing. If you have specific requirements or queries about pets, it's best to contact the property owner directly.
`;

  const textContactDetails = `
  You can reach out to our dedicated support team via the 'Contact Us' section on our application. We also have a helpline number available from 9:00 AM to 7:00 PM for immediate assistance.
`;

  const textRulesAndRegulations = `
  Every property has a set of house rules determined by the property owner. These can include guidelines on noise, visitors, use of shared amenities, etc. You can find these rules in the property listing details. We also encourage all renters and property owners to adhere to our community guidelines, ensuring a harmonious living experience for everyone.
`;

  const textSecurityDeposit = `
  A security deposit is usually required to protect against damages or missed rent payments. The amount and terms of the security deposit are specified in the listing details and are typically equivalent to one month's rent.
`;

  const textTenantScreening = `
  To ensure the safety and quality of our community, we may require potential renters to undergo a screening process. This can include a background check, rental history, and references.
`;

  const textCancellationPolicy = `
  Our cancellation policies are set by the property owners. Typically, if a renter cancels a reservation before moving in, they may be liable for any costs incurred or even the first month's rent. Always review the cancellation policy in the listing details before making a reservation.
`;

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <strong>What are the available hours for support?</strong>,
      children: <p>{textAvailableHours}</p>,
    },
    {
      key: "2",
      label: <strong>How is the rent price determined?</strong>,
      children: <p>{textRentPrice}</p>,
    },
    {
      key: "3",
      label: <strong>What's the application process?</strong>,
      children: <p>{textApplicationProcess}</p>,
    },
    {
      key: "4",
      label: <strong>What are the typical lease terms?</strong>,
      children: <p>{textLeaseTerms}</p>,
    },
    {
      key: "5",
      label: <strong>How do I report maintenance issues?</strong>,
      children: <p>{textMaintenanceRequests}</p>,
    },
    {
      key: "6",
      label: <strong>What's the policy on pets?</strong>,
      children: <p>{textPetsPolicy}</p>,
    },
    {
      key: "7",
      label: <strong>How can I contact the StaySolutionBD team?</strong>,
      children: <p>{textContactDetails}</p>,
    },
    {
      key: "8",
      label: <strong>What are the general rules and regulations?</strong>,
      children: <p>{textRulesAndRegulations}</p>,
    },
    {
      key: "9",
      label: <strong>Is a security deposit required?</strong>,
      children: <p>{textSecurityDeposit}</p>,
    },
    {
      key: "10",
      label: <strong>Do you have a tenant screening process?</strong>,
      children: <p>{textTenantScreening}</p>,
    },
    {
      key: "11",
      label: <strong>What's the cancellation policy?</strong>,
      children: <p>{textCancellationPolicy}</p>,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const springApi = useSpringRef();

  const transitions = useTransition(activeIndex, {
    from: { clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)" },
    enter: { clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)" },
    leave: { clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)" },
    onRest: (_springs, _ctrl, item) => {
      if (activeIndex === item) {
        setActiveIndex(activeIndex === IMAGES.length - 1 ? 0 : activeIndex + 1);
      }
    },
    ref: springApi,
    config: { duration: 4000 },
  });

  const springs = useSpring({
    from: { strokeDashoffset: 120 },
    to: { strokeDashoffset: 0 },
    ref: springApi,
    config: { duration: 11000 },
    loop: true,
  });

  useLayoutEffect(() => {
    springApi.start();
  }, [activeIndex]);

  return (
    <div>
      <Divider orientation="center">
        <h1>
          Frequently <span style={{ color: "#1890ff" }}>Asked</span> Question
        </h1>
      </Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
        <Col xs={24} sm={24} md={10} lg={14}>
          <div className={styles.container}>
            <div className={styles.container__inner}>
              {transitions((springs, item) => (
                <animated.div className={styles.img__container} style={springs}>
                  <Image
                    src={IMAGES[item]}
                    alt="Large Image"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </animated.div>
              ))}
            </div>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={10}
          lg={10}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Collapse defaultActiveKey={["1"]} ghost items={items} />
        </Col>
      </Row>
    </div>
  );
}
