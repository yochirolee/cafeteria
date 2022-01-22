import { useState, useEffect, useContext } from "react";
import {
  getProductsPurchaseByDayId,
  getProductsSalesByDayId,
} from "../../utils/products_lib";

import {
  calculateDailySales,
  calculateDailyPurchases,
} from "../../utils/days_lib";

export default function Stats({ day }) {
  const [dailySales, setDailySales] = useState(0);
  const [dailyPurchases, setDailyPurchases] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    const { daySales } = await getProductsSalesByDayId(day.id);
    const { dayPurchases } = await getProductsPurchaseByDayId(day.id);
    await setDailySales(await calculateDailySales(daySales));
    await setDailyPurchases(await calculateDailyPurchases(dayPurchases));
    setLoading(false);
  }, [day.id]);

  return (
    <>
      {loading  ? (
        <div className="grid grid-flow-col text-xs text-gray-400  rounded-lg  items-center  bg-gray-100 m-2 p-2 ">
          <p className="animate-pulse mx-auto">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-flow-col text-xs text-gray-400  rounded-lg gap-3 grid-cols-3 items-center  bg-gray-100 m-2 p-2 ">
          <div className="relative flex flex-col rounded-lg shadow-md px-5 py-4 bg-white cursor-pointer text-center  focus:outline-none">
            <p className="text-center font-semibold">Ganancia Hoy</p>
            <p
              className={`${
                dailySales - dailyPurchases > 0
                  ? "text-green-500 bg-green-50"
                  : "text-red-500 bg-red-50"
              } p-2 inline-flex text-lg mt-2 font-bold  rounded-lg `}
            >
              <span>$</span> {dailySales - dailyPurchases}
            </p>
          </div>
          <div className="relative flex flex-col rounded-lg shadow-md px-5 py-4 bg-white cursor-pointer text-center  focus:outline-none">
            <p className="text-center font-semibold">Venta Hoy</p>
            <p className="p-2 inline-flex text-lg mt-2 font-bold text-blue-500 rounded-lg bg-blue-50">
              <span>$</span> {dailySales}
            </p>
          </div>
          <div className="relative flex flex-col rounded-lg shadow-md px-5 py-4 bg-white cursor-pointer text-center  focus:outline-none">
            <p className="text-center font-semibold">Compra Hoy</p>
            <p className="p-2 inline-flex text-lg mt-2 font-bold text-red-500 rounded-lg bg-red-50">
              <span>$</span> {dailyPurchases}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
