import { useEffect, useState } from "react";
import data from "./fakeData.json";
import DatePicker from "./components/DatePicker/DatePicker";
import Pagination from "./components/Pagination/Pagination";
import RatesTable from "./components/RatesTable/RatesTable";
import { Rate } from "./models/Rate";

const ExchangeRates = () => {
  const [rates, setRates] = useState<Rate[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const startItemIdx = currentPage * pageSize;
  const endItemIdx = startItemIdx - pageSize;
  const currentRates = rates.slice(endItemIdx, startItemIdx);
  const totalPages = Math.ceil(rates.length / pageSize);

  const fetchRates = () => {
    const dailyRates: Rate[] = Object.keys(data.quotes).map((date) => ({
      date: date,
      source: data.source,
      EGP: Math.round(data.quotes[date].USDEGP * 100) / 100,
      CAD: Math.round(data.quotes[date].USDCAD * 100) / 100,
    }));
    setRates(dailyRates);
  };

  const fetchApiRates = () => {
    fetch(
      `http://api.exchangerate.host/timeframe?access_key=e75f204dd4baff158bf80a3835c6f4c5&currencies=EGP,CAD&start_date=${startDate}&end_date=${endDate}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const dailyRates = Object.keys(data.quotes).map((date) => ({
          date: date,
          source: data.source,
          EGP: Math.round(data.quotes[date].USDEGP * 100) / 100,
          CAD: Math.round(data.quotes[date].USDCAD * 100) / 100,
        }));
        setRates(dailyRates);
      });
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div>
      <DatePicker submit={fetchApiRates} />

      <div className="w-auto xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded border-gray-700">
          <div className="block w-full overflow-x-auto">
            <RatesTable currentRates={currentRates} />
          </div>
        </div>

        <Pagination
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ExchangeRates;
