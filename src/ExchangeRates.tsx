import { useEffect, useState } from "react";
import data from "./fakeData.json";

type Rate = {
  date: string;
  EGP: number;
  CAD: number;
};

const ExchangeRates = () => {
  const [rates, setRates] = useState<Rate[]>([]);
  const [startDate, setStartDate] = useState("2023-12-01");
  const [endDate, setEndDate] = useState("2024-02-01");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const startItemIdx = currentPage * pageSize;
  const endItemIdx = startItemIdx - pageSize;
  const currentRates = rates.slice(endItemIdx, startItemIdx);
  const totalPages = Math.ceil(rates.length / pageSize);

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage,
    );
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchRates = () => {
    const dailyRates: Rate[] = Object.keys(data.quotes).map((date) => ({
      date: date,
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
      <div className="text-white">
        <input
          type="date"
          className="px-2 py-1 border rounded mr-2 bg-gray-700 border-gray-600 text-white"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="px-2 py-1 border rounded mr-2 bg-gray-700 border-gray-600 text-white"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="bg-[#0021CC] hover:bg-[#021AA2]/90 text-white font-bold py-1 px-4 rounded"
          onClick={fetchApiRates}
        >
          Search
        </button>
      </div>

      <div className="w-auto xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded border-gray-700">
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full border-collapse text-white">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-left uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase">
                    EGP
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase">
                    CAD
                  </th>
                </tr>
              </thead>

              <tbody className="bg-gray-800">
                {currentRates.map((rate) => (
                  <tr key={rate.date}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {rate.date}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {rate.EGP}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {rate.CAD}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={previousPage}
            className={`py-2 px-4 rounded text-white ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "bg-[#0021CC] hover:bg-[#021AA2]/90"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from(Array(totalPages), (_, index) => (
            <button
              key={index}
              onClick={() => changePage(index + 1)}
              className={`py-2 px-4 rounded text-white ${
                index + 1 === currentPage
                  ? "bg-[#021AA2]/90"
                  : "bg-[#0021CC] hover:bg-[#021AA2]/90"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            className={`py-2 px-4 rounded text-white ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "bg-[#0021CC] hover:bg-[#021AA2]/90"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;
