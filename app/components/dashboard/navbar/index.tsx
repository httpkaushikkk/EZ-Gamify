"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import bell from "../../../assets/svg/bell.svg";
import menu from "../../../assets/svg/menu.svg";
import game from "../../../assets/svg/game.svg";
import profile from "../../../assets/profile.jpg";
import dashboard from "../../../assets/svg/dashboard.svg";
import api, { imageURL } from "@/app/helper/axios";
import toast from "react-hot-toast";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import setting from "../../../assets/svg/setting.svg";
import user from "../../../assets/svg/user.svg";
import wallet from "../../../assets/svg/wallet.svg";

interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  let [userData, setUserData] = useState<any>([]);
  let [walletData, setWalletData] = useState<any>({});

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    fetchWallet();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await api({
        url: "/user/fetch",
        data: { _id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        setUserData(data.response);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const fetchWallet = async () => {
    try {
      const data = await api({
        url: "/wallet/fetch",
        data: { user_id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.status == 1) {
        if (data.hasOwnProperty("response")) {
          setWalletData(data.response);
        }
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      // onClick={toggleDrawer(false)}
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
            <Accordion
              slotProps={{ transition: { unmountOnExit: true } }}
              sx={{ bgcolor: "#395886", boxShadow: "none", marginTop: 1 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="text-white" />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ bgcolor: "#395886", boxShadow: "none" }}
              >
                <Image src={setting} alt="" className="w-6 h-6 -ml-2" />
                <p className="ml-3 text-white tracking-wider">Settings</p>
              </AccordionSummary>
              <AccordionDetails>
                <Link href="/dashboard/settings/profile">
                  <div
                    className={`flex items-center h-10 px-2 ml-2 ${
                      pathname === "/dashboard/settings/profile"
                        ? "bg-primary-dark/35 rounded-lg"
                        : ""
                    }`}
                  >
                    <Image
                      src={user}
                      alt=""
                      className="w-[1.35rem] h-[1.35rem]"
                    />
                    <span className="ml-3 text-white tracking-wider text-[0.950rem]">
                      Profile
                    </span>
                  </div>
                </Link>
                <Link href="/dashboard/settings/wallet">
                  <div
                    className={`flex items-center h-10 px-2 ml-2 mt-3 ${
                      pathname === "/dashboard/settings/wallet"
                        ? "bg-primary-dark/35 rounded-lg"
                        : ""
                    }`}
                  >
                    <Image
                      src={wallet}
                      alt=""
                      className="w-[1.35rem] h-[1.35rem]"
                    />
                    <span className="ml-3 text-white tracking-wider text-[0.950rem]">
                      Wallet
                    </span>
                  </div>
                </Link>
              </AccordionDetails>
            </Accordion>
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
              {walletData.currency && walletData.currency[0].symbol}
            </div>
            <p className="ml-1 text-lg">{walletData.balance}</p>
          </div>
          <a href={void 0} className="cursor-pointer">
            <Image src={bell} alt="" className="w-8 h-8 mx-4" />
          </a>
          <div className="w-12 h-12 flex items-center justify-center rounded-full border-[1px] border-black/15">
            <Image
              src={imageURL + userData.profile_img}
              alt="profile"
              width={35}
              height={35}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </React.Fragment>
  );
};

export default Navbar;
