"use client";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EditInterface {}

const Add: React.FC<EditInterface> = ({ params }: any) => {
  const route = useRouter();
  let [username, setUsername] = useState<string>("");
  let [name, setName] = useState<string>("");
  let [email, setEmail] = useState<string>("");
  let [mobileNo, setMobileNo] = useState<string>("");
  let [country, setCountry] = useState<string>("");

  useEffect(() => {
    fetchuser();
  }, []);

  const fetchuser = async () => {
    try {
      let response = await api({
        url: "/user/fetch",
        data: { _id: params.slug },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (response.hasOwnProperty("response")) {
        setUsername(response.response.username);
        setName(response.response.name);
        setEmail(response.response.email);
        setMobileNo(response.response.mobile);
        setCountry(response.response.country);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const editUser = async () => {
    try {
      let response = await api({
        url: "/user/edit",
        data: {
          _id: params.slug,
          name: name,
          mobile: mobileNo,
          email: email,
          username: username,
          country: country,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      toast.success(response.message);
      route.back();
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-bg">
      <div className="flex items-center justify-center">
        <div className="w-[100%] h-14 flex items-center justify-between mx-8 mt-8 rounded-md ">
          <p>Dashboard / Authenticator / Admin / Edit</p>
          <a href={void 0} className="cursor-pointer" onClick={editUser}>
            <div className="border-[1px] flex items-center border-dark-primary-darkBlue/20 px-4 py-2 rounded-lg">
              <p className="mr-1 text-lg">Save</p>
            </div>
          </a>
        </div>
      </div>
      <div>
        <div className="mx-8 inline-block">
          <div className="grid grid-cols-2 gap-8 border-[1px] p-6 border-black/20 dark:border-dark-primary-darkBlue/20">
            <div className="">
              <p className="mb-1 ml-1">Username</p>
              <input
                type="text"
                placeholder="Enter Username"
                className="block w-96 h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="">
              <p className="mb-1 ml-1">Name</p>
              <input
                type="text"
                placeholder="Enter Name"
                className="block w-96 h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="">
              <p className="mb-1 ml-1">Email Address</p>
              <input
                type="email"
                placeholder="Enter Email"
                className="block w-96 h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="">
              <p className="mb-1 ml-1">Mobile No.</p>
              <input
                type="number"
                placeholder="Enter Mobile No."
                className="block w-96 h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
            <div className="">
              <p className="mb-1 ml-1">Country</p>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="appearance-auto bg-transparent block w-96 h-10 px-2 rounded-md border-[1px] border-gray/30 focus:outline-none"
              >
                <option value="india">India</option>
                <option value="pakistan">Pakistan</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-8 inline-block mt-4">
        <div className="grid grid-cols-2 gap-8 border-[1px] p-6 border-black/20 dark:border-dark-primary-darkBlue/20">
          <p className="tracking-wider text-lg">Permissions</p>
        </div>
      </div>
    </div>
  );
};

export default Add;
