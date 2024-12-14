import React, { useEffect, useState } from "react";
import axiosInstance from "../Interceptors/AxiosInstance";
import { useLocation } from "react-router-dom";
import loader from "../loader1.gif";

function StarshipInfo() {
  const location = useLocation();
  const url = location.state?.url;
  const [starship, setStarship] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState("");
  const [itemLoading, setItemLoading] = useState(false);

  useEffect(() => {
    if (url) {
      const relativeUrl = url.replace("https://swapi.dev/api", "");
      axiosInstance
        .get(relativeUrl)
        .then((response) => {
          setStarship(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching starship:", error);
          setLoading(false);
        });
    }
  }, [url]);

  const fetchFilms = (url) => {
    setItemLoading(true);
    axiosInstance
      .get(url.replace("https://swapi.dev/api", ""))
      .then((response) => {
        setItem(response.data);
        setItemLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching films:", error);
        setItemLoading(false);
      });
  };

  const fetchPilots = (url) => {
    setItemLoading(true);
    axiosInstance
      .get(url.replace("https://swapi.dev/api", ""))
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
        setItemLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pilots:", error);
        setItemLoading(false);
      });
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div className=" my-4 border mx-2 md:mx-16 lg:mx-48 rounded-lg shadow-lg px-4 py-2">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer ml-2" onClick={goBack}>
          Back
        </button>
        <h1 className="text-xl md:text-2xl font-extrabold text-center capitalize">starship Information</h1>
        {loading ? (
          <div className="flex justify-center my-4">
            <img className="w-6 md:w-12" src={loader} />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 mt-4 md:border-r">
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">Name - </span>
                {starship.name}
              </div>
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">Model - </span>
                {starship.model}
              </div>
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">passengers - </span>
                {starship.passengers}
              </div>
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">class - </span>
                {starship.starship_class}
              </div>
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">max atmosphering speed - </span>
                {starship.max_atmosphering_speed}
              </div>
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">length - </span>
                {starship.length}
              </div>
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">hyperdrive rating - </span>
                {starship.hyperdrive_rating}
              </div>
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">crew - </span>
                {starship.crew}
              </div>
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">cost in credits - </span>
                {starship.cost_in_credits}
              </div>
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">consumables - </span>
                {starship.consumables}
              </div>
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">cargo capacity - </span>
                {starship.cargo_capacity}
              </div>
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">MGLT - </span>
                {starship.MGLT}
              </div>
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">films - </span>
                <div className="flex gap-1">
                  {starship.films.map((film, index) => (
                    <span className="cursor-pointer border rounded-sm bg-gray-600 text-white hover:bg-gray-800 hover:shadow px-1" key={index} onClick={() => fetchFilms(film)}>
                      Film {index + 1}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                <span className="capitalize font-semibold">pilots - </span>
                {starship.pilots.length === 0 ? (
                  <span className="capitalize">no pilots</span>
                ) : (
                  <div className="flex gap-1">
                    {starship.pilots.map((pilot, index) => (
                      <span className="cursor-pointer border rounded-sm bg-gray-600 text-white hover:bg-gray-800 hover:shadow px-1" key={index} onClick={() => fetchPilots(pilot)}>
                        Pilot {index + 1}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 mb-2 mt-6 md:mx-4 rounded-md border border-gray-400">
              {item === "" ? (
                <div className="text-center justify-center my-4">Click on a film or pilot to view more information</div>
              ) : itemLoading ? (
                <div className="flex justify-center my-4">
                  <img className="w-6 md:w-12" src={loader} />
                </div>
              ) : (
                <div>
                  {item.name && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">name - </span>
                      {item.name}
                    </div>
                  )}
                  {item.height && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">height - </span>
                      {item.height}
                    </div>
                  )}
                  {item.mass && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">mass - </span>
                      {item.mass}
                    </div>
                  )}
                  {item.birth_year && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">birth year - </span>
                      {item.birth_year}
                    </div>
                  )}
                  {item.eye_color && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">eye color - </span>
                      {item.eye_color}
                    </div>
                  )}
                  {item.gender && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">gender - </span>
                      {item.gender}
                    </div>
                  )}
                  {item.hair_color && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">hair color - </span>
                      {item.hair_color}
                    </div>
                  )}
                  {item.homeworld && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">homeworld - </span>
                      {item.homeworld}
                    </div>
                  )}
                  {item.skin_color && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">skin color - </span>
                      {item.skin_color}
                    </div>
                  )}

                  {item.title && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">title - </span>
                      {item.title}
                    </div>
                  )}
                  {item.director && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">director - </span>
                      {item.director}
                    </div>
                  )}
                  {item.producer && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">producer - </span>
                      {item.producer}
                    </div>
                  )}
                  {item.characters && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">characters - </span>
                      <div className="flex flex-wrap">
                        {item.characters.map((character, index) => (
                          <a
                            href={character}
                            target="_blank"
                            rel="noreferrer"
                            className="cursor-pointer border rounded-sm bg-gray-600 text-white hover:bg-gray-800 hover:shadow px-1"
                            key={index}
                          >
                            Character {index + 1}&nbsp;
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.episode_id && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">episode id - </span>
                      {item.episode_id}
                    </div>
                  )}
                  {item.opening_crawl && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">opening crawl - </span>
                      {item.opening_crawl}
                    </div>
                  )}
                  {item.planets && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">planets - </span>
                      <div className="flex flex-wrap">
                        {item.planets.map((planet, index) => (
                          <a
                            href={planet}
                            target="_blank"
                            rel="noreferrer"
                            className="cursor-pointer border rounded-sm bg-gray-600 text-white hover:bg-gray-800 hover:shadow px-1"
                            key={index}
                          >
                            Planet {index + 1}&nbsp;
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.release_date && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">release date - </span>
                      {item.release_date}
                    </div>
                  )}
                  {item.species && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">spacies - </span>
                      <div className="flex flex-wrap">
                        {item.species.map((specie, index) => (
                          <a
                            href={specie}
                            target="_blank"
                            rel="noreferrer"
                            className="cursor-pointer border rounded-sm bg-gray-600 text-white hover:bg-gray-800 hover:shadow px-1"
                            key={index}
                          >
                            Specie {index + 1}&nbsp;
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.starships && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">starships - </span>
                      <div className="flex flex-wrap">
                        {item.starships.map((starship, index) => (
                          <a
                            href={starship}
                            target="_blank"
                            rel="noreferrer"
                            className="cursor-pointer border rounded-sm bg-gray-600 text-white hover:bg-gray-800 hover:shadow px-1"
                            key={index}
                          >
                            Starship {index + 1}&nbsp;
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.vehicles && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">vehicles - </span>
                      <div className="flex flex-wrap">
                        {item.vehicles.map((vehicle, index) => (
                          <a
                            href={vehicle}
                            target="_blank"
                            rel="noreferrer"
                            className="cursor-pointer border rounded-sm bg-gray-600 text-white hover:bg-gray-800 hover:shadow px-1"
                            key={index}
                          >
                            Vehicle {index + 1}&nbsp;
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StarshipInfo;
