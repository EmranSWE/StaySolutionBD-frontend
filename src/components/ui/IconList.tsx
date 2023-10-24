import { List, Typography } from "antd";
import React from "react";
const { Title } = Typography;
interface IconListProps {
  title: string;
  dataSource: string[];
  icon: React.ReactNode;
}
export const IconList: React.FC<IconListProps> = ({
  title,
  dataSource,
  icon,
}) => {
  return (
    <>
      <Title level={4}>{title}</Title>
      <List
        bordered
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            {React.cloneElement(icon as React.ReactElement)}
            {item}
          </List.Item>
        )}
      />
    </>
  );
};
