"use client";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DashboardLayout {}

const Dashboard: React.FC<DashboardLayout> = () => {
  const [gameReport, setGameReport] = useState<any>([]);

  useEffect(() => {
    fetchLinkReport();
  }, []);

  const fetchLinkReport = async () => {
    try {
      const data = await api({
        url: "/report/game/fetch-all",
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        let reportData = [];
        for (let i = 0; i < data.response.length; i++) {
          if (data.response[i].user[0]._id == getCookie("auth-id")) {
            reportData.push(data.response[i]);
          }
        }
        setGameReport(reportData);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  console.log(gameReport);
  

  return (
    <div className="w-full p-5">
      <div className="w-96 p-5 border-[1px] border-primary-darken">
        {gameReport &&
          gameReport.map((item: any, index: number) => {
            return (
              <div key={index} className="flex items-center justify-between mb-3">
                <p>{item.game[0].name}</p>
                <p>{item.open_count}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
