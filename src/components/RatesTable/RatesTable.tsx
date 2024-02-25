import { Rate } from "../../models/Rate";
import EmptyState from "../EmptyState/EmptyState";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

type Props = {
  currentRates: Rate[];
};
const RatesTable = ({ currentRates }: Props) => {
  return (
    <>
      {currentRates.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="w-auto xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded border-gray-700">
            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full border-collapse text-white">
                <TableHead />
                <TableBody currentRates={currentRates} />
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RatesTable;
