"use client";
import CancelIcon from "@/app/assets/svg/cancel";
import PlusIcon from "@/app/assets/svg/plus";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface AddInterface {}

const Add: React.FC<AddInterface> = () => {
  let [moduleName, setModuleName] = useState<string>("");
  let [modulePath, setModulePath] = useState<string>("");
  let [permissions, setPermissions] = useState<any>([
    { action_name: "", name: "" },
  ]);

  const handleAddInput = () => {
    setPermissions([...permissions, { action_name: "", name: "" }]);
  };

  const handleInputChange = (index: number, fieldName: string, value: any) => {
    const newPermissions = [...permissions];
    newPermissions[index][fieldName] = value;
    setPermissions(newPermissions);
  };

  const handleRemoveInput = (index: number) => {
    if(permissions.length == 1) return;
    const newPermissions = [...permissions];
    newPermissions.splice(index, 1);
    setPermissions(newPermissions);
  };

  const addModule = async () => {
    try {
      let data = {
        admin_id: getCookie("auth-id"),
        module_name: moduleName,
        module_path: modulePath,
        permissions: permissions,
      };
      let response = await api({
        url: "/module/add",
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (response.status == 1) {
        toast.success(response.message);
        moduleName = "";
        modulePath = "";
        permissions = [{ action_name: "", name: "" }]
        setModuleName(moduleName);
        setModulePath(modulePath);
        setPermissions(permissions)
        
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-bg">
      <div className="flex items-center justify-center">
        <div className="w-[100%] h-14 flex items-center justify-between mx-8 mt-8 rounded-md ">
          <p className="text-sm md:text-base">
            Dashboard / Module / Permission / Add
          </p>
          <a href={void 0} className="cursor-pointer" onClick={addModule}>
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
              <p className="mb-1 ml-1">Module Name</p>
              <input
                type="text"
                placeholder="Enter Module Name"
                className="block min-w-full md:w-64 lg:w-96 h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
              />
            </div>
            <div className="">
              <p className="mb-1 ml-1">Module Path</p>
              <input
                type="text"
                placeholder="Enter Module Path"
                className="block w-full md:w-64 lg:w-96 h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                value={modulePath}
                onChange={(e) => setModulePath(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="block my-2" />
        <div className="mx-8 mt-5 md:mt-0 md:inline-block">
          <div className="border-[1px] p-6 border-black/20 dark:border-dark-primary-darkBlue/20">
            <div className="">
              <div className="flex items-center justify-between">
                <p className="mb-1 ml-1">Permission</p>
                <a
                  href={void 0}
                  onClick={handleAddInput}
                  className="cursor-pointer"
                >
                  <PlusIcon />
                </a>
              </div>
              <div className="mt-4">
                {permissions.map((input: any, index: number) => (
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      key={index}
                      value={input.action_name}
                      onChange={(e) =>
                        handleInputChange(index, "action_name", e.target.value)
                      }
                      placeholder="Enter Action"
                      className="block mt-2 w-full md:w-64 lg:w-96 h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                    />
                    <input
                      type="text"
                      key={index}
                      value={input.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                      placeholder="Enter Permission Name"
                      className="block mt-2 ml-4 w-full md:w-64 lg:w-96 h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                    />
                    <a
                      href={void 0}
                      onClick={() => handleRemoveInput(index)}
                      className="ml-5 mt-1 cursor-pointer"
                    >
                      <CancelIcon />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
