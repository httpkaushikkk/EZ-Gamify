import * as React from "react"

interface CheckInterface {}

const Check:React.FC<CheckInterface> = ({}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    color="#008000"
  >
    <path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 12.75s1.6.912 2.4 2.25c0 0 2.4-5.25 5.6-7"
    />
  </svg>
)
export default Check;
