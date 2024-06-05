"use client";
import React from "react";
import Menus from "./menus";
import { deleteCookie } from "cookies-next";

interface DrawerInterface {}

const Drawer: React.FC<DrawerInterface> = ({}) => {
  return (
    <div className="h-screen sticky top-0 ">
      <div className="w-60 h-full bg-light-primary-white dark:bg-dark-primary-black/50 border-r-[1.4px] border-r-gray/20">
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
    </div>
  );
};

export default Drawer;
