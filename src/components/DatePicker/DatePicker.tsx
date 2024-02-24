import { useState } from "react";

type Props = {
  submit: (startDate: string, endDate: string) => void;
};

const DatePicker = ({ submit }: Props) => {
  const [startDate, setStartDate] = useState("2023-12-01");
  const [endDate, setEndDate] = useState("2024-02-01");

  return (
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
        onClick={() => submit(startDate, endDate)}
      >
        Search
      </button>
    </div>
  );
};

export default DatePicker;
