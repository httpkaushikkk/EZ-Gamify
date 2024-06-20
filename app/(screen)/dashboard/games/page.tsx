"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import api, { imageURL } from "@/app/helper/axios";

interface GameInterface {}

const Game: React.FC<GameInterface> = () => {
  const route = useRouter();
  let [liveGame, setLiveGame] = useState<any>([]);
  let [reviewGames, setReviewGames] = useState<any>([]);
  let [gamesType, setGamesType] = useState<any>("live");

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const data = await api({
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
    <div className="w-full h-screen bg-primary-extraLight/15">
      <div className="flex items-center p-5">
        <a
          href={void 0}
          onClick={() => setGamesType("live")}
          className="cursor-pointer"
        >
          <p
            className={`${
              gamesType == "live"
                ? "font-bold tracking-wide text-primary-darken"
                : "text-primary-darken tracking-wide"
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
                ? "font-bold tracking-wide text-primary-darken"
                : "text-primary-darken tracking-wide"
            }`}
          >
            Coming Soon Games
          </p>
        </a>
      </div>
      <React.Fragment>
        {gamesType == "live" ? (
          <React.Fragment>
            {liveGame && liveGame.length != 0 ? (
              <div className="mx-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
                {liveGame.map((item: any, index: number) => {

                  console.log(imageURL + item.game_icon);
                  

                  return (
                    <div
                      key={index}
                      onClick={() => route.push(`/dashboard/games/${item._id}`)}
                      className="rounded-lg overflow-hidden cursor-pointer border-[1px] border-primary-normal flex items-center justify-center"
                    >
                      <Image
                        src={imageURL + item.game_icon}
                        alt={item.game_icon}
                        className="object-contain"
                        width={120}
                        height={120}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full h-96 flex items-center justify-center">
                <p>No Data</p>
              </div>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {reviewGames && reviewGames.length != 0 ? (
              <div className="mx-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
                {reviewGames.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => route.push(`/dashboard/games/${item._id}`)}
                      className="rounded-lg overflow-hidden cursor-pointer border-[1px] border-primary-normal flex items-center justify-center"
                    >
                      <Image
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
            ) : (
              <div className="w-full h-96 flex items-center justify-center">
                <p>No Data</p>
              </div>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    </div>
  );
};

export default Game;
