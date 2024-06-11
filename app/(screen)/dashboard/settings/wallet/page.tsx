"use client";
import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Fev",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "June",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "July",
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: "Aug",
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: "Sept",
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: "Oct",
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: "Nov",
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: "Dec",
  },
];

interface WalletInterface {}

const valueFormatter = (value: number | null) => `${value}mm`;

const Wallet: React.FC<WalletInterface> = () => {
  const [tickPlacement, setTickPlacement] = React.useState<
    "start" | "end" | "middle" | "extremities"
  >("middle");
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState<
    "middle" | "tick"
  >("middle");

  const chartSetting = {
    yAxis: [
      {
        // label: "rainfall (mm)",
      },
    ],
    series: [{ dataKey: "seoul", valueFormatter }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  return (
    <div>
      {/* Recharger */}
      <div className="w-full flex p-5">
        <div className="w-full h-64 flex flex-col items-center justify-center border-2 border-primary-light rounded-lg bg-primary-light">
          <p className="text-7xl tracking-wide font-black text-primary-darken mb-3">
            ₹5000
          </p>
          <p className="text-lg font-medium tracking-wide text-center">
            Available Balance
          </p>
          <a href={void 0} className="cursor-pointer">
            <div className="border-2 px-5 py-2 mt-8 rounded-xl">
              <p>Rechrage</p>
            </div>
          </a>
        </div>
        <div className="w-full">
          <BarChart
            dataset={dataset}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "month",
                tickPlacement,
                tickLabelPlacement,
              },
            ]}
            {...chartSetting}
          />
        </div>
      </div>
      <div className="w-full px-5">
        <p className="text-2xl tracking-wide font-medium text-black">
          Recent transactions
        </p>
      </div>
    </div>
  );
};

export default Wallet;
