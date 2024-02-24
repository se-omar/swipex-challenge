import { Rate } from "../../models/Rate";

type Props = {
  currentRates: Rate[];
};
const RatesTable = ({ currentRates }: Props) => {
  return (
    <table className="items-center w-full border-collapse text-white">
      <thead className="bg-gray-700">
        <tr>
          <th className="px-6 py-3 text-xs font-semibold text-left uppercase">
            Date
          </th>
          <th className="px-6 py-3 text-xs font-semibold uppercase">EGP</th>
          <th className="px-6 py-3 text-xs font-semibold uppercase">CAD</th>
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
  );
};

export default RatesTable;
