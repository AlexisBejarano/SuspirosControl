import React from "react";

export default function ButtonAction({ buttonAction, buttonIco, color, colorHover }){
  console.log(buttonAction);
  return (
    <button onClick={buttonAction} className={`${color} w-12 text-white py-1 mx-1 rounded-lg ${colorHover} transition`}>{buttonIco}</button>
  );
  
};
