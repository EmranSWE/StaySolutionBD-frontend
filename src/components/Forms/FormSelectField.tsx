"use client";

import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  mode?: "multiple" | "tags" | undefined;
  defaultValue?: SelectOptions;
  handleChange?: (value: string | string[]) => void;
};

const FormSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  options,
  label,
  mode,
  defaultValue,
  handleChange,
  ...restProps
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            id={name}
            onChange={(value) => {
              handleChange && handleChange(value);
              onChange(value);
            }}
            size={size}
            options={options}
            value={value}
            mode={mode}
            style={{ width: "100%" }}
            placeholder={placeholder}
            {...restProps}
          />
        )}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FormSelectField;
