"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import DotIcon from "@/app/assets/svg/dot";
import TextIcon from "@/app/assets/svg/text";
import PlusIcon from "@/app/assets/svg/plus";
import ImageIcon from "@/app/assets/svg/image";
import React, { useRef, useState } from "react";
import CancelIcon from "@/app/assets/svg/cancel";
import CssIcon from "../../../../../assets/svg/css";
import HtmlIcon from "../../../../../assets/svg/html";
import JsonIcon from "../../../../../assets/svg/json";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface AddInterface {}

const Add: React.FC<AddInterface> = () => {
  const fileInputRef: any = useRef(null);
  const gameInputRef: any = useRef(null);
  let [files, setFiles] = useState<any>([]);
  let [selectedPoster, setSelectedPoster] = useState<any>([]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    project_name: Yup.string().required("Required"),
    game_icon: Yup.string().required("Required"),
    entry_file: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      description: "",
      project_name: "",
      game_icon: "",
      entry_file: "index.html",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handelSelectPoster = () => {
    fileInputRef.current.click();
  };

  const handelSelectGame = () => {
    gameInputRef.current.click();
  };

  const handleGameSelected = async (event: { target: { files: any } }) => {
    const selectedFile = event.target.files;
    if (!selectedFile) return toast.error("Please select project");
    setFiles([...files, ...selectedFile]);
  };

  const handlePosterSelected = async (event: { target: { files: any } }) => {
    const fileList: any = event.target.files;
    if (!fileList) return;

    const formData: any = new FormData();
    formData.append("_id", getCookie("auth-id"));
    formData.append("mediaType", "game_image");
    for (const file of fileList) {
      // formData.append("files", file);
      console.log(file);
      
    }

    try {
      let response = await api({
        url: "/common/upload-game",
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });

      console.log(response);
    } catch (err: any) {
      console.log(err);
    }

    // const promises = [];
    // for (const file of fileList) {
    //   const reader = new FileReader();
    //   const promise = new Promise((resolve) => {
    //     reader.onload = (e: any) => resolve(e.target.result);
    //     reader.readAsDataURL(file);
    //   });
    //   promises.push(promise);
    // }

    // Promise.all(promises).then((imageUrls) => setSelectedPoster(imageUrls));
  };

  const uploadPoster = async () => {
    try {
      const formData: any = new FormData();
    } catch (err: any) {}
  };

  const removeFile = (index: any) => {
    const selectedFile = [...files];
    selectedFile.splice(index, 1);
    setFiles(selectedFile);
  };

  const removePoster = (index: any) => {
    const selectedImage = [...selectedPoster];
    selectedImage.splice(index, 1);
    setSelectedPoster(selectedImage);
  };

  const uploadGameCode = async () => {
    const formData: any = new FormData();
    formData.append("_id", getCookie("auth-id"));
    formData.append("folder", name);
    formData.append("mediaType", "game");
    files.forEach((file: any) => {
      formData.append("files", files);
    });
    try {
      let response = await api({
        url: "/common/upload-game",
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      console.log(response);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const addGame = async () => {
    uploadGameCode();
  };

  const types = [
    "application/json",
    "text/html",
    "text/css",
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
  ];

  return (
    <div className="bg-white dark:bg-dark-bg">
      <form>
        <div className="flex items-center justify-center">
          <div className="w-[100%] h-14 flex items-center justify-between mx-8 mt-4 rounded-md ">
            <p className="text-sm md:text-base"></p>
            <button type="submit" className="cursor-pointer" onClick={addGame}>
              <div className="border-[1px] flex items-center border-dark-primary-darkBlue/20 px-4 py-2 rounded-lg">
                <p className="mr-1 text-lg">Save</p>
              </div>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-8 mt-5">
          <div className="p-6 border-[1px] border-black/20 dark:border-dark-primary-darkBlue/10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 ml-1">Name</p>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name"
                  className="block min-w-full h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p style={{ color: "red" }}>{formik.errors.name}</p>
                ) : null}
              </div>
              <div>
                <p className="mb-1 ml-1">Title</p>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="title"
                  className="block w-full h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                  <p style={{ color: "red" }}>{formik.errors.title}</p>
                ) : null}
              </div>
            </div>
            <div className="mt-5">
              <p className="mb-1 ml-1">Description</p>
              <textarea
                id="description"
                name="description"
                placeholder="description"
                className="block w-full p-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                rows={5}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <p style={{ color: "red" }}>{formik.errors.description}</p>
              ) : null}
            </div>
          </div>
          <div className="p-6 border-[1px] border-black/20 dark:border-dark-primary-darkBlue/10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 ml-1">Project Name</p>
                <input
                  id="project_name"
                  name="project_name"
                  type="text"
                  placeholder="project name"
                  className="block min-w-full h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.project_name}
                />
                {formik.touched.project_name && formik.errors.project_name ? (
                  <p style={{ color: "red" }}>{formik.errors.project_name}</p>
                ) : null}
              </div>
              <div>
                <p className="mb-1 ml-1">Project Entrie File Name</p>
                <div className="flex items-center min-w-full h-10 px-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 ">
                  <p className="text-white/90">{formik.values.project_name}/</p>
                  <input
                    type="text"
                    placeholder="entrie file name"
                    className="w-full focus:outline-none"
                    disabled
                    value={formik.values.entry_file}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <p className="mb-1 ml-1">Game Icon</p>
              <input
                id="game_icon"
                name="game_icon"
                type="file"
                placeholder="project name"
                className="block min-w-full h-12 pl-2 pt-2 rounded-md dark:bg-dark-primary-black/10 border-[1px] border-gray/30 focus:outline-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.game_icon}
              />
              {formik.touched.game_icon && formik.errors.game_icon ? (
                <p style={{ color: "red" }}>{formik.errors.game_icon}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="px-8 mt-5">
          <p className="text-xl tracking-wider">Game Posters</p>
          <div className="grid grid-cols-12 gap-x-4 gap-y-8 p-6 mt-3 border-[1px] border-black/20 dark:border-dark-primary-darkBlue/10">
            <a
              href={void 0}
              onClick={handelSelectPoster}
              className="cursor-pointer"
            >
              <div className="w-24 h-24 border-[1px] border-white/20 flex items-center justify-center">
                <PlusIcon />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handlePosterSelected}
                  multiple
                />
              </div>
            </a>
            {selectedPoster &&
              selectedPoster.length !== 0 &&
              selectedPoster.map((item: any, index: number) => {
                return (
                  <div className="relative">
                    <PhotoProvider>
                      <PhotoView src={item}>
                        <img
                          src={item}
                          alt="item"
                          className="w-24 h-24 object-cover"
                        />
                      </PhotoView>
                    </PhotoProvider>
                    <a
                      href={void 0}
                      className="absolute -top-2 right-3 cursor-pointer"
                      onClick={() => removePoster(index)}
                    >
                      <div className="bg-dark-primary-blue p-1 rounded-full">
                        <CancelIcon />
                      </div>
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="px-8 mt-5 pb-12">
          <p className="text-xl tracking-wider">Game Files</p>
          <div className="flex items-center justify-between">
            <div className="w-[80%]">
              <div className="flex items-center">
                <DotIcon />
                <p className="dark:text-white/50">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus blanditiis consequatur ut aspernatur vel
                  laborum.
                </p>
              </div>
              <div className="flex items-center">
                <DotIcon />
                <p className="dark:text-white/50">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              <div className="flex items-center">
                <DotIcon />
                <p className="dark:text-white/50">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
            <a
              href={void 0}
              className="cursor-pointer inline-block"
              onClick={handelSelectGame}
            >
              <div className="border-[1px] flex items-center border-dark-primary-darkBlue/20 px-4 py-2 rounded-lg">
                <p className="mr-1 text-lg">Select</p>
                <input
                  type="file"
                  ref={gameInputRef}
                  style={{ display: "none" }}
                  onChange={handleGameSelected}
                  multiple
                />
              </div>
            </a>
          </div>
          {files && files.length !== 0 && (
            <div className="mt-3 border-[1px] border-black/20 dark:border-dark-primary-darkBlue/10">
              {files.map((item: any, index: number) => {
                return (
                  <div
                    className={`flex items-center justify-between p-5 ${
                      files.length - 1 == index
                        ? ""
                        : "border-b-[1px] border-white/5"
                    }`}
                  >
                    <div className="flex items-center">
                      {item.type == "text/css" && <CssIcon />}
                      {item.type == "text/html" && <HtmlIcon />}
                      {item.type == "application/json" && <JsonIcon />}
                      {!types.includes(item.type) && <TextIcon />}
                      {item.type == "image/png" ||
                      item.type == "image/jpg" ||
                      item.type == "image/jpeg" ||
                      item.type == "image/gif" ? (
                        <ImageIcon />
                      ) : null}
                      <p className="ml-2">{item.name}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="mr-12 text-white/50 text-sm">{item.type}</p>
                      <a
                        href={void 0}
                        onClick={() => removeFile(index)}
                        className="cursor-pointer"
                      >
                        <CancelIcon />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Add;
