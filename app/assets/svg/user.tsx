import React from "react";

interface UserInterface {}

const User: React.FC<UserInterface> = ({}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    stroke="#2c3e50"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    className="icon icon-tabler icon-tabler-user-filled"
    viewBox="0 0 24 24"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2a5 5 0 1 1-5 5l.005-.217A5 5 0 0 1 12 2zM14 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5h4z"
    />
  </svg>
);
export default User;
