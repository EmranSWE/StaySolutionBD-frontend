import React from "react";

interface BorderDivProps {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  gradient: string;
}

export function BorderDiv(props: BorderDivProps) {
  const { top, bottom, left, right, gradient } = props;
  const borderStyle: React.CSSProperties = {
    position: "absolute",
  };

  if (top) {
    borderStyle.top = 0;
    borderStyle.left = 0;
    borderStyle.right = 0;
    borderStyle.height = "4px";
    borderStyle.background = gradient;
  } else if (bottom) {
    borderStyle.bottom = 0;
    borderStyle.left = 0;
    borderStyle.right = 0;
    borderStyle.height = "4px";
    borderStyle.background = gradient;
  } else if (left) {
    borderStyle.top = 0;
    borderStyle.bottom = 0;
    borderStyle.left = 0;
    borderStyle.width = "4px";
    borderStyle.background = gradient;
  } else if (right) {
    borderStyle.top = 0;
    borderStyle.bottom = 0;
    borderStyle.right = 0;
    borderStyle.width = "4px";
    borderStyle.background = gradient;
  }

  return <div style={borderStyle}></div>;
}
