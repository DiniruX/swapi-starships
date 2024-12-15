import React, { useEffect, useState } from "react";
import axiosInstance from "../Interceptors/AxiosInstance";
import { useLocation } from "react-router-dom";
import loader from "../loader1.gif";
import InfoElement from "../Components/InfoElement";

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
              <InfoElement title="Name" body={starship.name} type="text" />
              <InfoElement title="Model" body={starship.model} type="text" />
              <InfoElement title="Manufacturer" body={starship.manufacturer} type="text" />
              <InfoElement title="passengers" body={starship.passengers} type="text" />
              <InfoElement title="class" body={starship.starship_class} type="text" />
              <InfoElement title="max atmosphering speed" body={starship.max_atmosphering_speed} type="text" />
              <InfoElement title="length" body={starship.length} type="text" />
              <InfoElement title="hyperdrive rating" body={starship.hyperdrive_rating} type="text" />
              <InfoElement title="crew" body={starship.crew} type="text" />
              <InfoElement title="cost in credits" body={starship.cost_in_credits} type="text" />
              <InfoElement title="consumables" body={starship.consumables} type="text" />
              <InfoElement title="cargo capacity" body={starship.cargo_capacity} type="text" />
              <InfoElement title="MGLT" body={starship.MGLT} type="text" />
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
                  {item.name && <InfoElement title="Name" body={item.name} type="text" />}
                  {item.height && <InfoElement title="Height" body={item.height} type="text" />}
                  {item.mass && <InfoElement title="Mass" body={item.mass} type="text" />}
                  {item.birth_year && <InfoElement title="Birth Year" body={item.birth_year} type="text" />}
                  {item.eye_color && <InfoElement title="Eye Color" body={item.eye_color} type="text" />}
                  {item.gender && <InfoElement title="gender" body={item.gender} type="text" />}
                  {item.hair_color && <InfoElement title="Hair Color" body={item.hair_color} type="text" />}
                  {item.homeworld && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">Homeworld - </span>
                      <a
                        href={item.homeworld}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer border rounded-sm bg-gray-600 text-white hover:bg-gray-800 hover:shadow px-1"
                      >
                        Homeworld
                      </a>
                    </div>
                  )}
                  {item.skin_color && <InfoElement title="Skin color" body={item.skin_color} type="text" />}
                  {item.title && <InfoElement title="Title" body={item.title} type="text" />}
                  {item.director && <InfoElement title="Director" body={item.director} type="text" />}
                  {item.producer && <InfoElement title="Producer" body={item.producer} type="text" />}
                  {item.characters && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">characters - </span>
                      {item.characters.length === 0 ? (
                        <span className="capitalize">no characters</span>
                      ) : (
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
                      )}
                    </div>
                  )}
                  {item.episode_id && <InfoElement title="Episode ID" body={item.episode_id} type="text" />}
                  {item.opening_crawl && <InfoElement title="Opening Crawl" body={item.opening_crawl} type="text" />}
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
                  {item.release_date && <InfoElement title="Release Date" body={item.release_date} type="text" />}
                  {item.species && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">spacies - </span>
                      {item.species.length === 0 ? (
                        <span className="capitalize">no species</span>
                      ) : (
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
                      )}
                    </div>
                  )}
                  {item.starships && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">starships - </span>
                      {item.starships.length === 0 ? (
                        <span className="capitalize">no starships</span>
                      ) : (
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
                      )}
                    </div>
                  )}
                  {item.vehicles && (
                    <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
                      <span className="capitalize font-semibold">vehicles - </span>
                      {item.vehicles.length === 0 ? (
                        <span className="capitalize">no vehicles</span>
                      ) : (
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
                      )}
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
