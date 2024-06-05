"use client";
import { useRouter } from "next/navigation";
import PlusIcon from "@/app/assets/svg/plus";
import SortIcon from "@/app/assets/svg/sort";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Switch } from "@mui/material";

interface PermissionInterface {}

const Permission: React.FC<PermissionInterface> = () => {
  const router = useRouter();
  const [module, setModule] = useState<any>();

  useEffect(() => {
    fetchModule();
  }, []);

  const fetchModule = async () => {
    try {
      let response = await api({
        url: "/module/fetch-all",
        data: { admin_id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (response.hasOwnProperty("response")) {
        setModule(response.response);
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
        url: "/module/edit",
        data: {
          _id: id,
          admin_id: getCookie("auth-id"),
          is_active: event.target.checked,
          permissions: [],
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      toast.success(response.message);
      fetchModule();
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-bg">
      <div className="flex items-center justify-center">
        <div className="w-[100%] h-14 flex items-center justify-between mx-8 mt-8 rounded-md ">
          <p>Dashboard / Module / Permission</p>
          <Link
            href="/dashboard/module/permission/add"
            className="cursor-pointer"
          >
            <div className="flex items-center border-[1px] border-dark-primary-darkBlue/20 px-4 py-2 rounded-lg">
              <p className="mr-1 text-lg">Add</p>
              <PlusIcon />
            </div>
          </Link>
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
                  Module Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-light-primary-white/70">
                  Module Path
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide divide-black/10 dark:divide-light-primary-white/15">
              {module &&
                module.length != 0 &&
                module.map((item: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      className="cursor-pointer"
                      onDoubleClick={() => {
                        router.push(
                          `/dashboard/module/permission/${item._id}`
                        );
                      }}
                    >
                      <td className="px-6 py-1 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap">
                        {item.module_name}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap">
                        {item.module_path}
                      </td>
                      <td className="px-6 py-1 text-right whitespace-nowrap">
                        <Switch
                          checked={item.is_active}
                          onChange={(e) => changeStatus(e, item._id)}
                        />
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

export default Permission;
