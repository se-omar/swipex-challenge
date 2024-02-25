import { Rate } from "../../models/Rate";

const TableBody = ({ currentRates }: { currentRates: Rate[] }) => (
  <tbody className="bg-gray-800">
    {currentRates.map((rate) => (
      <tr key={rate.date}>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
          {rate.date}
        </th>

        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {rate.source}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {rate.EGP}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {rate.CAD}
        </td>
      </tr>
    ))}
  </tbody>
);

export default TableBody
