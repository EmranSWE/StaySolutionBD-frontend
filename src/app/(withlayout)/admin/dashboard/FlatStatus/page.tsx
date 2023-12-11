"use client";
import React from "react";
import { Row, Col, Card, Divider } from "antd";
import { useCurrentBookingStatusQuery } from "@/redux/api/monthlyPaymentApi";
import CustomLoading from "@/components/ui/CustomLoading";
import { allFlats } from "@/constants/global";

type Status = "booked" | "available" | "unavailable";
interface FlatData {
  flatNo: string;
  status: Status;
}

const getStatusColor = (status: Status): string => {
  switch (status) {
    case "booked":
      return "#FF4D4F"; // Red
    case "available":
      return "#52C41A"; // Green
    default:
      return "#FAAD14"; // Yellow
  }
};

const BuildingShape = () => (
  <svg
    width="100%"
    height="50"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 50"
    style={{ display: "block", width: "100%", height: "50px" }}
  >
    {/* Building base */}
    <rect width="100%" height="80%" fill="#001529" />

    {/* Roof */}
    <polygon points="0,40 50,10 100,40" fill="#002140" />
  </svg>
);

const FlatsDisplay = () => {
  const { data, isLoading } = useCurrentBookingStatusQuery({});

  if (isLoading) {
    return <CustomLoading />;
  }

  const flatsDataMap = new Map<string, Status>(
    data.map((flat: FlatData) => [flat.flatNo, flat.status])
  );

  // Create card elements for each flat
  const cards = allFlats.map((flatNo, index) => {
    const status = flatsDataMap.get(flatNo) || "unavailable";
    const color = getStatusColor(status);

    return (
      <Col key={flatNo} span={12} style={{ padding: 10 }}>
        <Card
          title={flatNo}
          bordered={false}
          style={{ background: color, height: "100%", borderRadius: 8 }}
        >
          <strong>Status:</strong> {status}
        </Card>
      </Col>
    );
  });

  const formattedRows = [];
  for (let i = 0; i < cards.length; i += 2) {
    formattedRows.push(
      <Row key={i} gutter={16} justify="center" align="middle">
        {cards.slice(i, i + 2)}
      </Row>
    );
  }

  const containerStyle = {
    background: "linear-gradient(to bottom, #f0f0f0, #e0e0e0)", // Example gradient background
    padding: "20px",
    borderRadius: 8,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Optional box shadow
  };

  return (
    <div style={containerStyle}>
      <BuildingShape />
      <Divider>
        <h3 style={{ color: "#001529" }}>Sheikh Home</h3>
      </Divider>
      {formattedRows}
    </div>
  );
};

export default FlatsDisplay;

// import React from "react";
// import { useCurrentBookingStatusQuery } from "@/redux/api/monthlyPaymentApi";
// import { allFlats } from "@/constants/global";

// type Status = "booked" | "available" | "unavailable";
// interface FlatData {
//   flatNo: string;
//   status: Status;
// }

// const getStatusColor = (status: Status): string => {
//   switch (status) {
//     case "booked":
//       return "#FF4D4F"; // Red
//     case "available":
//       return "#52C41A"; // Green
//     default:
//       return "#FAAD14"; // Yellow
//   }
// };

// const BuildingPage = () => {
//   const { data, isLoading } = useCurrentBookingStatusQuery({});

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const flatsDataMap = new Map<string, Status>(
//     data.map((flat: FlatData) => [flat.flatNo, flat.status])
//   );
//   console.log(flatsDataMap, "map");
//   const isFlatAvailable = (floorIndex, flatIndex) => {
//     const flat = data.find(
//       (item) => item.floorIndex === floorIndex && item.flatIndex === flatIndex
//     );

//     return flat ? flat.status === "available" : false;
//   };

//   return (
//     <div className="building-container">
//       <style jsx>{`
//         .building-container {
//           position: relative;
//           width: 300px;
//           height: 800px;
//           background-color: #f0e8d5;
//         }

//         .floors {
//           display: flex;
//           flex-direction: column-reverse;
//           height: 80%;
//         }

//         .floor {
//           display: flex;
//           justify-content: space-between;
//           height: 100px;
//         }

//         .part {
//           flex: 1;
//           position: relative;
//           overflow: hidden;
//           border-right: 1px solid #333;
//           border-bottom: 1px solid #333;
//         }

//         .window {
//           position: absolute;
//           top: 10%;
//           left: 5%;
//           width: 80%;
//           height: 80%;
//           border: 2px solid #333;
//           border-radius: 5px;
//           overflow: hidden;
//           background-color: red;
//         }

//         // .frame {
//         //   position: absolute;
//         //   top: 5%;
//         //   left: 2%;
//         //   width: 60%;
//         //   height: 90%;
//         //   border: 2px solid #333;
//         //   border-radius: 5px;
//         //   z-index: 1;
//         // }

//         .shutter {
//           position: absolute;
//           top: 5%;
//           left: 2%;
//           width: 10%;
//           height: 90%;
//           background-color: #8b4513;
//           transform-origin: left center;
//           transform: rotate(0deg);
//           transition: transform 2s ease;
//           z-index: 3;
//         }

//         .flat-name {
//           position: relative;
//           top: 60%;
//           left: 50%;
//           transform: translateX(-50%);
//           color: #fff;
//           font-weight: bold;
//           font-size: 16px;
//           z-index: 2;
//         }

//         .top-design {
//           position: absolute;
//           top: -50px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 0;
//           height: 0;
//           border-left: 150px solid transparent;
//           border-right: 150px solid transparent;
//           border-bottom: 50px solid #4c4c4c;
//           border-top: 0;
//           z-index: 4;
//         }

//         .window:hover .shutter {
//           transform: rotate(-90deg);
//         }
//       `}</style>

//       <div className="floors">
//         {Array.from({ length: 10 }, (_, floorIndex) => (
//           <div key={floorIndex} className="floor">
//             {Array.from({ length: 2 }, (_, columnIndex) => (
//               <div key={columnIndex} className="part" floorIndex={floorIndex}>
//                 <div className="window">
//                   <div className="frame"></div>
//                   <div className="pane"></div>
//                   <div className="shutter"></div>
//                   <div style={{ marginLeft: "12px" }}>
//                     <h1>
//                       {" "}
//                       {`${floorIndex + 1}-${String.fromCharCode(
//                         97 + columnIndex
//                       )}`}
//                     </h1>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className="top-design"></div>
//     </div>
//   );
// };

// export default BuildingPage;
