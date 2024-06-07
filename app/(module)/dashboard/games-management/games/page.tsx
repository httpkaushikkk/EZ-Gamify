"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import api, { imageURL } from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import PlusIcon from "@/app/assets/svg/plus";
import React, { useEffect, useState } from "react";
import { checkPermission } from "@/app/helper/permission";

interface GamesInterface {}

const Games: React.FC<GamesInterface> = () => {
  const route = useRouter();
  let [liveGame, setLiveGame] = useState<any>([]);
  let [reviewGames, setReviewGames] = useState<any>([]);
  let [gamesType, setGamesType] = useState<any>("live");

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      let data = await api({
        url: "/game/fetch-all",
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        let liveGames = [];
        let underReviewGames = [];
        for (let i = 0; i < data.response.length; i++) {
          if (data.response[i].is_under_review == false) {
            liveGames.push(data.response[i]);
          } else if (data.response[i].is_under_review) {
            underReviewGames.push(data.response[i]);
          }
        }
        setLiveGame(liveGames);
        setReviewGames(underReviewGames);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-bg">
      <div className="flex items-center justify-center">
        <div className="w-[100%] h-14 flex items-center justify-between mx-8 mt-4 rounded-md ">
          <div className="flex items-center">
            <a
              href={void 0}
              onClick={() => setGamesType("live")}
              className="cursor-pointer"
            >
              <p
                className={`${
                  gamesType == "live"
                    ? "font-bold tracking-wide text-white"
                    : "text-white/50 tracking-wide"
                }`}
              >
                Live Games
              </p>
            </a>
            <p className="mx-2">|</p>
            <a
              href={void 0}
              onClick={() => setGamesType("soon")}
              className="cursor-pointer"
            >
              <p
                className={`${
                  gamesType == "soon"
                    ? "font-bold tracking-wide text-white"
                    : "text-white/50 tracking-wide"
                }`}
              >
                Under Review
              </p>
            </a>
          </div>
          {checkPermission("games-add") && (
            <Link
              href="/dashboard/games-management/games/add"
              className="cursor-pointer"
            >
              <div className="flex items-center border-[1px] border-dark-primary-darkBlue/20 px-4 py-2 rounded-lg">
                <p className="mr-1 text-lg">Add</p>
                <PlusIcon />
              </div>
            </Link>
          )}
        </div>
      </div>
      <React.Fragment>
        {gamesType == "live" ? (
          <React.Fragment>
            <div className="mx-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
              {liveGame &&
                liveGame.length != 0 &&
                liveGame.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() =>
                        route.push(
                          `/dashboard/games-management/games/${item._id}`
                        )
                      }
                      className="rounded-lg overflow-hidden cursor-pointer border-[1px] border-dark-primary-blue/50 flex items-center justify-center"
                    >
                      <img
                        src={imageURL + item.game_icon}
                        alt={item.game_icon}
                        className="object-cover"
                        width={120}
                        height={120}
                      />
                    </div>
                  );
                })}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="mx-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
              {reviewGames &&
                reviewGames.length != 0 &&
                reviewGames.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() =>
                        route.push(
                          `/dashboard/games-management/games/${item._id}`
                        )
                      }
                      className="rounded-lg overflow-hidden cursor-pointer border-[1px] border-dark-primary-blue/50 flex items-center justify-center"
                    >
                      <img
                        src={imageURL + item.game_icon}
                        alt={item.game_icon}
                        className="object-cover"
                        width={120}
                        height={120}
                      />
                    </div>
                  );
                })}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    </div>
  );
};

export default Games;
