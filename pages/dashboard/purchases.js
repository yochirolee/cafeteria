import { useState, useEffect, useContext } from "react";
import moment from "moment";
import CustomDayPicker from "../../components/Date/customDayPicker";
import NavBarDashBoard from "../../components/NavBar/navBarDashBoard";
import { getProductsPurchasesByDayId } from "../../utils/products_lib";
import Stats from "../../components/Stats/stats";
import { supabase } from "../../utils/supabaseClient";
import { getLastDay } from "../../utils/days_lib";

export default function Purchases() {
  const [productsSelectedDay, setProductsSelectedDay] = useState([]);
  const [selectedDay, setSelectedDay] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [activeDays, setActiveDays] = useState([]);

  useEffect(async () => {
    setSelectedDay(await getLastDay());
    await getActiveDays();
  }, []);

  useEffect(async () => {
    if (selectedDay) {
      const { dayPurchases } = await getProductsPurchasesByDayId(selectedDay.id);
      setProductsSelectedDay(dayPurchases);
    }
  }, [selectedDay.id]);

  const handleDateSelect = () => {};
  const handleDateChange = async (date) => {
    setStartDate(date);
    const selectedDay = await activeDays.find((day) => {
      return (
        moment(day.created_at).format("DD-MM-YYYY") ==
        moment(date).format("DD-MM-YYYY")
      );
    });
    setSelectedDay(selectedDay);
  };

  const getActiveDays = async () => {
    const { data: days, error } = await supabase.from("days").select("*");
    setActiveDays(days);
  };

  return (
    <>
      <NavBarDashBoard />
      <CustomDayPicker
        startDate={startDate}
        activeDays={activeDays}
        handleDateSelect={handleDateSelect}
        handleDateChange={handleDateChange}
      />
      <Stats day={selectedDay} />

      <div className="antialiased font-mono text-slate-500 dark:text-slate-400  dark:bg-slate-900 bg-white mx-4 mt-4 rounded text-xs">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Inv
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Cant
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {productsSelectedDay &&
                      productsSelectedDay.map((product) =>
                        product.purchases.length > 0 ? (
                          product.purchases.map((buy) => (
                            <tr key={buy.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10"></div>
                                  <div className="">
                                    <div className="text-sm font-medium text-gray-900">
                                      {product.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {moment(buy.created_at).format(
                                        "DD-MM-YYYY h:mm:ss"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  {buy.quantity * buy.cost}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {buy.quantity}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <></>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
