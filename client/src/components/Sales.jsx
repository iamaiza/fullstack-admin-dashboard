import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  Tooltip,
  PointElement,
  Title,
} from "chart.js";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { MONTHLY_SALES, WEEKLY_SALES } from "../query";
import { format } from "date-fns";
import { Line } from "react-chartjs-2";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  eachMonthOfInterval,
  startOfYear,
  endOfYear,
} from "date-fns";
import { DropdownIcon } from "../icons";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Sales = () => {
  const [activeData, setActiveData] = useState("weekly");
  const [chartData, setChartData] = useState(null);
  const [show, setShow] = useState(false);

  const { data: weeklyData } = useQuery(WEEKLY_SALES);
  const { data: monthlyData } = useQuery(MONTHLY_SALES);

  useEffect(() => {
    if (activeData === "weekly" && weeklyData) {
      const currentWeekDays = eachDayOfInterval({
        start: startOfWeek(new Date(), { weekStartsOn: 1 }),
        end: endOfWeek(new Date(), { weekStartsOn: 1 }),
      });

      const mappedSalesData = currentWeekDays.map((day) => {
        const saleForDay = weeklyData.weeklySales.find(
          (sale) =>
            format(new Date(sale.date), "yyyy-MM-dd") ===
            format(day, "yyyy-MM-dd")
        );
        return saleForDay ? saleForDay.totalSales : 0;
      });
      setChartData({
        labels: currentWeekDays.map((day) => format(day, "EEE")),
        datasets: [
          {
            label: "Weekly Sales",
            data: mappedSalesData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointRadius: mappedSalesData.map((sales) => (sales ? 3 : 0)),
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
          },
        ],
      });
    } else if (activeData === "monthly" && monthlyData) {
      const currentYearMonths = eachMonthOfInterval({
        start: startOfYear(new Date()),
        end: endOfYear(new Date()),
      });

      const mappedMonthlySalesData = currentYearMonths.map((month) => {
        const saleForMonth = monthlyData.monthlySales.find(
          (sale) =>
            format(new Date(sale.date), "yyyy-MM") === format(month, "yyyy-MM")
        );
        return saleForMonth ? saleForMonth.totalSales : 0;
      });
      setChartData({
        labels: currentYearMonths.map((month) => format(month, "MMM")),
        datasets: [
          {
            label: "Monthly Sales",
            data: mappedMonthlySalesData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointRadius: mappedMonthlySalesData.map((sales) => (sales ? 3 : 0)),
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
          },
        ],
      });
    }

    const showDropdownHandler = (e) => {
      const dropdownEl = document.getElementById("dropdown");
      if (!dropdownEl.contains(e.target)) {
        setShow(false);
      } else {
        setShow(true);
      }
    };

    window.addEventListener("click", showDropdownHandler);
    return () => window.removeEventListener("click", showDropdownHandler);
  }, [activeData, weeklyData, monthlyData]);

  return (
    <div className="max-h-96 mt-24 mb-10">
      <div className="max-w-[760px] w-full bg-slate-200 relative">
        <div
          className="w-1/3 bg-white flex flex-col gap-3 py-5 absolute right-0 -top-10"
          id="dropdown"
          onClick={() => setShow(!show)}
        >
          <p className="px-5 text-[17px] flex items-center gap-2 cursor-default text-[#929292]">
            <span>
              {activeData === "weekly"
                ? "Weekly Sales"
                : activeData === "monthly"
                ? "Monthly Sales"
                : "Sales"}
            </span>
            <span className="mt-1">
              <DropdownIcon show={show} />
            </span>
          </p>
          {show && (
            <Fragment>
              <button
                className={`text-left px-5 py-2 ${
                  activeData === "weekly" ? "bg-[#23cece45]" : ""
                }`}
                onClick={() => {
                  setActiveData("weekly");
                  setShow(false);
                }}
                disabled={activeData === "weekly"}
              >
                Weekly Sales
              </button>
              <button
                className={`text-left px-5 py-2 ${
                  activeData === "monthly" ? "bg-[#23cece45]" : ""
                }`}
                onClick={() => {
                  setActiveData("monthly");
                  setShow(false);
                }}
                disabled={activeData === "monthly"}
              >
                Monthly Sales
              </button>
            </Fragment>
          )}
        </div>
      </div>

      {chartData ? (
        <Line
          className="w-full"
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Order Time",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Sales Amount",
                },
              },
            },
          }}
        />
      ) : (
        <Line
          data={{
            labels: [],
            datasets: [],
          }}
          options={{
            responsive: true,
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "No data available"
            },
            scales: {
              x: {
                display: false,
              },
              y: {
                display: false,
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default Sales;
