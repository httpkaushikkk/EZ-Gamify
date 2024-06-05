"use client";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import Link from "next/link";
import EditIcon from "@/app/assets/svg/edit";
import moment from "moment";
import DeleteIcon from "@/app/assets/svg/delete";
import Delete from "@/app/components/confirmation/delete";

interface ViewInterface {}

const View: React.FC<ViewInterface> = ({ params }: any) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    fetchModule();
  }, []);

  const fetchModule = async () => {
    try {
      let response = await api({
        url: "/module/fetch",
        data: { _id: params.slug, admin_id: getCookie("auth-id") },
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

  const deleteModule = async () => {
    try {
      let response = await api({
        url: "/module/delete",
        data: { _id: params.slug, admin_id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      toast.success(response.message);
      router.back();
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-bg">
      <div className="flex items-center justify-center">
        <div className="w-[100%] h-14 flex items-center justify-between mx-8 mt-8 rounded-md ">
          <p>Dashboard / Module / Permission</p>
          <div className="flex items-center">
            <Link
              href={`/dashboard/module/permission/edit/${user._id}`}
              className="cursor-pointer"
            >
              <div className="flex items-center border-[1px] border-dark-primary-darkBlue/20 px-4 py-2 rounded-lg">
                <p className="mr-2 text-lg">Edit</p>
                <EditIcon />
              </div>
            </Link>
            <a
              href={void 0}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <div className="flex items-center border-[1px] border-dark-primary-darkBlue/20 px-4 py-2 rounded-lg">
                <p className="mr-2 text-lg text-[#FF0000]">Delete</p>
                <DeleteIcon />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="inline-block border-[1px] border-black/20 dark:border-white/15 rounded-md mx-8 p-6">
        <p className="mb-5 text-lg tracking-wide font-medium">General</p>
        <div className="flex items-center">
          <div>
            <p className="mb-2">Module Name</p>
            <p className="mb-2">Module Path</p>
          </div>
          <div className="ml-12">
            <p className="mb-2">{user.module_name}</p>
            <p className="mb-2">{user.module_path}</p>
          </div>
        </div>
      </div>
      <div className="block my-2" />
      <div className="mb-5 px-8 block">
        <div className="overflow-x-auto">
          <table className="border border-black/20 divide-black/30 dark:border-light-primary-white/15 table-auto min-w-full divide-y dark:divide-light-primary-white/15">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-light-primary-white/70">
                  #
                </th>
                <th className="min-w-[20rem] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permission
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide divide-black/10 dark:divide-light-primary-white/15">
              {user.permissions &&
                user.permissions.length != 0 &&
                user.permissions.map((item: any, index: number) => {
                  return (
                    <tr key={index} className="cursor-pointer">
                      <td className="px-6 py-2 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        {item.action_name}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        {item.name}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="inline-block border-[1px] border-black/20 dark:border-white/15 rounded-md mx-8 p-6">
        <p className="mb-5 text-lg tracking-wide font-medium">Security</p>
        <div className="flex items-center">
          <div>
            <p className="mb-2">Module Creater</p>
            <p className="mb-2">Module Updater</p>
            <p className="mb-2">CreatedAt</p>
            <p className="mb-2">UpdatedAt</p>
          </div>
          <div className="ml-12">
            <p className="mb-2">{user.management && user.management.creater}</p>
            <p className="mb-2">{user.management && user.management.updater}</p>
            <p className="mb-2">
              {moment(user.createdAt).format("DD-MM-YYYY")}
            </p>
            <p className="mb-2">
              {moment(user.updatedAt).format("DD-MM-YYYY")}
            </p>
          </div>
        </div>
      </div>
      <Delete
        open={open}
        handleClose={() => setOpen(false)}
        handleAction={deleteModule}
      />
    </div>
  );
};

export default View;
