// import React from "react";
// import { Select } from "antd";
// import { useFormContext, Controller } from "react-hook-form";

// export type SelectOptions = {
//   label: string;
//   value: string;
// };

// type SelectFieldProps = {
//   options: SelectOptions[];
//   name: string;
//   size?: "large" | "small";
//   value?: string | string[] | undefined;
//   placeholder?: string;
//   label?: string;
//   mode?: "multiple" | "tags" | undefined;
//   defaultValue?: string | string[] | undefined;
//   handleChange?: (value: string | string[]) => void;
// };

// const FormSelectField = ({
//   name,
//   size = "large",
//   placeholder = "select",
//   options,
//   label,
//   mode,
//   defaultValue,
//   handleChange,
//   ...restProps
// }: SelectFieldProps) => {
//   const { control } = useFormContext();

//   return (
//     <div>
//       {label && <label htmlFor={name}>{label}</label>}
//       <Controller
//         control={control}
//         name={name}
//         render={({ field: { value, onChange } }) => (
//           <Select
//             id={name}
//             onChange={(val) => {
//               if (val) {
//                 // Check if the selected value exists in the options, if not, add it
//                 if (!options.some((option) => option.value === val)) {
//                   options.push({ label: val, value: val });
//                 }
//                 handleChange && handleChange(val);
//               }
//               onChange(val);
//             }}
//             size={size}
//             options={options.map((option) => ({
//               label: option.label,
//               value: option.value,
//             }))}
//             value={value}
//             mode={mode}
//             style={{ width: "100%" }}
//             placeholder={placeholder}
//             defaultValue={defaultValue}
//             {...restProps}
//           />
//         )}
//       />
//     </div>
//   );
// };

// export default FormSelectField;

import React from "react";
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
  defaultValue?: string | string[] | undefined;
  handleChange?: (value: string | string[]) => void;
};

const FormSelectField = ({
  name,
  size = "large",
  placeholder = "select",
  options,
  label,
  mode,
  defaultValue,
  handleChange,
  ...restProps
}: SelectFieldProps) => {
  const { control } = useFormContext();

  // Ensure options have unique keys by using the value as the key
  const uniqueOptions = Array.from(
    new Map(options.map((option) => [option.value, option])).values()
  );

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            id={name}
            onChange={(val) => {
              if (val) {
                // Check if the selected value exists in the options, if not, add it
                if (!uniqueOptions.some((option) => option.value === val)) {
                  uniqueOptions.push({ label: val, value: val });
                }
                handleChange && handleChange(val);
              }
              onChange(val);
            }}
            size={size}
            options={uniqueOptions.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            value={value}
            mode={mode}
            style={{ width: "100%" }}
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...restProps}
          />
        )}
      />
    </div>
  );
};

export default FormSelectField;
