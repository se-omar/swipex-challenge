import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import RatesTable from "../../components/RatesTable/RatesTable";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Rate } from "../../models/Rate";
import axios from "axios";

const ExchangeRates = () => {
  const [rates, setRates] = useState<Rate[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const startItemIdx = currentPage * pageSize;
  const endItemIdx = startItemIdx - pageSize;
  const currentRates = rates.slice(endItemIdx, startItemIdx);
  const totalPages = Math.ceil(rates.length / pageSize);

  const fetchRates = async (startDate: string, endDate: string) => {
    const res = await axios.get(
      `http://api.exchangerate.host/timeframe?access_key=${
        import.meta.env.VITE_ACCESS_TOKEN
      }&currencies=EGP,CAD&start_date=${startDate}&end_date=${endDate}`,
    );

    const data = res.data;

    const dailyRates = Object.keys(data.quotes).map((date) => ({
      date: date,
      source: data.source,
      EGP: Math.round(data.quotes[date].USDEGP * 100) / 100,
      CAD: Math.round(data.quotes[date].USDCAD * 100) / 100,
    }));
    setRates(dailyRates);
  };

  return (
    <div>
      <DatePicker submit={fetchRates} />
      <RatesTable currentRates={currentRates} />
      <Pagination
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ExchangeRates;
