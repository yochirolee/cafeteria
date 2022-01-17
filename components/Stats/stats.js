import { useState } from "react";

export default function Stats({ dailyPurchase, dailySales }) {
  console.log(dailyPurchase, "daily purchases");
  return (
    <div className="grid grid-flow-col text-xs text-gray-400  rounded-lg gap-3 grid-cols-3 items-center  bg-gray-100 m-2 p-2 ">
      <div className="relative flex flex-col rounded-lg shadow-md px-5 py-4 bg-white cursor-pointer text-center  focus:outline-none">
        <p className="text-center font-semibold">Venta Hoy</p>
        <p className="p-2 inline-flex text-lg mt-2 font-bold text-green-500 rounded-lg bg-green-50">
          <span>$</span> {dailySales}
        </p>
      </div>
      <div className="relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none">
        Venta Semana
      </div>
      <div className="relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none">
        Venta Mes
      </div>
    </div>
  );
}
