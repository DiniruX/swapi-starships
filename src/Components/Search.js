import React, { useState } from "react";
import axiosInstance from "../Interceptors/AxiosInstance";
import Card from "../Components/Card";
import loader from "../loader1.gif";

function Search() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [resultCount, setResultCount] = useState(0);
  const noResultsMessage = "No results found. Try a different search term.";

  const handleSearch = () => {
    if (!query.trim()) {
      alert("Please enter a search term.");
      return;
    }

    let noOfResults = 0;
    setActiveSearch(true);
    setLoading(true);
    axiosInstance
      .get(`/starships/?search=${query}`)
      .then((response) => {
        setSearchResults(response.data.results || []);
        setResultCount(response.data.count);
        noOfResults = response.data.count;
        setLoading(false);
      })

      // If search results are 0, turn activeSearch false after 5 seconds
      .then(() => {
        setTimeout(() => {
          if (noOfResults === 0) {
            console.log("No results found. Turning off active search.");
            setActiveSearch(false);
            setQuery("");
          }
        }, 5000);
      })
      .catch((error) => {
        console.error("Error during search:", error);
        setLoading(false);
      });
  };

  const closeSearch = () => {
    setActiveSearch(false);
    setQuery("");
  };

  return (
    <div>
      <div className="my-4 mx-2 flex justify-end">
        <input
          type="text"
          placeholder="Search by starship name or model"
          className="md:w-1/3 lg:w-1/4 px-4 py-2 rounded-lg border border-gray-800"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer ml-2" onClick={handleSearch}>
          Search
        </button>
      </div>
      {activeSearch && (
        <div className="my-4">
          {loading ? (
            <div className="flex justify-center my-4">
              <img className="w-6 md:w-12" src={loader} />
            </div>
          ) : searchResults.length > 0 ? (
            <div className="bg-gray-200 mx-2 rounded-lg px-4 py-2">
              <div className="flex justify-between">
                <p className="text-md md:text-lg font-bold capitalize">search results ({resultCount} found)</p>
                <span className="text-sm underline cursor-pointer" onClick={closeSearch}>
                  close
                </span>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                {searchResults.map((ship, index) => (
                  <Card key={index} starship={ship} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-800">{noResultsMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
