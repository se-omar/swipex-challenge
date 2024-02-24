type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
const Pagination = ({ currentPage, totalPages, setCurrentPage }: Props) => {
  const nextPage = () => {
    setCurrentPage((prevPage: number) =>
      prevPage < totalPages ? prevPage + 1 : prevPage,
    );
  };
  const previousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {totalPages > 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={previousPage}
            className={`py-2 px-4 mx-2 rounded text-white ${
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
              className={`py-2 px-4 mx-2 rounded text-white ${
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
            className={`py-2 px-4 mx-2 rounded text-white ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "bg-[#0021CC] hover:bg-[#021AA2]/90"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
