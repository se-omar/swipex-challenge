const EmptyState = () => {
  return (
    <div className="w-auto xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-6">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded border-gray-700">
        <div className="flex items-center justify-center bg-gray-800 text-white py-20">
          <div className="text-center">
            <p className="text-xl font-semibold">No exchange rates available</p>
            <p className="mt-2">Please try adjusting your search criteria.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
