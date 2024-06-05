"use client";
import profile from "@/app/assets/image/profile.jpg";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { deleteCookie, getCookie } from "cookies-next";
import { Avatar } from "@mui/material";
import { useTheme } from "next-themes";
import Menu from "@mui/material/Menu";
import api from "@/app/helper/axios";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import Image from "next/image";
import MobileDrawer from "./mobile_drawer";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import { add, remove } from "@/app/store/features/userSlice";
import Drawer from "@mui/material/Drawer";
import Menus from "./menus";

interface HeaderInterface {}

const Headers: React.FC<HeaderInterface> = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [user, setUser] = useState<any>({});
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchUser();
    }, 100);
  }, []);

  const fetchUser = async () => {
    try {
      let response = await api({
        url: "/admin/fetch",
        data: { _id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (response.hasOwnProperty("response")) {
        setUser(response.response);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const toggleTheme = () => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else if (resolvedTheme === "dark") {
      setTheme("light");
    }
  };

  return (
    <>
      <div className="w-full h-14 flex items-center justify-between px-5 bg-light-primary-white dark:bg-dark-primary-black/50 border-b-[1.4px] border-b-gray/20 shadow-sm sticky top-0 z-50">
        <p className="lg:block hidden"></p>
        <a
          href={void 0}
          onClick={toggleDrawer(true)}
          className="lg:hidden block cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-baseline-density-medium"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 20h16" />
            <path d="M4 12h16" />
            <path d="M4 4h16" />
          </svg>
        </a>
        <div className="flex items-center">
          <a href={void 0} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke={resolvedTheme == "light" ? "#032030" : "#F0F3FA"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-bell"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
              <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            </svg>
          </a>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <IconButton
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {user?.profile_image ? (
                <Image
                  src={profile}
                  alt="profile"
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <Avatar sx={{ width: 36, height: 36 }}>
                  {/* {user?.name.charAt(0)} */}
                </Avatar>
              )}
            </IconButton>
          </Box>
        </div>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div className="h-full w-64 bg-light-primary-mediumBlue/50 dark:bg-dark-primary-boldBlue/90">
          <div className="h-full flex flex-col justify-between">
            <div>
              <p className="text-center py-5 uppercase tracking-widest text-2xl text-white font-medium">
                ez-gamify
              </p>
              <Menus />
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
      </Drawer>
    </>
  );
};

export default Headers;
