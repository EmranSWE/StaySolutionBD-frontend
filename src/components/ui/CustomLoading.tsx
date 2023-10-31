"use client";
import { CSSProperties } from "react";
import { GridLoader, BounceLoader, PulseLoader } from "react-spinners";

const centerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100px",
};

const CustomLoading = () => {
  return (
    <div style={centerStyle}>
      <GridLoader
        color="rgb(24, 144, 255)"
        margin={2}
        size={10}
        speedMultiplier={1}
      />
    </div>
  );
};

export default CustomLoading;
