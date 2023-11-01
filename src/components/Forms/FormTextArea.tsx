import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  placeholder?: string;
  defaultValue?: string | number | string[] | undefined;
};

const FormTextArea = ({
  name,
  label,
  rows,
  placeholder,
  defaultValue,
}: TextAreaProps) => {
  const { control } = useFormContext();
  return (
    <div className={`flex flex-col w-full`}>
      {label ? label : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input.TextArea
            rows={rows}
            placeholder={placeholder}
            {...field}
            value={field.value || defaultValue} // Use value with a fallback to defaultValue
          />
        )}
      />
    </div>
  );
};

export default FormTextArea;
