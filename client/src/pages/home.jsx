"use client";

import TitleMenu from "../components/title-menu";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Sales from "../components/Sales";
import { useEffect, useState } from "react";
import { DAILY_SALES } from "../query";

export default function Home() {
  const location = useLocation();
  const pathname = location?.pathname;
  const path = pathname.slice(1);

  const [dailySales, setDailySales] = useState({
    totalOrders: 0,
    totalSalesAmount: 0,
  });
  const { data } = useQuery(DAILY_SALES);

  useEffect(() => {
    if (data?.dailySales)
      setDailySales(data.dailySales);
  }, [data]);
  return (
    <div className="px-5 pb-10 overflow-y-auto h-screen">
      <TitleMenu pageType="pages" pageName={path} />
      <div className="mt-12">
        <div className="bg-white shadow-lg w-[280px] max-[320px]:w-full p-3 flex items-center gap-2 justify-between rounded-lg">
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 text-lg font-semibold">Sales</span>
            <span className="font-bold text-3xl text-gray-800">${dailySales.sales}</span>
          </div>
          <div className="bg-linear-gradient py-3 px-3 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
        </div>
        <Sales />
      </div>
    </div>
  );
}
