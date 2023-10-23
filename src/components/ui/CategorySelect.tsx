import React from "react";
import { Select } from "antd";

export type CategoryOption = {
  label: string;
  value: string;
};

interface CategorySelectProps {
  options: CategoryOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  options,
  placeholder = "Select a category",
  value,
  onChange,
  style,
}) => {
  return (
    <Select
      style={style}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CategorySelect;
