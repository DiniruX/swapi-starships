import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ starship }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    const starshipId = starship.url.replace("https://swapi.dev/api/starships/", "");
    const url = starship.url;
    navigate(`/starship/${starshipId}`, { state: { url } });
  };

  return (
    <div>
      <div className="h-32 w-full bg-gray-400 rounded-lg shadow px-4 py-2">
        <h1 className="text-center font-extrabold text-md md:text-lg">{starship.name}</h1>
        <hr className="my-1" />
        <p className="capitalize text-sm md:text-md">
          <span className="capitalize font-semibold text-sm md:text-md">model - </span>
          {starship.model}
        </p>
        <p className="capitalize text-sm md:text-md">
          <span className="capitalize font-semibold text-sm md:text-md">manufacturer - </span>
          {starship.manufacturer?.slice(0, 31)}
          {starship.manufacturer?.length > 31 && "..."}
        </p>
        <p className="capitalize text-sm mt-2 text-right text-white font-bold cursor-pointer hover:underline" onClick={handleViewMore}>
          view more
        </p>
      </div>
    </div>
  );
}

export default Card;
