"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { deleteCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import bell from "../../../assets/svg/bell.svg";
import menu from "../../../assets/svg/menu.svg";
import game from "../../../assets/svg/game.svg";
import profile from "../../../assets/profile.jpg";
import dashboard from "../../../assets/svg/dashboard.svg";

interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      className="h-full bg-primary-darken"
    >
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
            <Link href="/dashboard/selected-games">
              <div
                className={`flex items-center h-12 px-2 mt-2 ${
                  pathname === "/dashboard/selected-games"
                    ? "bg-primary-dark/35 rounded-lg"
                    : ""
                }`}
              >
                <Image src={game} alt="" className="w-6 h-6" />
                <span className="ml-3 text-white tracking-wider">
                  Selected Games
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="mb-5 px-3">
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
    </Box>
  );

  return (
    <React.Fragment>
      <div className="w-full h-14 flex items-center justify-between px-5 bg-white shadow-sm sticky top-0 z-50">
        <p className="lg:block hidden"></p>
        <a
          href={void 0}
          onClick={toggleDrawer(true)}
          className="lg:hidden block cursor-pointer"
        >
          <Image src={menu} alt="" className="w-8 h-8" />
        </a>
        <div className="flex items-center">
          <div className="flex items-center border-[2px] border-black px-2 py-1 rounded-3xl">
            <div className="w-7 h-7 rounded-full bg-primary-darken flex items-center justify-center text-white">
              ₹
            </div>
            <p className="ml-1 text-lg">5000</p>
          </div>
          <a href={void 0} className="cursor-pointer">
            <Image src={bell} alt="" className="w-8 h-8 mx-4" />
          </a>
          <Link
            href="/dashboard/profile"
            className="w-12 h-12 flex items-center justify-center rounded-full border-[1px] border-black/15"
          >
            <Image
              src={profile}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </Link>
        </div>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </React.Fragment>
  );
};

export default Navbar;
