import React from "react";
import Poster from "../app/assets/poster_2.jpg";
import NavBar from "./components/website/navbar";
import Image from "next/image";

const Home = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div className="w-screen h-96">
        <div className="relative">
          <Image
            src={Poster}
            alt="poster"
            className="w-screen h-[48rem] object-cover"
          />
          <div className="w-screen h-[48rem] bg-black/40 absolute top-0" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
