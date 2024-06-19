"use client";
import axios from "axios";
import Lottie from "lottie-react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { baseURL } from "@/app/helper/axios";
import success from "../../../assets/lottie/success.json";

interface VerifyInterface {}

const EmailVerify: React.FC<VerifyInterface> = ({ params }: any) => {
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const url = `${baseURL}/user/verify/${params.slug[0]}/${params.slug[1]}`;
        await axios.get(url);
      } catch (err: any) {
        console.log(err);
        // router.push("/verify/notfound");
      }
    };
    verifyEmail();
  }, []);

  return (
    <React.Fragment>
      <div className="w-screen h-screen bg-primary-darken flex items-center justify-center">
        <div className="w-[60vw] h-[60vh] bg-white rounded-xl flex flex-col items-center justify-center">
          <Lottie animationData={success} loop={true} className="w-64 h-64" />
          <p className="mt-3 text-3xl tracking-wide font-black text-primary-darken">
            Verified!
          </p>
          <p className="mt-3 text-xl">
            You have successfully Verified account.
          </p>
          <a href={void 0} onClick={() => router.replace("/login")}>
            <div className="border-[1px] px-8 py-2 mt-12 rounded-lg cursor-pointer">
              <p className="font-medium">Back to Login</p>
            </div>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmailVerify;
