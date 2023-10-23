import { Input } from "antd";
import React from "react";

type SearchInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
};
const FormDataSearchInput = ({
  placeholder = "Search the data",
  value,
  onChange,
  style,
}: SearchInputProps) => {
  return (
    <Input
      size="large"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      style={style}
    />
  );
};

export default FormDataSearchInput;
