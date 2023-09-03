import { React, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

function CurrencyChart({ conversionData }) {
  const [dates, setlabels] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const from = conversionData.from;
  const to = conversionData.to;

  useEffect(() => {
    const getData = async () => {
      try {
        const date = new Date();

        const currentDay = String(date.getDate()).padStart(2, "0");
        const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
        const currentYear = date.getFullYear();

        const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
        const yearBeforeDate = `${
          currentYear - 1
        }-${currentMonth}-${currentDay}`;

        const res = await axios.get(
          `https://api.exchangerate.host/timeseries?start_date=${yearBeforeDate}&end_date=${currentDate}&base=${from}&symbols=${to}`
        );
        const data = res.data.rates;
        console.log(data);

        const dates = Object.keys(data);
        const exchangeRates = Object.values(data).map((obj) => obj[to]);

        setlabels(dates);
        setExchangeRates(exchangeRates);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [conversionData.from, conversionData.to]);

  const options = {
    aspectRatio: 4 / 1,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        padding: 12,
        bodyColor: "#000000",
        titleColor: "#000000",
        backgroundColor: "#FFFFFF",
        borderColor: "rgb(209, 203, 219)",
        borderWidth: 2,
        titleFont: { size: 16 },
        bodyFont: { size: 16 },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 12,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  const data = {
    labels: dates,
    datasets: [
      {
        data: exchangeRates,
        borderColor: "#0275d8",
        backgroundColor: "#0275d8",
      },
    ],
  };

  return (
    <div className="flex justify-center">
      <div className="w-3/4">
        <h2 className="text-3xl text-gray-500 py-2">
          {from} to {to} chart
        </h2>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default CurrencyChart;
