import Link from "next/link";
import React from "react";

interface NavBarInterface {}

const NavBar: React.FC<NavBarInterface> = () => {
  return (
    <div className="w-screen h-16 flex items-center justify-between px-5">
      <div>
        <p className="font-bold tracking-wider uppercase black">ez-gamify</p>
      </div>
      <div>
        <Link href="/login">
          <span className="mr-5">Login</span>
        </Link>
        <Link href="/register">
          <span>Register</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
