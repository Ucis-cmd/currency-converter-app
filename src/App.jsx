import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Converter from "./Converter";
import CurrencyChart from "./CurrencyChart";

function App() {
  const [conversionData, setConversionData] = useState({
    from: "EUR",
    to: "USD",
    amount: 1,
  });

  return (
    <div>
      <Converter
        setConversionData={setConversionData}
        conversionData={conversionData}
      />
      <CurrencyChart conversionData={conversionData} />
    </div>
  );
}

export default App;
