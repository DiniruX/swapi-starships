import React from "react";

function InfoElement({title, body, type}) {
  return (
    <div>
      <div className="border border-gray-400 rounded-md my-2 mx-4 px-4 py-2 bg-gray-200 text-sm md:text-md">
        <span className="capitalize font-semibold">{title} - </span>
        {body}
      </div>
    </div>
  );
}

export default InfoElement;
