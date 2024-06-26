"use client";
import api, { imageURL } from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/app/store/loader/loaderSlice";
import toast from "react-hot-toast";

interface BoughtGamesIntreface {}

const BoughtGames: React.FC<BoughtGamesIntreface> = () => {
  const route = useRouter();
  let dispatch = useDispatch();
  let [games, setGames] = useState<any>([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    dispatch(showLoader());
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
        if (data.response.hasOwnProperty("games")) {
          setGames(data.response.games);
          dispatch(hideLoader());
        }
      }
    } catch (err: any) {
      dispatch(hideLoader());
      toast.error(err.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <div className="w-full h-screen bg-primary-extraLight">
        <p className="p-5 font-bold tracking-wide text-primary-darken">
          Selected Games
        </p>
        {games && games.length != 0 && (
          <div className="mx-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
            {games.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    route.push(`/dashboard/selected-games/${item._id}`)
                  }
                  className="rounded-lg overflow-hidden cursor-pointer border-[1px] border-primary-darken/25 flex text-center justify-center"
                >
                  <Image
                    src={imageURL + item.game_icon}
                    alt={item.game_icon}
                    className="object-cover p-2"
                    width={120}
                    height={120}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default BoughtGames;
