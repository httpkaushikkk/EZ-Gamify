"use client";
import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import Script from "next/script";
import moment from "moment";
import rechargeIcon from "@/app/assets/svg/recharge.svg";
import Image from "next/image";

interface WalletInterface {}

const Wallet: React.FC<WalletInterface> = () => {
  let [graphData, setGraphData] = useState<any>([]);
  let [walletData, setWalletData] = useState<any>({});
  let [transection, setTransection] = useState<any>([]);
  let [selectedAmount, setSelectedAmount] = useState<number>(0);

  useEffect(() => {
    fetchWallet();
    fetchTransection();
  }, []);

  const fetchWallet = async () => {
    try {
      const data = await api({
        url: "/wallet/fetch",
        data: { user_id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.status == 1) {
        if (data.hasOwnProperty("response")) {
          setWalletData(data.response);
        }
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const fetchTransection = async () => {
    try {
      const data = await api({
        url: "/transaction/fetch-all",
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        setTransection(data.response);
        const traData = data.response.filter(
          (el: any) => el.user[0]._id == getCookie("auth-id")
        );
        let creditData = [];
        let debitData = [];
        for (let i = 0; i < traData.length; i++) {
          if (traData[i].is_credit == true) {
            creditData.push(traData[i]);
          } else if (traData[i].is_debit == true) {
            debitData.push(traData[i]);
          }
        }
        const creditDataValueSum = creditData.reduce(
          (accumulator, currentValue) => accumulator + currentValue.amount,
          0
        );
        const debitDataValueSum = debitData.reduce(
          (accumulator, currentValue) => accumulator + currentValue.amount,
          0
        );
        let graphDataMap = [
          { id: 0, value: creditDataValueSum, label: "Add on wallet" },
          { id: 1, value: debitDataValueSum, label: "Spend on games" },
        ];
        setGraphData(graphDataMap);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  function generateOrderId() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 7);
    return `${timestamp}-${randomPart}`;
  }

  const makeRechargeWallet = async () => {
    try {
      const data = await api({
        url: "/common/payment/order",
        data: {
          amount: selectedAmount,
          currency: walletData.currency && walletData.currency[0].short_name,
          order_id: generateOrderId(),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });

      if (data.status == 1) {
        if (data.hasOwnProperty("response")) {
          const options = {
            key: "rzp_test_C9DzcxlU9lS3ZS",
            name: "EZ-Gamify",
            description: "Recharge your wallet",
            order_id: data.response.id,
            handler: async (response: any) => {
              try {
                const data = await api({
                  url: "/transaction/add",
                  data: {
                    wallet: walletData._id,
                    user: getCookie("auth-id"),
                    currency: walletData.currency && walletData.currency[0]._id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    amount: selectedAmount,
                    is_credit: true,
                    is_debit: false,
                  },
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie("auth-token")}`,
                  },
                });
                if (data.status == 1) {
                  if (data.hasOwnProperty("message")) {
                    toast.success(data.message);
                    fetchWallet();
                    fetchTransection();
                  }
                }
              } catch (err: any) {
                toast.error(err.response.data.message);
              }
            },
            theme: {
              color: "#395886",
            },
          };
          // @ts-ignore
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        }
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const blanceData = ["100", "500", "1000", "2500", "5000"];

  return (
    <div className="">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      {/* Recharger */}
      <div className=" xl:flex p-5">
        <div className="xl:w-[70%]">
          <div className="w-full h-64 flex flex-col items-center justify-center border-2 border-primary-light rounded-lg bg-primary-light">
            <div className="flex items-center">
              <p className="text-7xl tracking-wide font-black text-primary-darken mb-3">
                {walletData.currency && walletData.currency[0].symbol}
                {walletData.balance}
              </p>
              {selectedAmount > 0 && (
                <a
                  href={void 0}
                  onClick={makeRechargeWallet}
                  className="cursor-pointer"
                >
                  <Image
                    src={rechargeIcon}
                    alt="icon"
                    className="w-7 h-7 ml-3"
                  />
                </a>
              )}
            </div>
            <p className="text-base font-medium tracking-wide text-center">
              Available Balance
            </p>
            <div className="flex items-center my-5">
              {blanceData.map((item: any, index: number) => {
                return (
                  <a
                    href={void 0}
                    onClick={() => {
                      if (selectedAmount == item) {
                        setSelectedAmount(0);
                      } else {
                        setSelectedAmount(item);
                      }
                    }}
                    className={`w-20 py-1 border-[1px] rounded-lg mr-5 text-center cursor-pointer ${
                      selectedAmount == item
                        ? "bg-primary-darken text-white"
                        : ""
                    }`}
                  >
                    <p className="tracking-wider font-medium">{item}</p>
                  </a>
                );
              })}
            </div>
            {/* {selectedAmount > 0 && (
              <a
                href={void 0}
                onClick={makeRechargeWallet}
                className="cursor-pointer"
              >
                <div className="border-2 px-5 py-2 mt-8 rounded-xl">
                  <p>Rechrage</p>
                </div>
              </a>
            )} */}
          </div>
          <div className="w-full mt-5">
            <p className="text-2xl tracking-wide font-medium text-black">
              Recent transactions
            </p>
            <div className="mt-3">
              <div className="overflow-x-auto">
                <table className="border-[1px] border-primary-darken/15 rounded-lg divide-black/15 dark:border-light-primary-white/15 table-auto min-w-full divide-y dark:divide-light-primary-white/15">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-light-primary-white/70">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-light-primary-white/70">
                        Date/Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-light-primary-white/70">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-light-primary-white/70">
                        Details
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-light-primary-white/70 text-right">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide divide-black/10 dark:divide-light-primary-white/15">
                    {transection &&
                      transection.length != 0 &&
                      transection.map((item: any, index: number) => {
                        return (
                          <tr key={index} className={`cursor-pointer ${item.is_debit ? 'bg-red/15' : 'bg-green/15'}`}>
                            <td className="px-6 py-5 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              {moment(item.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              {item.is_credit
                                ? "Recharge wallet"
                                : item.is_debit
                                ? "Spend on games"
                                : ""}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              {item.is_debit && item.game.length != 0
                                ? item.game[0].name
                                : "-"}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap text-right">
                              {item.amount} {item.currency[0].symbol}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:w-[30%] mt-12 xl:mt-0">
          <div className="w-auto mt-5">
            <PieChart
              series={[
                {
                  data: graphData,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={200}
              colors={["#B1C9EF", "#395886"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
