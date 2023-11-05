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
      return "red";
    case "available":
      return "green";
    default:
      return "yellow";
  }
};

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
      <Col key={flatNo} span={12} style={{ padding: 0 }}>
        <Card
          title={flatNo}
          bordered={true}
          bodyStyle={{ padding: 10, backgroundColor: color }}
        >
          Status: {status}
        </Card>
      </Col>
    );
  });

  const formattedRows = [];
  for (let i = 0; i < cards.length; i += 2) {
    formattedRows.push(
      <Row key={i} justify="center">
        {cards[i]}
        {cards[i + 1] ? cards[i + 1] : <Col span={12} />}
      </Row>
    );
  }

  return (
    <div>
      <Divider>
        <h3>Sheikh Home</h3>
      </Divider>
      {formattedRows}
    </div>
  );
};

export default FlatsDisplay;
