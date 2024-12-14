import React from "react";

function Header() {
  return <div className="bg-gray-800 h-28 md:h-36 flex flex-col gap-3 items-center justify-center">
  <p className="font-extrabold text-5xl md:text-6xl text-yellow-600">Star Wars API</p>
  <p className="font-semibold text-2xl md:text-3xl text-white">Starships</p>
  </div>;
}

export default Header;
