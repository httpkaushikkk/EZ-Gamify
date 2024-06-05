"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import game from "@/app/assets/image/game.png";
import CircularProgress from "@mui/material/CircularProgress";
import Check from "@/app/assets/svg/check";
import User from "@/app/assets/svg/user";
import Wave from "@/app/assets/svg/wave";
import toast from "react-hot-toast";
import api from "@/app/helper/axios";

interface ForgotPasswordInterface {}

const ForgotPassword: React.FC<ForgotPasswordInterface> = () => {
  let [password, setPassword] = useState<string>('');
  let [confirmPassword, setConfirmPassword] = useState<string>('');
  let [isLoading, setLoading] = useState<Boolean>(false);

  const sendMain = async () => {
    if (password !== confirmPassword) {
      setLoading(true);
      try {
        const data = await api({
          url: "/admin/reset-password",
          data: { password },
        });
        if (data.status == 1) {
          toast.success(data.message);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    } else {
      toast.error("Passwords do not match. Please try again.");
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
              Reset new password
            </p>
            <p className="dark:text-light-primary-white/80 text-center mt-1">
              Type your new password
            </p>
          </div>
          <div className="my-10">
            <input
              type="password"
              name="password"
              placeholder="Type new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-96 h-10 mb-4 px-2 ml-2 bg-light-primary-white dark:bg-dark-primary-black focus:outline-none border-[1.4px] border-gray/30 rounded-md text-sm"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-96 h-10 px-2 ml-2 bg-light-primary-white dark:bg-dark-primary-black focus:outline-none border-[1.4px] border-gray/30 rounded-md text-sm"
            />
            <div
              onClick={sendMain}
              className="w-96 ml-2 flex items-center cursor-pointer justify-center mt-8 bg-dark-primary-darkBlue h-10 rounded-md"
            >
              <p className="text-white font-medium text-center">Set Password</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:block hidden absolute w-screen bottom-0 opacity-30">
        <Wave />
      </div>
    </div>
  );
};

export default ForgotPassword;
