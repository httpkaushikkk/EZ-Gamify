"use client";
import React, { useState } from "react";
import Image from "next/image";
import game from "@/app/assets/image/game.png";
import CircularProgress from "@mui/material/CircularProgress";
import Check from "@/app/assets/svg/check";
import Wave from "@/app/assets/svg/wave";
import api from "@/app/helper/axios";
import toast from "react-hot-toast";

interface ForgotPasswordInterface {}

const ForgotPassword: React.FC<ForgotPasswordInterface> = () => {
  let [email, setEmail] = useState<string>("");
  let [isLoading, setLoading] = useState<Boolean>(false);

  const sendMain = async () => {
    if (email) {
      setLoading(true);
      try {
        const data = await api({
          url: "/admin/send-mail",
          data: { email: email },
        });
        if (data.status == 1) {
          toast.success(data.message);
        }
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        toast.error(err.response.data.message);
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
              Forgot your password?
            </p>
            <p className="dark:text-light-primary-white/80 text-center mt-1">
              Enter your email below and we will send you a reset link
            </p>
          </div>
          <div className="flex items-center my-10">
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-64 h-10 px-2 ml-2 bg-light-primary-white dark:bg-dark-primary-black focus:outline-none border-[1.4px] border-gray/30 rounded-md text-sm"
            />
            <a href={void 0} onClick={sendMain}>
              <div className="flex items-center bg-dark-primary-darkBlue h-10 px-2 ml-3 rounded-md">
                {isLoading ? (
                  <CircularProgress
                    disableShrink
                    size={23}
                    sx={{ color: "#FFF" }}
                  />
                ) : (
                  <>
                    <p className="text-white font-medium">Send</p>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 6l6 6l-6 6" />
                      </svg>
                    </span>
                  </>
                )}
              </div>
            </a>
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
