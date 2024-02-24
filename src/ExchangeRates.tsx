import { useEffect, useState } from "react";
import data from "./fakeData.json";

type Rate = {
  date: string;
  EGP: number;
  CAD: number;
};

const ExchangeRates = () => {
  const [rates, setRates] = useState<Rate[]>([]);

  useEffect(() => {
    // fetch(
    //   "http://api.exchangerate.host/timeframe?access_key=e75f204dd4baff158bf80a3835c6f4c5&currencies=EGP,CAD&start_date=2023-10-01&end_date=2024-02-01",
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const dailyRates = Object.keys(data.quotes).map((date) => ({
    //       date: date,
    //       EGP: Math.round(data.quotes[date].USDEGP * 100) / 100,
    //       CAD: Math.round(data.quotes[date].USDCAD * 100) / 100,
    //     }));

    const dailyRates: Rate[] = Object.keys(data.quotes).map((date) => ({
      date: date,
      EGP: Math.round(data.quotes[date].USDEGP * 100) / 100,
      CAD: Math.round(data.quotes[date].USDCAD * 100) / 100,
    }));
    setRates(dailyRates);
  }, []);

  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-auto xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
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
                  {rates.map((rate) => (
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExchangeRates;
