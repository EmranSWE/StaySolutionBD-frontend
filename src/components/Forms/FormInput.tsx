// "use client";

// // import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
// import { Input } from "antd";
// import { spawn } from "child_process";
// import { useFormContext, Controller } from "react-hook-form";
// interface IInput {
//   name: string;
//   type?: string;
//   size?: "large" | "small";
//   value?: string | string[] | undefined;
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

//   // const errorMessage = getErrorMessageByPropertyName(errors, name);

//   return (
//     <>
//       {required ? (
//         <span
//           style={{
//             color: "red",
//           }}
//         >
//           *
//         </span>
//       ) : null}
//       {label ? label : null}
//       <Controller
//         control={control}
//         name={name}
//         render={({ field }) =>
//           type === "password" ? (
//             <Input.Password
//               type={type}
//               size={size}
//               placeholder={placeholder}
//               {...field}
//               value={value ? value : field.value}
//             />
//           ) : (
//             <Input
//               type={type}
//               size={size}
//               placeholder={placeholder}
//               {...field}
//               value={value ? value : field.value}
//             />
//           )
//         }
//       />
//       {/* <small style={{ color: "red" }}>{errorMessage}</small> */}
//     </>
//   );
// };

// export default FormInput;

"use client";

import { Input, InputNumber } from "antd";
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
  label,
  required,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {required ? (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      ) : null}
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          if (type === "number") {
            return (
              <InputNumber
                size={size}
                placeholder={placeholder}
                style={{ width: "100%" }}
                {...field}
                value={typeof value === "number" ? value : field.value}
              />
            );
          } else if (type === "password") {
            return (
              <Input.Password
                type={type}
                size={size}
                placeholder={placeholder}
                {...field}
                value={value ? value : field.value}
              />
            );
          } else {
            return (
              <Input
                type={type}
                size={size}
                placeholder={placeholder}
                {...field}
                value={value ? value : field.value}
              />
            );
          }
        }}
      />
      {/* Uncomment this if you wish to display error messages
      <small style={{ color: "red" }}>{errorMessage}</small> */}
    </>
  );
};

export default FormInput;
