import { useTheme } from "next-themes";
import React from "react";

function CurrencyIcon() {
  const { resolvedTheme } = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      stroke={resolvedTheme == "light" ? "#000" : "#F0F3FA"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="icon icon-tabler icons-tabler-outline icon-tabler-currency"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M5 12a7 7 0 1014 0 7 7 0 10-14 0M4 4l3 3M20 4l-3 3M4 20l3-3M20 20l-3-3"></path>
    </svg>
  );
}

export default CurrencyIcon;
