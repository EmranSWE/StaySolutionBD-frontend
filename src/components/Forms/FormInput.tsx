// import { Input, InputNumber } from "antd";
// import { useFormContext, Controller } from "react-hook-form";

// interface IInput {
//   name: string;
//   type?: string;
//   size?: "large" | "small";
//   value?: string | number | string[] | undefined;
//   id?: string;
//   placeholder?: string;
//   validation?: object;
//   label?: string;
//   required?: boolean;
// }

// const FormInput = ({
//   name,
//   type,
//   size = "large",
//   value,
//   id,
//   placeholder,
//   validation,
//   label,
//   required,
// }: IInput) => {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   const renderInput = (fieldProps: any) => {
//     switch (type) {
//       case "number":
//         return (
//           <InputNumber
//             size={size}
//             placeholder={placeholder}
//             style={{ width: "100%" }}
//             {...fieldProps}
//             value={typeof value === "number" ? value : fieldProps.value}
//           />
//         );
//       case "password":
//         return (
//           <Input.Password
//             type={type}
//             size={size}
//             placeholder={placeholder}
//             {...fieldProps}
//             value={value ? value : fieldProps.value}
//           />
//         );
//       default:
//         return (
//           <Input
//             type={type}
//             size={size}
//             placeholder={placeholder}
//             {...fieldProps}
//             value={value ? value : fieldProps.value}
//           />
//         );
//     }
//   };

//   return (
//     <>
//       {required && <span style={{ color: "red" }}>*</span>}
//       {label && label}
//       <Controller
//         control={control}
//         name={name}
//         render={({ field }) => renderInput(field)}
//       />
//       {/* Uncomment this if you wish to display error messages
//       <small style={{ color: "red" }}>{errorMessage}</small> */}
//     </>
//   );
// };

// export default FormInput;

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
          />
        );
      case "password":
        return (
          <Input.Password
            type={type}
            size={size}
            placeholder={placeholder}
            {...fieldProps}
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
      {/* Uncomment this if you wish to display error messages 
      <small style={{ color: "red" }}>{errors[name]?.message}</small> */}
    </>
  );
};

export default FormInput;
