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
    <>
      <div className="">
        <input
          type="date"
          className="px-2 py-1 border rounded mr-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="px-2 py-1 border rounded mr-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          onClick={fetchApiRates}
        >
          Search
        </button>
      </div>

      <section className="py-1 bg-blueGray-50">
        <div className="w-auto xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead style={{ backgroundColor: "#F8FAFC" }}>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Date
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                      EGP
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                      CAD
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentRates.map((rate) => (
                    <tr key={rate.date}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {rate.date}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {rate.EGP}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {rate.CAD}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between mt-4">
                <button
                  onClick={previousPage}
                  className={`py-2 px-4 rounded ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "bg-blue-500 text-white"
                  }`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from(Array(totalPages), (_, index) => (
                  <button
                    key={index}
                    onClick={() => changePage(index + 1)}
                    className={`py-2 px-4 rounded ${
                      index + 1 === currentPage
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  className={`py-2 px-4 rounded ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "bg-blue-500 text-white"
                  }`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExchangeRates;
