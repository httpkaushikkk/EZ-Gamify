"use client";
import "./style.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import CopyIcon from "@/app/assets/svg/copy.svg";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

interface LinkGenerateInterface {
  open: boolean;
  handle: any;
  URL: any;
}

const LinkGenerate: React.FC<LinkGenerateInterface> = ({
  open,
  handle,
  URL,
}) => {
  const copyText = () => {
    navigator.clipboard
      .writeText(URL)
      .then((response) => {
        toast.success("URL copied");
      })
      .catch((err) => {
        console.error("Could not copy URL: ", err);
      });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="bg-primary-darken/20"
      >
        <DialogTitle id="alert-dialog-title">
          <p className="tracking-wider font-medium text-lg">
            {"Copy Your Live Game's URL"}
          </p>
        </DialogTitle>
        <DialogContent>
          <div className="flex items-center">
            <div className="overflow-hidden w-full border-[1px] border-primary-darken/40 rounded-sm p-2">
              <p>{URL}</p>
            </div>
            <a className="border-[1px] border-primary-darken/40 rounded-sm p-2 ml-2 cursor-pointer">
              <Image src={CopyIcon} alt="copy" onClick={copyText} />
            </a>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handle}>Done</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default LinkGenerate;
