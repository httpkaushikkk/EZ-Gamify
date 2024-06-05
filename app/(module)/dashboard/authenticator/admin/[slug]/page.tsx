"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import Link from "next/link";
import EditIcon from "@/app/assets/svg/edit";
import moment from "moment";
import Delete from "@/app/components/confirmation/delete";
import DeleteIcon from "@/app/assets/svg/delete";
import { checkPermission } from "@/app/helper/permission";

interface ViewInterface {}

const View: React.FC<ViewInterface> = ({ params }: any) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    fetchuser();
  }, []);

  const fetchuser = async () => {
    try {
      let response = await api({
        url: "/admin/fetch",
        data: { _id: params.slug },
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

  const deleteUser = async () => {
    try {
      let response = await api({
        url: "/admin/delete",
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
          <p>Dashboard / Authenticator / Admin</p>
          <div className="flex items-center">
            {!checkPermission("authenticator-admin-edit") && (
              <Link
                href={`/dashboard/authenticator/admin/edit/${user._id}`}
                className="cursor-pointer"
              >
                <div className="flex items-center border-[1px] border-dark-primary-darkBlue/20 px-4 py-2 rounded-lg">
                  <p className="mr-2 text-lg">Edit</p>
                  <EditIcon />
                </div>
              </Link>
            )}
            {checkPermission("authenticator-admin-delete") && (
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
            )}
          </div>
        </div>
      </div>
      <div className="inline-block border-[1px] border-black/20 dark:border-white/15 rounded-md mx-8 p-6">
        <p className="mb-5 text-lg tracking-wide font-medium">General</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2">Name</p>
            <p className="mb-2">Email</p>
            <p className="mb-2">Mobile</p>
            <div className="pt-4">
              <p className="mb-2">CreatedAt</p>
              <p className="mb-2">UpdatedAt</p>
            </div>
          </div>
          <div>
            <p className="mb-2">{user.name}</p>
            <p className="mb-2">{user.email}</p>
            <p className="mb-2">{user.mobile}</p>
            <div className="pt-4">
              <p className="mb-2">
                {moment(user.createdAt).format("DD-MM-YYYY")}
              </p>
              <p className="mb-2">
                {moment(user.updatedAt).format("DD-MM-YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Delete
        open={open}
        handleClose={() => setOpen(false)}
        handleAction={deleteUser}
      />
    </div>
  );
};

export default View;
