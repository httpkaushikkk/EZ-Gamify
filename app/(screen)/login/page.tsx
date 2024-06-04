"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import api from "@/app/helper/axios";
import { setCookie } from "cookies-next";
import background from "../../assets/svg/background.svg";
import CircularProgress from "@mui/material/CircularProgress";

interface LoginInterface {}

const Login: React.FC<LoginInterface> = () => {
  let [isLoading, setLoading] = useState<Boolean>(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const data = await api({
          url: "/user/login",
          data: values,
          headers: {},
        });
        console.log(data);

        if (data.status == 1) {
          setCookie("auth-token", data.data.token);
          setCookie("auth-id", data.data.user._id);
          window.location.reload();
        }
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        toast.error(err.response.data.message);
      }
    },
  });

  return (
    <React.Fragment>
      <Image
        src={background}
        alt="poster"
        className="w-screen h-screen object-cover"
      />
      <div className="w-screen h-screen object-cover bg-black/10 absolute top-0" />
      <div className="absolute h-screen top-0 right-0 left-0 bottom-0 flex flex-col justify-center py-12 sm:px-10 lg:px-8 mx-5">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="border-[1px] border-white/50 sm:rounded-lg sm:px-10 p-5">
            <div className="sm:mx-auto sm:w-full sm:max-w-md pb-8">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Login your account
              </h2>
              <p className="mt-2 text-center text-sm text-white max-w">
                Or
                <Link
                  href="/register"
                  className="font-medium text-[1.100rem] text-primary-normal ml-2"
                >
                  create an account
                </Link>
              </p>
            </div>
            <form className="space-y-5" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-white/90 tracking-wider"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                    placeholder="Enter your email address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-medium text-white/90 tracking-wider"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                ) : null}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-white/90 tracking-wider"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-white/90 tracking-wider"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="pb-5">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 bg-primary-darken text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isLoading ? (
                    <CircularProgress
                      disableShrink
                      size={23}
                      sx={{ color: "#FFF" }}
                    />
                  ) : (
                    <p className="text-white ">Login</p>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
