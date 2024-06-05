"use client";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Wave from "../assets/svg/wave";
import Check from "../assets/svg/check";
import User from "../assets/svg/user";
import Key from "../assets/svg/key";
import Link from "next/link";
import { useTheme } from "next-themes";
import KeyLight from "../assets/svg/Key_light";
import Image from "next/image";
import game from "@/app/assets/image/game.png";
import api from "../helper/axios";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux'
import { add } from "../store/features/userSlice";

interface LoginInterface {}

const Login: React.FC<LoginInterface> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch()
  const { resolvedTheme } = useTheme();
  let [email, setEmail] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [isLoading, setLoading] = useState<Boolean>(false);

  const userAuth = async () => {
    if (email && password) {
      setLoading(true);
      try {
        const data = await api({
          url: "/admin/login",
          data: { email: email, password: password },
          headers: {}
        });
        if (data.status == 1) {
          setCookie("auth-token", data.token);
          setCookie("auth-id", data.admin._id);
          dispatch(add(data.admin.permission));
          router.push("/dashboard", { scroll: false });
        }
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        // toast.error(err.response.data.message)
        console.log(err);
        
      }
    } else {
      toast.error("Fields are not empty!");
    }
  };

  return (
    <div className="w-auto h-auto md:h-screen md:flex flex-col items-center justify-center bg-light-primary-white dark:bg-dark-primary-black">
      <div className="flex flex-col md:flex-row md:items-center md:border-[1px] p-4 mx-5 md:mx-0 xl:p-8 md:fixed border-gray/30 rounded-lg z-50 bg-light-primary-white dark:bg-dark-primary-black">
        <div className="md:w-[40%] bg-light-primary-mediumBlue/10 p-4 md:p-10 rounded-lg">
          <p className="text-2xl tracking-wide font-bold">Gemify</p>
          <p className="my-5 text-black/80 font-medium dark:text-light-primary-white">
            Give yourself some hassle-free development process with the
            uniqueness of Phoenix!
          </p>
          <div>
            <div className="flex items-center mb-2">
              <Check />
              <p className="ml-2 text-black/80 tracking-wider font-medium dark:text-light-primary-white">
                Fast
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Check />
              <p className="ml-2 text-black/80 tracking-wider font-medium dark:text-light-primary-white">
                Simple
              </p>
            </div>
            <div className="flex items-center">
              <Check />
              <p className="ml-2 text-black/80 tracking-wider font-medium dark:text-light-primary-white">
                Responsive
              </p>
            </div>
          </div>
          <Image src={game} alt="game" className="w-80 h-80 object-contain" />
        </div>
        <div className="md:w-[60%] flex flex-col md:items-center pt-5 md:pt-0">
          <div>
            <p className="text-center text-2xl tracking-wide font-bold">
              Sign In
            </p>
            <p className="text-center mt-1 dark:text-light-primary-white/80">
              Get access to your account
            </p>
          </div>
          <div className="my-10">
            <div>
              <p className="mb-1 ml-3 text-[0.80rem] font-medium dark:text-light-primary-white/40">
                EMAIL ADDRESS
              </p>
              <div className="md:w-96 h-10 px-2 flex items-center border-[1.2px] border-gray/30 rounded-md">
                <User />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-96 ml-2 bg-light-primary-white dark:bg-dark-primary-black focus:outline-none text-sm"
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-1 ml-3 text-[0.80rem] font-medium dark:text-light-primary-white/40">
                PASSWORD
              </p>
              <div className="md:w-96 h-10 px-2 flex items-center border-[1.2px] border-gray/30 rounded-md">
                {resolvedTheme == "light" ? <Key /> : <KeyLight />}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-96 ml-2 bg-light-primary-white dark:bg-dark-primary-black  focus:outline-none text-sm"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 rounded-lg overflow-hidden checked:bg-dark-primary-darkBlue"
                />
                <p className="ml-2 text-sm">Remember me</p>
              </div>
              {/* <Link href="/send-mail">
                <span className="text-sm tracking-wide font-bold text-dark-primary-darkBlue">
                  Forgot Password?
                </span>
              </Link> */}
            </div>
          </div>
          <div
            onClick={userAuth}
            className="md:w-96 h-9 mt-2 flex items-center justify-center rounded-md bg-dark-primary-darkBlue cursor-pointer"
          >
            {isLoading ? (
              <CircularProgress
                disableShrink
                size={23}
                sx={{ color: "#FFF" }}
              />
            ) : (
              <p className="text-white ">Sign In</p>
            )}
          </div>
        </div>
      </div>
      <div className="lg:block hidden absolute w-screen bottom-0 opacity-30">
        <Wave />
      </div>
    </div>
  );
};

export default Login;
