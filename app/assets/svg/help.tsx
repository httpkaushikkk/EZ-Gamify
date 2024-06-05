import { useTheme } from "next-themes";
import React from "react";

function HelpIcon() {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-help"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M3 12a9 9 0 1018 0 9 9 0 10-18 0M12 17v.01"></path>
      <path d="M12 13.5a1.5 1.5 0 011-1.5 2.6 2.6 0 10-3-4"></path>
    </svg>
  );
}

export default HelpIcon;
