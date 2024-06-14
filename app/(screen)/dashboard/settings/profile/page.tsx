"use client";
import api, { imageURL } from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import plusIcon from "@/app/assets/svg/plus.svg";
import editIcon from "@/app/assets/svg/edit.svg";
import Image from "next/image";

interface ProfileInterface {}

const Profile: React.FC<ProfileInterface> = () => {
  const fileInputRef: any = useRef(null);
  const fileInputEditRef: any = useRef(null);
  let [name, setName] = useState<string>("");
  let [email, setEmail] = useState<string>("");
  let [mobile, setMobile] = useState<string>("");
  let [userData, setUserData] = useState<any>([]);
  let [username, setUserName] = useState<string>("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const onChangeState = (data: any) => {
    setUserName(data.username);
    setName(data.name);
    setEmail(data.email);
    setMobile(data.mobile);
  };

  const fetchProfile = async () => {
    try {
      const data = await api({
        url: "/user/fetch",
        data: { _id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        setUserData(data.response);
        onChangeState(data.response);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const editProfile = async () => {
    try {
      const data = await api({
        url: "/user/edit",
        data: {
          _id: getCookie("auth-id"),
          username: username,
          name: name,
          mobile: mobile,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("message")) {
        toast.success(data.message);
        fetchProfile();
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const editProfileImage = async (profile: any) => {
    try {
      const data = await api({
        url: "/user/edit",
        data: {
          _id: getCookie("auth-id"),
          profile_img: profile,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("message")) {
        toast.success(data.message);
        fetchProfile();
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files[0];
    const url = URL.createObjectURL(selectedFile);
    try {
      const formData: any = new FormData();
      formData.append("_id", getCookie("auth-id"));
      formData.append("mediaType", "profile");
      formData.append("file", selectedFile);

      const data = await api({
        url: "/common/upload-profile",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("data")) {
        editProfileImage(data.data.path);
      }
      if (data.hasOwnProperty("message")) {
        toast.success(data.message);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="m-8">
      <div className="h-full bg-white border-[1px] border-primary-darken/15 p-5">
        <p className="font-medium tracking-wide text-primary-darken text-2xl">
          Profile
        </p>
        <div className="flex">
          <div className="mt-5">
            {userData.profile_img ? (
              <div className="w-64 h-64 relative border-[1px] border-primary-darken border-dashed flex items-center justify-center">
                <Image
                  src={imageURL + userData.profile_img}
                  alt="profile"
                  width={200}
                  height={200}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <a
                  href={void 0}
                  onClick={handleClick}
                  className="cursor-pointer"
                >
                  <div className="absolute -top-3 -right-3 bg-primary-darken p-2 rounded-full">
                    <Image src={editIcon} alt="icon" className="w-5 h-5" />
                  </div>
                </a>
              </div>
            ) : (
              <a href={void 0} onClick={handleClick} className="cursor-pointer">
                <div className="w-64 h-64 border-[1px] border-primary-darken border-dashed flex items-center justify-center">
                  <Image src={plusIcon} alt="icon" className="w-24 h-24" />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </a>
            )}
          </div>
          <div className="ml-8 mt-4 grid grid-cols-2 gap-12">
            <div>
              <p>Username</p>
              <input
                type="text"
                className="w-96 h-10 text-lg tracking-wide border-b-[1px] border-primary-darken/50 focus:outline-none"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={editProfile}
              />
            </div>
            <div className="">
              <p>Name</p>
              <input
                type="text"
                className="w-96 h-10 text-lg tracking-wide border-b-[1px] border-primary-darken/50 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={editProfile}
              />
            </div>
            <div className="">
              <p>Mobile No.</p>
              <input
                type="text"
                className="w-96 h-10 text-lg tracking-wide border-b-[1px] border-primary-darken/50 focus:outline-none"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                onBlur={editProfile}
              />
            </div>
            <div className="">
              <p>Email ID</p>
              <input
                type="text"
                className="w-96 h-10 text-lg tracking-wide border-b-[1px] border-primary-darken/50 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={editProfile}
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
