"use client";
import React from "react";
import type { RootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface LoaderInterface {}

const Loader: React.FC<LoaderInterface> = () => {
  const loader = useSelector((state: RootState) => state.loader.value);
  return (
    <React.Fragment>
      {loader && (
        <div className="w-screen h-screen absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </React.Fragment>
  );
};

export default Loader;
