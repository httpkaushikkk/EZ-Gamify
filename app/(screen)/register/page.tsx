"use client";
import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import api from "@/app/helper/axios";
import React, { useState } from "react";
import { setCookie } from "cookies-next";
import background from "../../assets/svg/background.svg";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";

interface RegisterInterface {}

const Register: React.FC<RegisterInterface> = () => {
  let [isUsername, setUsername] = useState<any>();
  let [isLoading, setLoading] = useState<Boolean>(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    username: Yup.string().min(4).required("Required"),
    mobile: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      mobile: "",
      country: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (isUsername) {
        setLoading(true);
        try {
          const data = await api({
            url: "/user/register",
            data: values,
            headers: {},
          });
          try {
            const wallet = await api({
              url: "/wallet/add",
              data: { user: data.data.user._id },
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.data.token}`,
              },
            });
            if (wallet.status == 1) {
              setCookie("auth-token", data.data.token);
              setCookie("auth-id", data.data.user._id);
              window.location.reload();
            }
          } catch (err: any) {
            setLoading(false);
            toast.error(err.response.data.message);
          }
        } catch (err: any) {
          setLoading(false);
          toast.error(err.response.data.message);
        }
      }
    },
  });

  function hasWord(userInput: string) {
    const trimmedInput = userInput.trim();
    return trimmedInput.length > 0;
  }

  const checkUsername = async () => {
    if (hasWord(formik.values.username)) {
      try {
        const data = await api({
          url: "/user/check-username",
          data: { username: formik.values.username },
          headers: {},
        });
        if (data.hasOwnProperty("message")) {
          setUsername(true);
        }
      } catch (err: any) {
        setUsername(false);
      }
    } else {
      setUsername(false);
    }
  };

  return (
    <React.Fragment>
      <Image
        src={background}
        alt="poster"
        className="w-screen h-screen object-cover"
      />
      <div className="w-screen h-screen object-cover bg-black/10 absolute top-0" />
      <div className="absolute h-screen top-0 left-0 right-0 bottom-0 flex flex-col justify-center py-12 sm:px-6 lg:px-8 mx-5">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="border-[1px] border-white/50 sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md pb-8">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                create a new account
              </h2>
              <p className="mt-2 text-center text-sm text-white max-w">
                Or
                <Link
                  href="/login"
                  className="font-medium text-[1.100rem] text-primary-normal ml-2"
                >
                  login to your account
                </Link>
              </p>
            </div>
            <form className="space-y-5" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-base font-medium text-white"
                >
                  Username
                </label>
                <div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                    placeholder="Enter username"
                    onChange={formik.handleChange}
                    onBlur={(e: any) => {
                      formik.handleBlur(e);
                      checkUsername();
                    }}
                    value={formik.values.username}
                  />
                </div>
                {formik.touched.username && formik.errors.username ? (
                  <p style={{ color: "red" }}>{formik.errors.username}</p>
                ) : null}
                <p
                  className={`${
                    isUsername
                      ? "text-green bg-white inline-block mt-1 px-2 rounded-xl"
                      : isUsername == false
                      ? "text-red bg-white inline-block mt-1 px-2 rounded-xl"
                      : ""
                  } `}
                >
                  {isUsername
                    ? "username is available!"
                    : isUsername == false
                    ? "username is not available!"
                    : ""}
                </p>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-base font-medium text-white"
                >
                  Name
                </label>
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                    placeholder="Enter your name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </div>
                {formik.touched.name && formik.errors.name ? (
                  <div style={{ color: "red" }}>{formik.errors.name}</div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-white"
                >
                  Email address
                </label>
                <div>
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
                  htmlFor="mobile"
                  className="block text-base font-medium text-white"
                >
                  Mobile No.
                </label>
                <div>
                  <input
                    id="mobile"
                    name="mobile"
                    type="number"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                    placeholder="Enter your Mobile No."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                  />
                </div>
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div style={{ color: "red" }}>{formik.errors.mobile}</div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-base font-medium text-white"
                >
                  Country
                </label>
                <div>
                  <select
                    name="country"
                    id=""
                    className="w-full border-[1.8px] h-10 rounded-md px-2 border-[#dee1e5] focus:outline-1 focus:outline-[#4f46e5]"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.country}
                  >
                    <option value="india">India</option>
                    <option value="nepal">Nepal</option>
                    <option value="pakistan">Pakistan</option>
                  </select>
                </div>
                {formik.touched.country && formik.errors.country ? (
                  <div style={{ color: "red" }}>{formik.errors.country}</div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-medium text-white"
                >
                  Password
                </label>
                <div>
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
                    className="ml-2 block text-sm text-white"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-white hover:text-blue-500"
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
                    <p className="text-white ">Register</p>
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

export default Register;
