"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import game from "../../../assets/svg/game.svg";
import dashboard from "../../../assets/svg/dashboard.svg";
import setting from "../../../assets/svg/setting.svg";
import user from "../../../assets/svg/user.svg";
import wallet from "../../../assets/svg/wallet.svg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
