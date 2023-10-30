// "use client";
// import { useSinglePropertyQuery } from "@/redux/api/propertyApi";
// import { Card, Col, Row, List, Typography, Button, Divider } from "antd";
// import {
//   HomeOutlined,
//   UserOutlined,
//   AppstoreOutlined,
//   ExclamationCircleOutlined,
//   SmileOutlined,
// } from "@ant-design/icons";
// import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
// import { PropertyImage } from "@/components/ui/PropertyImage";
// import { PropertyDetails } from "@/components/ui/PropertyDetails";
// import { IconList } from "@/components/ui/IconList";
// import Link from "next/link";
// import styles from "./singleproperty.module.css";
// import { useGetSingleMarketplaceQuery } from "@/redux/api/marketplaceApi";

// const { Title, Paragraph } = Typography;
// type MarketpalcePropertyDetailsProps = {
//   params: {
//     id: string;
//   };
// };

// const MarketplacePropertyDetails = ({ params }: any) => {
//   console.log(params.id);
//   if (!params || !params.id) return <div>Error: Invalid Property ID</div>;

//   const {
//     data: property,
//     isLoading,
//     isError,
//   } = useGetSingleMarketplaceQuery(params.id);
//   console.log(property);
//   if (isLoading) return <div>Loading...</div>;

//   if (isError) return <div>Error fetching property details.</div>;

//   return (
//     <div>
//       <Divider>
//         <h1 style={{ textAlign: "center", marginBottom: "15px" }}>
//           Property <span style={{ color: "rgb(24, 144, 255)" }}>Details</span>
//         </h1>
//       </Divider>
//       <SSBreadCrumb
//         items={[
//           {
//             label: "all property",
//             link: "/property/all-property",
//           },
//         ]}
//       />
//       <Row gutter={24} style={{ display: "flex", justifyContent: "center" }}>
//         {/* Image Column */}
//         <Col xs={24} md={12}>
//           <PropertyImage imageUrl={property.imageGallery[0]} />
//           <div style={{ marginTop: "20px" }}>
//             <h2>Description:</h2> {property.description}
//           </div>
//           <p style={{ margin: "20px 0" }}>
//             <IconList
//               title="Rules"
//               dataSource={property.rules}
//               icon={<ExclamationCircleOutlined />}
//             />
//           </p>
//         </Col>

//         {/* Details Column */}
//         <Col xs={24} md={10}>
//           <Title level={3}>
//             {property.title}, {property.city}
//           </Title>
//           <Row gutter={16}>
//             <Col xs={24} md={10}>
//               <PropertyDetails
//                 flatNo={property.flatNo}
//                 city={property.city}
//                 monthlyRent={property.monthlyRent}
//                 maxOccupancy={property.maxOccupancy}
//                 numberOfRooms={property.numberOfRooms}
//                 size={property.size}
//               />
//             </Col>
//           </Row>

//           <IconList
//             title="Amenities"
//             dataSource={property.amenities}
//             icon={<SmileOutlined />}
//           />

//           <Link href={`/renter/booking/${property.id}`}>
//             <Button type="primary" size="large" style={{ marginTop: "20px" }}>
//               Book Now
//             </Button>
//           </Link>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default MarketplacePropertyDetails;
"use client";

import { IconList } from "@/components/ui/IconList";
import { PropertyImage } from "@/components/ui/PropertyImage";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { useGetSingleMarketplaceQuery } from "@/redux/api/marketplaceApi";
import { ExclamationCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Divider, Row, Typography } from "antd";
const { Title, Paragraph } = Typography;

import Link from "next/link";
import React from "react";

const MarketplacePropertyDetails = ({ params }: any) => {
  console.log(params);
  const {
    data: property,
    isLoading,
    isError,
  } = useGetSingleMarketplaceQuery(params.id);
  console.log("data", property);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Divider>
        <h1 style={{ textAlign: "center", marginBottom: "15px" }}>
          Property <span style={{ color: "rgb(24, 144, 255)" }}>Details</span>
        </h1>
      </Divider>
      <SSBreadCrumb
        items={[
          {
            label: "marketplace",
            link: "/marketplace/",
          },
        ]}
      />

      <Row gutter={24} style={{ display: "flex", justifyContent: "center" }}>
        {/* Image Column */}
        <Col xs={24} md={12}>
          <PropertyImage imageUrl={property?.propertyImage} />
          <div style={{ marginTop: "20px" }}>
            <h2>Description:</h2> {property?.itemDescription}
          </div>
          <p style={{ margin: "20px 0" }}>
            <h1>Price: {property.price}</h1>
          </p>
        </Col>

        {/* Details Column */}
        <Col xs={24} md={10}>
          <Title level={3}>{property.title}</Title>
          <Row gutter={16}>
            <Col xs={24} md={10}>
              <h4>Category:{property.category}</h4>
              <h2>Owner Details:</h2>
              <Avatar src={property?.owner?.profilePic} size={64} />
              <p>
                Name:{" "}
                {`${property?.owner?.firstName} ${property?.owner?.middleName}`}
              </p>
              <p>Phone: {property?.owner?.phone}</p>
            </Col>
          </Row>

          <Link href={`/renter/marketplaceBooking/${property.id}`}>
            <Button type="primary" size="large" style={{ marginTop: "20px" }}>
              Book Now
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default MarketplacePropertyDetails;
