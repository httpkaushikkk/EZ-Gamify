"use client";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AddInterface {}

const Add: React.FC<AddInterface> = () => {
  let [name, setName] = useState<string>("");
  let [email, setEmail] = useState<string>("");
  let [mobileNo, setMobileNo] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [module, setModule] = useState<any>([]);
  let [permissionData, setPermissionData] = useState<any>([]);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      let response = await api({
        url: "/module/fetch-all",
        data: { admin_id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (response.status == 1) {
        setModule(response.response);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const addAdmin = async () => {
    try {
      let data = {
        name: name,
        email: email,
        mobile: mobileNo,
        password: password,
        permissions: permissionData,
      };
      let response = await api({
        url: "/admin/add",
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (response.status == 1) {
        toast.success(response.message);
        name = "";
        email = "";
        mobileNo = "";
        password = "";
        setName(name);
        setEmail(email);
        setMobileNo(mobileNo);
        setPassword(password);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const addPermission = (e: any, item: any, prItem: any) => {
    setPermissionData([...permissionData, prItem]);
  };

  return (
    <div className="bg-white dark:bg-dark-bg">
      <div className="flex items-center justify-center">
        <div className="w-[100%] h-14 flex items-center justify-between mx-8 mt-8 rounded-md ">
          <p className="text-sm md:text-base">
            Dashboard / Authenticator / Admin / Add
          </p>
          <a href={void 0} className="cursor-pointer" onClick={addAdmin}>
            <div className="border-[1px] flex items-center border-dark-primary-darkBlue/20 px-4 py-2 rounded-lg">
              <p className="mr-1 text-lg">Save</p>
            </div>
          </a>
        </div>
      </div>
      <div>
        <div className="mx-8 mt-5 md:mt-0 md:inline-block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-[1px] p-6 border-black/20 dark:border-dark-primary-darkBlue/20">
            <div className="">
              <p className="mb-1 ml-1">Name</p>
              <input
                type="text"
                placeholder="Enter Name"
                className="block min-w-full md:w-64 lg:w-96 h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="">
              <p className="mb-1 ml-1">Email Address</p>
              <input
                type="email"
                placeholder="Enter Email"
                className="block w-full md:w-64 lg:w-96 h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="">
              <p className="mb-1 ml-1">Mobile No.</p>
              <input
                type="number"
                placeholder="Enter Mobile No."
                className="block w-full md:w-64 lg:w-96 h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
            <div className="">
              <p className="mb-1 ml-1">Password</p>
              <input
                type="text"
                placeholder="Enter Password"
                className="block w-full md:w-64 lg:w-96 h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-8 mt-5 md:inline-block">
        <div className="border-[1px] p-6 border-black/20 dark:border-dark-primary-darkBlue/20">
          <p className="tracking-wider text-lg">Permissions</p>
          <div>
            {module &&
              module.length != 0 &&
              module.map((item: any, index: number) => {
                return (
                  <div key={index} className="mt-5">
                    <div className="flex items-center">
                      <p className="text-lg tracking-wide">
                        {item.module_name}
                      </p>
                      {/* <input
                        id={item.name}
                        type="checkbox"
                        className="w-[1rem] h-[1rem] cursor-pointer ml-2"
                        onChange={(e) => addPermission(e, item, prItem)}
                      /> */}
                    </div>
                    <div className="grid grid-cols-5 gap-x-8 mt-2">
                      {item.permissions &&
                        item.permissions.length != 0 &&
                        item.permissions.map((prItem: any, prIndex: number) => {
                          return (
                            <div key={prIndex} className="flex items-center">
                              <input
                                id={item.name}
                                type="checkbox"
                                className="w-[1rem] h-[1rem] cursor-pointer"
                                onChange={(e) => addPermission(e, item, prItem)}
                              />
                              <label
                                htmlFor={item.name}
                                className="text-lg ml-2 capitalize "
                              >
                                {prItem.action_name}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
