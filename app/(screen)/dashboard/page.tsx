"use client";
import toast from "react-hot-toast";
import api from "@/app/helper/axios";
import { getCookie } from "cookies-next";
import MenuItem from "@mui/material/MenuItem";
import { PieChart } from "@mui/x-charts/PieChart";
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { LineChart } from '@mui/x-charts/LineChart';
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Chart from "react-apexcharts";
import {
  convertObjToArr,
  generateMonthlyReport,
  generateShortWeekdayNames,
  generateWeeklyReport,
  generateYearlyReport,
  generateYears,
  getCurrentMonth,
  getCurrentWeekNumber,
  getCurrentYear,
  getShortMonthNames,
  getWeekNumber,
} from "@/app/helper";
import moment from "moment";

interface DashboardLayout {}

const Dashboard: React.FC<DashboardLayout> = () => {
  let [user, setUser] = useState<any>({});
  let [xLabels, setXLabels] = useState<any>([]);
  let [gameReport, setGameReport] = useState<any>([]);
  let [transection, setTransection] = useState<any>([]);
  let [debitTransaction, setDebitTransaction] = useState<any>([]);
  let [creditTransaction, setCreditTransaction] = useState<any>([]);
  let [transactionFilter, setTransactionFilter] = useState<string>("weekly");
  let filterData = ["weekly", "monthly", "yearly"];

  useEffect(() => {
    fetchUser();
    fetchTransection();
    fetchGameReport("weekly");
    fetchTransactionReport("weekly");
  }, []);

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
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const fetchTransactionReport = async (e: any) => {
    try {
      const data = await api({
        url: "/report/transaction/fetch",
        data: { user_id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        let transaction = data.response;
        let creditTransactionData = [];
        let debitTransactionData = [];
        for (let i = 0; i < transaction.length; i++) {
          if (transaction[i].is_debit == true) {
            debitTransactionData.push(transaction[i]);
          } else {
            creditTransactionData.push(transaction[i]);
          }
        }

        if (e == "weekly") {
          const shortWeekdayNames = generateShortWeekdayNames("Sun");
          setXLabels(shortWeekdayNames);

          let creditFilter = creditTransactionData.filter((item: any) => {
            const createdAtDate = new Date(item.createdAt);
            return (
              createdAtDate.getFullYear() === getCurrentYear() &&
              getWeekNumber(createdAtDate) === getCurrentWeekNumber()
            );
          });
          let creditSum = generateWeeklyReport(creditFilter);
          let creditOrderArr = convertObjToArr(creditSum);

          let debitFilter = debitTransactionData.filter((item: any) => {
            const createdAtDate = new Date(item.createdAt);
            return (
              createdAtDate.getFullYear() === getCurrentYear() &&
              getWeekNumber(createdAtDate) === getCurrentWeekNumber()
            );
          });
          let debitSum = generateWeeklyReport(debitFilter);
          let debitOrderArr = convertObjToArr(debitSum);

          setDebitTransaction(debitOrderArr);
          setCreditTransaction(creditOrderArr);
        } else if (e == "monthly") {
          const shortMonthNames = getShortMonthNames();
          setXLabels(shortMonthNames);

          let creditFilter = creditTransactionData.filter((item: any) => {
            const createdAtDate = new Date(item.createdAt);
            return (
              createdAtDate.getFullYear() === getCurrentYear() &&
              createdAtDate.getMonth() + 1 === getCurrentMonth()
            );
          });
          let creditSum = generateMonthlyReport(creditFilter);
          let creditOrderArr = convertObjToArr(creditSum);

          let debitFilter = debitTransactionData.filter((item: any) => {
            const createdAtDate = new Date(item.createdAt);
            return (
              createdAtDate.getFullYear() === getCurrentYear() &&
              createdAtDate.getMonth() + 1 === getCurrentMonth()
            );
          });
          let debitSum = generateMonthlyReport(debitFilter);
          let debitOrderArr = convertObjToArr(debitSum);

          setDebitTransaction(debitOrderArr);
          setCreditTransaction(creditOrderArr);
        } else if (e == "yearly") {
          const yearsArray = generateYears(user.createdAt);
          setXLabels(yearsArray);

          let creditFilter = creditTransactionData.filter((item: any) => {
            const createdAtDate = new Date(item.createdAt);
            return createdAtDate.getFullYear() === getCurrentYear();
          });
          let creditSum = generateYearlyReport(creditFilter);
          const creditOrderArr = Object.keys(creditSum).sort();
          const crditReportList = creditOrderArr.map(
            (year: any) => creditSum[year]
          );

          let debitFilter = debitTransactionData.filter((item: any) => {
            const createdAtDate = new Date(item.createdAt);
            return createdAtDate.getFullYear() === getCurrentYear();
          });
          let debitSum = generateYearlyReport(debitFilter);
          const debitOrderArr = Object.keys(debitSum).sort();
          const debitReportList = debitOrderArr.map(
            (year: any) => debitSum[year]
          );

          setDebitTransaction(debitReportList);
          setCreditTransaction(crditReportList);
        }
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const fetchGameReport = async (e: any) => {
    try {
      const data = await api({
        url: "/report/game/fetch",
        data: { user_id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        let reportData = [];
        for (let i = 0; i < data.response.length; i++) {
          reportData.push({
            id: data.response[i]._id,
            value: data.response[i].open_count,
            label: data.response[i].game[0].name,
          });
        }
        setGameReport(reportData);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const fetchTransection = async () => {
    try {
      const data = await api({
        url: "/transaction/fetch-all",
        data: { page: 0, pageSize: 4, _id: getCookie("auth-id") },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (data.hasOwnProperty("response")) {
        const traData = data.response.filter(
          (el: any) => el.user[0]._id == getCookie("auth-id")
        );
        setTransection(traData);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setTransactionFilter(event.target.value);
    fetchTransactionReport(event.target.value);
  };

  const graphData = {
    series: [
      {
        name: "Spend",
        data: debitTransaction,
      },
      {
        name: "Recharge",
        data: creditTransaction,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "point",
        categories: xLabels,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  const pieData = {
    series: gameReport,
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="w-full p-5 bg-primary-extraLight">
      <div className="block xl:flex">
        <div className="xl:w-[80%]">
          <p className="mb-5 text-xl tracking-wider font-medium">Charts</p>
          <div className=" xl:grid grid-cols-2 gap-5">
            {/* transection graph */}
            <div className="p-5 border-[1px] rounded-lg mb-5 xl:mb-0">
              <div className="flex items-center justify-between">
                <p className="text-lg tracking-wider">Transaction Report</p>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={transactionFilter}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {filterData.map((item: any, index: number) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item}
                          className="capitalize"
                        >
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>Without label</FormHelperText>
                </FormControl>
              </div>
              <LineChart
                width={600}
                height={300}
                series={[
                  { data: debitTransaction, label: "Spend" },
                  { data: creditTransaction, label: "Recharge" },
                ]}
                xAxis={[{ scaleType: "point", data: xLabels }]}
              />
              {/* <Chart
                // @ts-ignore
                options={graphData.options}
                series={graphData.series}
                type="area"
                height={350}
              /> */}
            </div>
            <div className="p-5 border-[1px] rounded-lg">
              <div className="flex items-center justify-between my-7">
                <p className="text-lg tracking-wider">Game Uses Report</p>
              </div>
              <PieChart
                series={[
                  {
                    data: gameReport,
                  },
                ]}
                width={600}
                height={300}
              />
              {/* <Chart
                // @ts-ignore
                options={pieData.options}
                series={pieData.series}
                type="donut"
              /> */}
            </div>
          </div>
          <div>
            <p className="my-5 text-xl tracking-wider font-medium">
              Recent Transection
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
                          <tr
                            key={index}
                            className={`cursor-pointer ${
                              item.is_debit ? "bg-red/10" : "bg-green/10"
                            }`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {moment(item.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {item.is_credit
                                ? "Recharge wallet"
                                : item.is_debit
                                ? "Spend on games"
                                : ""}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {item.is_debit && item.game.length != 0
                                ? item.game[0].name
                                : "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
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
        <div className="ml-5 xl:w-[20%]">
          <p className="mb-5 text-xl tracking-wider font-medium">News</p>
          <div className=" h-[83vh] bg-primary-normal/50 rounded-lg flex items-center justify-center">
            <p className="font-black text-primary-darken tracking-wider">
              No Data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
