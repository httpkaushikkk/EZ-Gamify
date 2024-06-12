"use client";
import TickPlacementBars from "@/app/components/dashboard/graph";
import { PieChart } from "@mui/x-charts/PieChart";
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
          console.log(data.response[i]);
          
          // if (data.response[i].user[0]._id == getCookie("auth-id")) {
          //   reportData.push({
          //     id: data.response[i]._id,
          //     value: data.response[i].open_count,
          //     label: data.response[i].game[0].name,
          //   });
          // }
        }
        // setGameReport(reportData);
      }
    } catch (err: any) {
      console.log(err);
      
      // toast.error(err.response.data.message);
    }
  };

  return (
    <div className="w-full p-5">
      <div className="flex items-center">
        <div className="border-[1px] border-primary-darken/25 drop-shadow-md rounded-lg p-4 ">
          <PieChart
            series={[
              {
                data: gameReport,
              },
            ]}
            width={400}
            height={200}
            colors={["#395886", "#B1C9EF"]}
          />
        </div>
      </div>
      {/* <div className="w-96 p-5 border-[1px] border-primary-darken">
        {gameReport &&
          gameReport.map((item: any, index: number) => {
            return (
              <div key={index} className="flex items-center justify-between mb-3">
                <p>{item.game[0].name}</p>
                <p>{item.open_count}</p>
              </div>
            );
          })}
      </div> */}
    </div>
  );
};

export default Dashboard;
