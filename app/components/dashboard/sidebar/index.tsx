"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import game from "../../../assets/svg/game.svg";
import dashboard from "../../../assets/svg/dashboard.svg";

interface SideBarInterface {}

const SideBar: React.FC<SideBarInterface> = () => {
  const pathname = usePathname();
  return (
    <div className="h-screen sticky top-0">
      <div className="w-60 h-full bg-primary-darken">
        <div className="h-full flex flex-col justify-between">
          <div>
            <p className="text-center py-5 uppercase tracking-widest text-2xl text-white font-medium">
              ez-gamify
            </p>
            {/* navigation */}
            <div className="px-3">
              <Link href="/dashboard">
                <div
                  className={`flex items-center h-12 px-2 ${
                    pathname === "/dashboard"
                      ? "bg-primary-dark/35  rounded-lg"
                      : ""
                  }`}
                >
                  <Image src={dashboard} alt="" className="w-7 h-7" />
                  <span className="ml-1 text-white tracking-wider">
                    Dashboard
                  </span>
                </div>
              </Link>
              <Link href="/dashboard/games">
                <div
                  className={`flex items-center h-12 px-2 mt-2 ${
                    pathname === "/dashboard/games"
                      ? "bg-primary-dark/35 rounded-lg"
                      : ""
                  }`}
                >
                  <Image src={game} alt="" className="w-6 h-6" />
                  <span className="ml-3 text-white tracking-wider">Games</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="mb-5 px-3 cursor-pointer">
            <a
              href={void 0}
              onClick={() => {
                deleteCookie("auth-token");
                deleteCookie("auth-id");
                window.location.reload();
              }}
            >
              <div className="h-12 px-2 border-[1px] border-white rounded-lg flex items-center justify-center">
                <span className="text-lg text-white tracking-widest ">
                  Logout
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
