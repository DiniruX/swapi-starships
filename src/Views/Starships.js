import React, { useEffect, useState } from "react";
import axiosInstance from "../Interceptors/AxiosInstance";
import Card from "../Components/Card";
import Search from "../Components/Search";
import loader from "../loader1.gif";

function Starships() {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/starships/?page=1")
      .then((response) => {
        setStarships(response.data.results);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching starships:", error);
        setLoading(false);
      });
  }, []);

  const goToNextPage = () => {
    const relativeNextPage = nextPage.replace("https://swapi.dev/api", "");

    axiosInstance
      .get(relativeNextPage)
      .then((response) => {
        setStarships(response.data.results);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
      })
      .catch((error) => {
        console.error("Error fetching next page:", error);
      });
  };

  const goToPreviousPage = () => {
    const relativePreviousPage = previousPage.replace("https://swapi.dev/api", "");

    axiosInstance
      .get(relativePreviousPage)
      .then((response) => {
        setStarships(response.data.results);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
      })
      .catch((error) => {
        console.error("Error fetching previous page:", error);
      });
  };

  return (
    <div className="text-gray-800">
      <Search />
      <hr className="mx-2" />
      {loading ? (
        <div className="flex justify-center my-4">
          <img className="w-6 md:w-12" src={loader}/>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 my-4 px-2">
          {starships.map((ship, index) => (
            <Card key={index} starship={ship} />
          ))}
        </div>
      )}
      <hr className="mx-2" />
      <div className="flex justify-center lg:justify-end gap-2 my-4 mx-2">
        {previousPage && (
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer" onClick={goToPreviousPage}>
            Previous
          </button>
        )}
        {nextPage && (
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer" onClick={goToNextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Starships;