import { useTheme } from "next-themes";
import React from "react";

function TransactionIcon() {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-transition-right"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M18 3a3 3 0 013 3v12a3 3 0 01-3 3M3 18V6a3 3 0 116 0v12a3 3 0 01-6 0zM9 12h8M14 15l3-3-3-3"></path>
    </svg>
  );
}

export default TransactionIcon;
