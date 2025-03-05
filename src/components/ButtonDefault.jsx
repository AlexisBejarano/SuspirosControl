import React from "react";

export default function ButtonDefault({ buttonAction, textButton, bgButton, hoverBgButton, widthButton, marginButton, colorButton  }){
  return (
    <>
      <button onClick={buttonAction} className={`${bgButton} ${hoverBgButton} ${widthButton} ${colorButton} px-3 py-1 ${marginButton} rounded-lg  transition`}>{textButton}</button>
    </>
  );
};
