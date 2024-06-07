"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import api, { imageURL } from "@/app/helper/axios";
import leftArrow from "../../../../assets/svg/left.svg";
import rightArrow from "../../../../assets/svg/right.svg";
import PlayButton from "@/app/components/dashboard/buttons/play_button";
import { convertFilePathToURL } from "@/app/helper/convertFilePathToURL";
import Confirmation from "@/app/components/dashboard/modals/confirmation";

interface ViewInterface {}

const View = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params;
  let [game, setGame] = useState<any>({});
  let [currentIndex, setCurrentIndex] = useState(0);
  let [isConfirmation, setConfirmation] = useState<boolean>(false);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const data = await api({
        url: "/game/fetch",
        data: { _id: slug },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        setGame(data.response);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const openGame = (url: string) => {
    let width = 600;
    let height = 700;
    let left = screen.width / 2 - width / 2;
    let top = screen.height / 2 - height / 2;
    let newWindow: any = window.open(
      "",
      "_blank",
      "width=" +
        width +
        ", height=" +
        height +
        ", left=" +
        left +
        ", top=" +
        top
    );
    newWindow.location.href = imageURL + url;
    console.log(url);
  };

  const prevSlide = () => {
    if (game && typeof game !== "undefined" && game !== null) {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? game.poster.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    }
  };

  const nextSlide = () => {
    if (game && typeof game !== "undefined" && game !== null) {
      const isLastSlide = currentIndex === game.poster.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  };

  let filepath =
    game.poster && Array.isArray(game.poster) && game.poster.length > 0
      ? imageURL +
        game.poster[
          typeof currentIndex !== "undefined" &&
          currentIndex >= 0 &&
          currentIndex < game.poster.length
            ? currentIndex
            : 0
        ].path
      : "";

  return (
    <React.Fragment>
      <div className="p-5">
        <div>
          <div className="md:flex items-center px-4">
            <p className="text-3xl mb-2 tracking-wider font-medium ">
              {game.title}
            </p>
            <p className="text-sm font-medium ml-2">
              ({game.is_under_review ? "coming soon" : "Live"})
            </p>
          </div>
          <div className="flex items-center">
            <PlayButton
              dataText="Start!"
              dataTitle="Play Game"
              onClick={() => openGame(game.game_url)}
            />
            <PlayButton
              dataText="Generate"
              dataTitle="Link"
              onClick={() => setConfirmation(true)}
            />
          </div>
        </div>
        <div className="max-w-[1650px] h-[580px] w-full m-auto py-3 px-4 relative group">
          <div
            style={{
              backgroundImage: `url(${convertFilePathToURL(filepath)})`,
            }}
            className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
          ></div>
          {/* Left Arrow */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <Image
              src={leftArrow}
              alt="left"
              onClick={prevSlide}
              width={20}
              height={20}
            />
          </div>
          {/* Right Arrow */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <Image
              src={rightArrow}
              alt="right"
              onClick={nextSlide}
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="p-4">
          <p>{game.description}</p>
        </div>
      </div>
      <Confirmation
        open={isConfirmation}
        body={"Are you sure want to generate production link ?"}
        handle={() => setConfirmation(false)}
        onClick={() => {}}
      />
    </React.Fragment>
  );
};

export default View;
