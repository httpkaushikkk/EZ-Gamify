"use client";
import PlusIcon from "@/app/assets/svg/plus";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SortIcon from "@/app/assets/svg/sort";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import Link from "next/link";
import { Switch } from "@mui/material";
import { checkPermission } from "@/app/helper/permission";

interface AdminInterface {}

const Admin: React.FC<AdminInterface> = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      let response = await api({
        url: "/admin/fetch-all",
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

  const changeStatus = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    try {
      let response = await api({
        url: "/admin/edit",
        data: { _id: id, status: event.target.checked },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      toast.success(response.message);
      fetchAdmin();
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-bg">
      <div className="flex items-center justify-center">
        <div className="w-[100%] h-14 flex items-center justify-between mx-8 mt-8 rounded-md ">
          <p>Dashboard / Authenticator / Admin</p>
          {checkPermission("authenticator-admin-add") && (
            <Link
              href="/dashboard/authenticator/admin/add"
              className="cursor-pointer"
            >
              <div className="flex items-center border-[1px] border-dark-primary-darkBlue/20 px-4 py-2 rounded-lg">
                <p className="mr-1 text-lg">Add</p>
                <PlusIcon />
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="mt-3 px-8">
        <div className="overflow-x-auto">
          <table className="border border-black/20 divide-black/30 dark:border-light-primary-white/15 table-auto min-w-full divide-y dark:divide-light-primary-white/15">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-light-primary-white/70">
                  #
                </th>
                <th className="min-w-[20rem] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <a href={void 0} className="flex items-center cursor-pointer">
                    <span className="mr-1 dark:text-light-primary-white/70">
                      Name
                    </span>
                    <SortIcon />
                  </a>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-light-primary-white/70">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <a href={void 0} className="flex items-center cursor-pointer">
                    <span className="mr-1 dark:text-light-primary-white/70">
                      Mobile No.
                    </span>
                    <SortIcon />
                  </a>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <a
                    href={void 0}
                    className="flex items-center justify-end cursor-pointer"
                  >
                    <span className="block mr-1 dark:text-light-primary-white/70">
                      Status
                    </span>
                    <SortIcon />
                  </a>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide divide-black/10 dark:divide-light-primary-white/15">
              {user &&
                user.length != 0 &&
                user.map((item: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      className="cursor-pointer"
                      onDoubleClick={() => {
                        router.push(
                          `/dashboard/authenticator/admin/${item._id}`
                        );
                      }}
                    >
                      <td className="px-6 py-1 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap">
                        {item.email}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap">
                        {item.mobile}
                      </td>
                      <td className="px-6 py-1 text-right whitespace-nowrap">
                        <Switch
                          checked={item.status}
                          onChange={(e) => changeStatus(e, item._id)}
                        />
                        {/* {item.status == true ? "Active" : "Block"} */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
