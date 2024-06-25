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
import LinkGenerate from "@/app/components/dashboard/modals/link";
import CopyIcon from "@/app/assets/svg/copy.svg";
import EditAssets from "../component/edit_assets";

interface ViewInterface {}

const View = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params;
  let [game, setGame] = useState<any>({});
  let [user, setUser] = useState<any>({});
  let [URL, setURL] = useState<string>("");
  let [gameIDs, setGameIDs] = useState<any>([]);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [activeURL, setActiveURL] = useState<any>({});
  let [openEdit, setOpenEdit] = useState<boolean>(false);
  let [linkModal, setLinkModal] = useState<boolean>(false);
  let [isConfirmation, setConfirmation] = useState<boolean>(false);
  let [gameAssets, setGameAssets] = useState<any>([]);

  useEffect(() => {
    fetchGames();
    fetchUser();
    fetchUrl();
    fetchselectedGames();
  }, []);

  const fetchselectedGames = async () => {
    try {
      const data = await api({
        url: "/game/fetch-select-game",
        data: { game_id: slug, user_id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        if (data.response.hasOwnProperty("custom_assets")) {
          setGameAssets(data.response.custom_assets)
        }
      }
    } catch (err: any) {
      console.log(err);
      
      // toast.error(err.response.data.message);
    }
  };

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

  const fetchUser = async () => {
    try {
      const data = await api({
        url: "/user/fetch",
        data: { _id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        setUser(data.response);
        let ids = data.response.active_games.map((item: any) => item._id);
        setGameIDs(ids);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const editGameAssets = async () => {};

  const generateURL = async () => {
    try {
      const data = await api({
        url: "/generate-link",
        data: { _id: getCookie("auth-id"), game_id: slug },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("url")) {
        setURL(data.url);
        fetchUser();
        fetchUrl();
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const fetchUrl = async () => {
    try {
      const data = await api({
        url: "/game/active/fetch",
        data: { _id: getCookie("auth-id"), game_id: slug },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        setActiveURL(data.response);
      }
    } catch (err: any) {
      // toast.error(err.response.data.message);
    }
  };

  const editGameUrl = async () => {
    const obj = {
      _id: activeURL._id,
      user_id: getCookie("auth-id"),
      game_id: slug,
      is_active: activeURL.is_active == true ? false : true,
    };
    try {
      const data = await api({
        url: "/game/active/edit",
        data: obj,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("message")) {
        toast.success(data.message);
        fetchUrl();
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
    let newWindow: any;
    if (window !== undefined) {
      newWindow = window.open(
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
    }
    newWindow.location.href = imageURL + url;
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

  const copyText = () => {
    navigator.clipboard
      .writeText(activeURL && activeURL.game_url)
      .then((response) => {
        toast.success("URL copied");
      })
      .catch((err) => {
        console.error("Could not copy URL: ", err);
      });
  };

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
            {gameIDs &&
            gameIDs.length !== 0 &&
            gameIDs.includes(slug) ? null : (
              <PlayButton
                dataText="Generate"
                dataTitle="Link"
                onClick={() => setConfirmation(true)}
              />
            )}
            <PlayButton
              dataText="Edit Game"
              dataTitle="Edit Game"
              onClick={() => setOpenEdit(true)}
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
        {activeURL && Object.keys(activeURL).length != 0 && (
          <div className="m-5 flex items-center">
            <div className="overflow-hidden w-full border-[1px] border-primary-darken/40 rounded-sm p-2">
              <p>{activeURL.game_url}</p>
            </div>
            <a className="border-[1px] border-primary-darken/40 rounded-sm p-2 ml-2 cursor-pointer">
              <Image src={CopyIcon} alt="copy" onClick={copyText} />
            </a>
          </div>
        )}
        <div className="p-4">
          <p>{game.description}</p>
        </div>
        <a
          href={void 0}
          className="mx-4 bg-red/60 inline-block px-5 py-2 cursor-pointer rounded-md"
          onClick={editGameUrl}
        >
          <p className="capitalize text-white tracking-wider font-semibold">
            {activeURL && activeURL.is_active ? "deactivate" : "active"}
          </p>
        </a>
      </div>
      <Confirmation
        open={isConfirmation}
        body={"Are you sure want to generate production link ?"}
        handle={() => setConfirmation(false)}
        onClick={() => {
          setConfirmation(false);
          setTimeout(() => {
            setLinkModal(true);
            generateURL();
          }, 100);
        }}
      />
      <LinkGenerate
        open={linkModal}
        URL={URL}
        handle={() => setLinkModal(false)}
      />
      <EditAssets
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        data={gameAssets}
      />
    </React.Fragment>
  );
};

export default View;
