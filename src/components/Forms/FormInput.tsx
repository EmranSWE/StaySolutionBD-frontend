import { getErrorMessageByPropertyName } from "@/utils/schema-validators";
import { Input, InputNumber } from "antd";
import { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | number | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

const FormInput = ({
  name,
  type,
  size = "large",
  value,
  id,
  placeholder,
  validation,
  disabled,
  label,
  required,
}: IInput) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);
  // If external value prop changes, update the form value
  useEffect(() => {
    if (value !== undefined) {
      setValue(name, value);
    }
  }, [value, setValue, name]);

  const renderInput = (fieldProps: any) => {
    switch (type) {
      case "number":
        return (
          <InputNumber
            size={size}
            placeholder={placeholder}
            style={{ width: "100%" }}
            {...fieldProps}
            required={required}
          />
        );
      case "password":
        return (
          <Input.Password
            type={type}
            size={size}
            placeholder={placeholder}
            {...fieldProps}
            required={required}
          />
        );
      default:
        return (
          <Input
            type={type}
            size={size}
            placeholder={placeholder}
            disabled={disabled}
            {...fieldProps}
            required={required}
          />
        );
    }
  };

  return (
    <>
      {required && <span style={{ color: "red" }}>*</span>}
      {label && label}
      <Controller
        control={control}
        name={name}
        defaultValue={value}
        rules={validation}
        render={({ field }) => renderInput(field)}
      />

      <p>
        <small style={{ color: "red", fontSize: "10px" }}>{errorMessage}</small>
      </p>
    </>
  );
};

export default FormInput;
