import React from "react";

export default function ButtonEntradasSalidas({ buttonEntradasSalidas }){
  return (
      <button className="bg-green-500 min-w-24 text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition">
        {buttonEntradasSalidas}
      </button>
  );
};
