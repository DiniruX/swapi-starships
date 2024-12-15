import React from "react";

function Pagination({ nextPage, previousPage, goToNextPage, goToPreviousPage }) {
  return (
    <div className="flex justify-center lg:justify-end gap-2 my-4 mx-2">
      {previousPage && (
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer"
          onClick={goToPreviousPage}
        >
          Previous
        </button>
      )}
      {nextPage && (
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer"
          onClick={goToNextPage}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;