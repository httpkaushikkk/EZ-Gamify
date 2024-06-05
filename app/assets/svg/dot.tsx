import React from "react";
import { useTheme } from "next-themes";

function DotIcon() {
  const { resolvedTheme } = useTheme();
  return (
    <svg
      width={35}
      height={35}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="2"
        fill={resolvedTheme == "dark" ? "#fff" : "#000"}
      ></circle>
    </svg>
  );
}

export default DotIcon;