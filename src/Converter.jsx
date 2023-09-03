import React from "react";
import CurrencyInput from "./components/CurrencyInput";
import { useState, useEffect } from "react";
import axios from "axios";

const Converter = ({ conversionData, setConversionData }) => {
  const [currencyNames, setCurrencyNames] = useState();
  const [conversionResult, setConversionResult] = useState();

  const { from, to, amount } = conversionData;

  const fromHandler = (from) => {
    setConversionData((prev) => ({ ...prev, from: from }));
  };

  const toHandler = (to) => {
    setConversionData((prev) => ({ ...prev, to: to }));
  };

  const amountHandler = (amount) => {
    setConversionData((prev) => ({ ...prev, amount: amount }));
  };

  const switchHandler = () => {
    setConversionData((prev) => ({ ...prev, from: prev.to, to: prev.from }));
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (amount === "") {
          setConversionResult(0);
          return;
        }
        const response = await axios.get(
          `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
        );
        setConversionResult(response.data.result);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [conversionData]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangerate.host/latest"
        );
        setCurrencyNames(Object.keys(response.data.rates));
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex justify-center items-center gap-6 my-6">
      <CurrencyInput
        currencyNames={currencyNames}
        onSelect={fromHandler}
        onChange={amountHandler}
        amount={amount}
        defaultValue={from}
        readOnly={false}
      />
      <img
        src="switch.png"
        onClick={switchHandler}
        className="font-medium h-max border-2 border-gray-300 rounded-full p-2 transition-colors hover:border-blue-500"
      ></img>
      <CurrencyInput
        currencyNames={currencyNames}
        onSelect={toHandler}
        amount={conversionResult}
        defaultValue={to}
        readOnly={true}
      />
    </div>
  );
};

export default Converter;
