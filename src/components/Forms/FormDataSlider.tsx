import { Slider } from "antd";
import React from "react";

type DataSliderProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  tooltipVisible?: boolean;
  onChange: (value: number) => void;
  style?: any;
};
const DataSlider = ({
  style,
  min = 0,
  max = 100,
  defaultValue = 0,

  onChange,
}: DataSliderProps) => {
  return (
    <Slider
      style={style}
      min={min}
      max={max}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default DataSlider;
