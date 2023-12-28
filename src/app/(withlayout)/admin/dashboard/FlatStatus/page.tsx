"use client";
import React from "react";
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
      return "yellow";
  }
};

const BuildingPage = () => {
  const { data, isLoading } = useCurrentBookingStatusQuery({});

  if (isLoading) {
    return <CustomLoading />;
  }

  const flatsDataMap = new Map<string, Status>(
    data?.map((flat: FlatData) => [flat.flatNo, flat.status])
  );

  const windows = Array.from({ length: 10 }, (_, floorIndex) =>
    Array.from({ length: 2 }, (_, columnIndex) => {
      const flatNo = allFlats[floorIndex * 2 + columnIndex];
      const status = flatsDataMap.get(flatNo) || "unavailable";
      const color = getStatusColor(status);

      return (
        <div key={`${floorIndex}-${columnIndex}`}>
          <div className="shutter"></div>
          <div style={{ backgroundColor: color }}>
            <div style={{ padding: "5px" }}>
              <h3>Flat No: {flatNo}</h3>
              <h4>{status}</h4>
            </div>
          </div>
        </div>
      );
    })
  );
  const reversedWindows = [...windows].reverse();

  return (
    <div style={{ display: "block" }}>
      <div className="building-container">
        <style jsx>{`
          .building-container {
            position: relative;
            min-width: 70%;
            height: 600px;
            margin-left: 10px;
            background-color: #f0e8d5;
          }
          .top-design {
            position: absolute;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);

            border-left: 140px solid transparent;
            border-right: 140px solid transparent;
            border-bottom: 50px solid rgb(63, 94, 251);
            z-index: 4;
          }
          .floors {
            display: flex;
            flex-direction: column-reverse;
            height: 100%;
            margin-top: 10%;
          }

          .floor {
            display: flex;
            justify-content: space-between;
            height: 100px;
            border: 2px solid gray;
            padding-top: 10px;
          }

          .text {
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 20px;
            z-index: 10;
          }

          .window:hover .shutter {
            transform: rotate(-90deg);
          }
        `}</style>

        <div className="floors">
          {reversedWindows.map((windowRow, index) => (
            <div key={index} className="floor">
              {windowRow}
            </div>
          ))}
        </div>
        <div className="top-design"></div>
        <div className="text">Sheikh Home</div>
      </div>
    </div>
  );
};

export default BuildingPage;
