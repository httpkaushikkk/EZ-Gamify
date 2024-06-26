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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import excelIcon from "@/app/assets/svg/excel.svg";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/app/store/loader/loaderSlice";

interface WalletInterface {}

const Wallet: React.FC<WalletInterface> = () => {
  let dispatch = useDispatch();
  let [graphData, setGraphData] = useState<any>([]);
  let [walletData, setWalletData] = useState<any>({});
  let [totalData, setTotalData] = useState<number>(0);
  let [transection, setTransection] = useState<any>([]);
  let [totalPages, setTotalPages] = useState<number>(0);
  let [currentPage, setCurrentPage] = useState<number>(0);
  let [selectedAmount, setSelectedAmount] = useState<number>(0);

  useEffect(() => {
    fetchWallet();
    fetchTransection(1);
  }, []);

  const fetchWallet = async () => {
    dispatch(showLoader());
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
        dispatch(hideLoader());
      }
    } catch (err: any) {
      dispatch(hideLoader());
      toast.error(err.response.data.message);
    }
  };

  const nextData = () => {
    if (currentPage != totalPages) {
      let page = currentPage + 1;
      setCurrentPage(page);
      fetchTransection(page);
    }
  };

  const prevData = () => {
    if (currentPage >= 1) {
      let page = currentPage - 1;
      setCurrentPage(page);
      fetchTransection(page);
    }
  };

  const fetchTransection = async (page: any) => {
    dispatch(showLoader());
    try {
      const data = await api({
        url: "/transaction/fetch-all",
        data: { page: page, pageSize: 6, _id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setTotalData(data.totalData);
        setTransection(data.response);
        const traData = data.response;
        // .filter(
        //   (el: any) => el.user[0]._id == getCookie("auth-id")
        // );
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
        dispatch(hideLoader());
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
      dispatch(hideLoader());
    }
  };

  const downloadWExcel = async () => {
    dispatch(showLoader());
    try {
      const data = await api({
        url: "/transaction/excel",
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        const traData = data.response.filter(
          (el: any) => el.user[0]._id == getCookie("auth-id")
        );
        let excelData = [];
        for (let i = 0; i < traData.length; i++) {
          let type = traData[i].is_credit
            ? "Recharge wallet"
            : traData[i].is_debit
            ? "Spend on games"
            : "";
          let details =
            traData[i].is_debit && traData[i].game.length != 0
              ? traData[i].game[0].name
              : "-";
          let action = traData[i].is_debit
            ? " Dr."
            : traData[i].is_credit
            ? " Cr."
            : "";
          excelData.push({
            ["#"]: i,
            ["Date"]: moment(traData[i].createdAt).format(
              "MMMM Do YYYY, h:mm:ss a"
            ),
            ["Type"]: type,
            ["Details"]: details,
            ["Amount"]: traData[i].amount,
            [""]: action,
          });
        }

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "transections");
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const excelBlob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(excelBlob, "transections");
        dispatch(hideLoader());
      }
    } catch (err: any) {
      dispatch(hideLoader());
      toast.error(err.response.data.message);
    }
  };

  function generateOrderId() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 7);
    return `${timestamp}-${randomPart}`;
  }

  const makeRechargeWallet = async () => {
    dispatch(showLoader());
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
                    fetchTransection(1);
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
          if (window !== undefined) {
            // @ts-ignore
            const rzp1 = window.Razorpay(options);
            rzp1.open();
          }
        }
        dispatch(hideLoader());
      }
    } catch (err: any) {
      dispatch(hideLoader());
      toast.error(err.response.data.message);
    }
  };

  const blanceData = ["100", "500", "1000", "2500", "5000"];

  return (
    <div className="w-full bg-primary-extraLight">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      {/* Recharger */}
      <div className="p-5">
        <div className="flex">
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
                    key={index}
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
          </div>
        </div>
        {transection && transection.length != 0 ? (
          <React.Fragment>
            <div className="w-full mt-5">
              <div className="flex items-center">
                <p className="text-2xl tracking-wide font-medium text-black">
                  Recent transactions
                </p>
                <a
                  href={void 0}
                  onClick={downloadWExcel}
                  className="ml-5 cursor-pointer"
                >
                  <Image src={excelIcon} alt="" className="" />
                </a>
              </div>
              <div className="mt-3">
                <div className="overflow-x-scroll">
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
                            <tr
                              key={index}
                              className={`cursor-pointer ${
                                item.is_debit ? "bg-red/15" : "bg-green/15"
                              }`}
                            >
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
            <div className="flex flex-col items-center mt-6">
              <span className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {currentPage}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-900">
                  {totalPages}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">{totalData}</span>{" "}
                Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={prevData}
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-primary-darken rounded-s hover:bg-gray-900"
                >
                  <svg
                    className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  Prev
                </button>
                <button
                  onClick={nextData}
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-primary-darken border-0 border-s border-primary-extraLight rounded-e hover:bg-gray-900"
                >
                  Next
                  <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default Wallet;
