"use client";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface AddInterface {}

const Add: React.FC<AddInterface> = () => {
  let [username, setUsername] = useState<string>("");
  let [name, setName] = useState<string>("");
  let [email, setEmail] = useState<string>("");
  let [mobileNo, setMobileNo] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [country, setCountry] = useState<string>("");

  const addAdmin = async () => {
    try {
      let data = {
        is_create_admin: true,
        username: username,
        name: name,
        email: email,
        mobile: mobileNo,
        country: country,
        // profile_img: "",
        password: password,
        // permissions: [],  
      };
      let response = await api({
        url: "/user/register",
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (response.status == 1) {
        toast.success(response.message);
        username = "";
        name = "";
        email = "";
        mobileNo = "";
        country = "";
        password = "";
        setUsername(username);
        setName(name);
        setEmail(email);
        setMobileNo(mobileNo);
        setCountry(country);
        setPassword(password);
      }
    } catch (err: any) {
      if (err.response.data.hasOwnProperty("error")) {
        toast.error(err.response.data.error.replace(/\//g, ""));
      } else if (err.response.data.hasOwnProperty("message")) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-dark-bg">
      <div className="flex items-center justify-center">
        <div className="w-[100%] h-14 flex items-center justify-between mx-8 mt-8 rounded-md ">
          <p>Dashboard / Authenticator / Admin / Add</p>
          <a href={void 0} className="cursor-pointer" onClick={addAdmin}>
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
            <div className="">
              <p className="mb-1 ml-1">Password</p>
              <input
                type="text"
                placeholder="Enter Password"
                className="block w-96 h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
