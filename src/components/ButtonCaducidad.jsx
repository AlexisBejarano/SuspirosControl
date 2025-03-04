import React from "react";

export default function ButtonCaducidad({ buttonCaducidad }){
  return (
    <button className="bg-green-500 w-full text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition">
      {buttonCaducidad}
    </button>
  );
};
