import React, { useEffect } from "react";
import Accordion from "./component/accordion";
import AccordionUser from "@/app/assets/svg/according_user";
import Link from "next/link";
import PermissionIcon from "@/app/assets/svg/permission";
import GameIcon from "@/app/assets/svg/game";
import DemoIcon from "@/app/assets/svg/demo";
import WalletIcon from "@/app/assets/svg/wallet";
import TransactionIcon from "@/app/assets/svg/transaction";
import CurrencyIcon from "@/app/assets/svg/currency";
import HelpIcon from "@/app/assets/svg/help";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { add } from "@/app/store/features/userSlice";
import { useDispatch } from "react-redux";
import { checkPermission } from "@/app/helper/permission";

interface MenusInterface {}

const Menus: React.FC<MenusInterface> = () => {
  const dispatch = useDispatch();

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
        dispatch(add(response.response.permission));
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <div className="flex items-center">
          <p className="mb-3 tracking-wide text-sm dark:text-light-primary-white/50 font-medium">
            Game Management
          </p>
        </div>
        <div className="ml-2">
          {checkPermission("games-view") && (
            <Link href="/dashboard/games-management/games">
              <div className="flex items-center pb-3">
                <GameIcon />
                <span className="text-[0.900rem] ml-2 dark:text-light-primary-white">
                  Games
                </span>
              </div>
            </Link>
          )}
          {checkPermission("game-protest-view") && (
            <Link href="/dashboard/games-management/protest">
              <div className="flex items-center">
                <DemoIcon />
                <span className="text-[0.900rem] ml-2 dark:text-light-primary-white">
                  Protest
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center">
          <p className="mb-3 tracking-wide text-sm dark:text-light-primary-white/50 font-medium">
            Account Management
          </p>
        </div>
        <div className="ml-2">
          {checkPermission("wallet-view") && (
            <Link href="/dashboard/account-management/wallet">
              <div className="flex items-center">
                <WalletIcon />
                <span className="text-[0.900rem] ml-2 dark:text-light-primary-white">
                  Wallets
                </span>
              </div>
            </Link>
          )}
          {checkPermission("transaction-view") && (
            <Link href="/dashboard/account-management/transaction">
              <div className="flex items-center my-3">
                <TransactionIcon />
                <span className="text-[0.900rem] ml-2 dark:text-light-primary-white">
                  Transactions
                </span>
              </div>
            </Link>
          )}
          {checkPermission("currency-view") && (
            <Link href="/dashboard/account-management/currency">
              <div className="flex items-center">
                <CurrencyIcon />
                <span className="text-[0.900rem] ml-2 dark:text-light-primary-white">
                  Currency
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center">
          <p className="mb-3 tracking-wide text-sm dark:text-light-primary-white/50 font-medium">
            Authenticator
          </p>
        </div>
        <div className="ml-2">
          {checkPermission("authenticator-user-view") && (
            <Link href="/dashboard/authenticator/user">
              <div className="flex items-center pb-3">
                <AccordionUser />
                <span className="text-[0.900rem] ml-2 dark:text-light-primary-white">
                  User
                </span>
              </div>
            </Link>
          )}
          {checkPermission("") && (
            <Link href="/dashboard/authenticator/publisher">
              <div className="flex items-center pb-3">
                <AccordionUser />
                <span className="text-[0.900rem] ml-2 dark:text-light-primary-white">
                  Publisher
                </span>
              </div>
            </Link>
          )}
          {checkPermission("authenticator-admin-view") && (
            <Link href="/dashboard/authenticator/admin">
              <div className="flex items-center">
                <AccordionUser />
                <span className="text-[0.900rem] ml-2 dark:text-light-primary-white">
                  Admin User
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center">
          <p className="mb-3 tracking-wide text-sm dark:text-light-primary-white/50 font-medium">
            Module
          </p>
        </div>
        <div className="ml-2">
          {checkPermission("permission-view") && (
            <Link href="/dashboard/module/permission">
              <div className="flex items-center">
                <PermissionIcon />
                <span className="text-[0.900rem] ml-2 dark:text-light-primary-white">
                  Permission
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="mt-5">
        {checkPermission("get-in-touch-view") && (
          <div className="flex items-center">
            <p className="mb-3 tracking-wide text-sm dark:text-light-primary-white/50 font-medium">
              Get In Touch
            </p>
          </div>
        )}
        <div className="ml-2">
          {checkPermission("get-in-touch-view") && (
            <Link href="/dashboard/get-in-touch">
              <div className="flex items-center">
                <HelpIcon />
                <span className="text-[0.900rem] ml-2 dark:text-light-primary-white">
                  Help & Contact
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
      {/* <Accordion title="System User" icon={<AccordionUser />}>
        Content for Accordion 3
      </Accordion> */}
    </div>
  );
};

export default Menus;
