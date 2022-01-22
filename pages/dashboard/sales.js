import { useState, useEffect, useContext } from "react";
import moment from "moment";
import NavBarDashBoard from "../../components/NavBar/navBarDashBoard";
import { getProductsSalesByDayId } from "../../utils/products_lib";
import Stats from "../../components/Stats/stats";
import { CurrentDayContext } from "../../context/CurrentDayContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from "../../utils/supabaseClient";
import { getLastDay } from "../../utils/days_lib";

export default function Sales() {
  const [productsSelectedDay, setProductsSelectedDay] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [startDate, setStartDate] = useState();
  const [activeDays, setActiveDays] = useState([]);

  useEffect(async () => {
    setSelectedDay(await getLastDay());
    await getActiveDays();
  }, []);

  useEffect(async () => {
    
    if (selectedDay.id) {
      const { daySales } = await getProductsSalesByDayId(selectedDay.id);
      setProductsSelectedDay(daySales);
    }
  }, [selectedDay.id]);

  const handleDateSelect = () => {};
  const handleDateChange = async (date) => {
    setStartDate(date);
    const selectedDay = activeDays.find((day) => {
      return (
        moment(day.created_at).format("DD-MM-YYYY") ==
        moment(date).format("DD-MM-YYYY")
      );
    });
    console.log(selectedDay.id, "SELECTED DAY");
    setSelectedDay(selectedDay);
  };

  const getActiveDays = async () => {
    const { data: days, error } = await supabase.from("days").select("*");
    setActiveDays(days);
  };

  return (
    <>
      <NavBarDashBoard />
      <div className="flex flex-row items-center justify-center mx-2 rounded-lg my-2 p-2 bg-white">
        <div>
          <DatePicker
            selected={startDate}
            onSelect={handleDateSelect}
            onChange={(date) => handleDateChange(date)}
            includeDates={activeDays.map((day) => new Date(day.created_at))}
          />
        </div>
      </div>
      <Stats day={selectedDay} />
      <div className="bg-white mx-4 font-mono mt-4  text-xs antialiased text-slate-500 dark:text-slate-400  dark:bg-slate-900 ">
        <div className="flex flex-col ">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Nombre
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Venta
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Cant
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white  divide-y divide-gray-200">
                    {productsSelectedDay &&
                      productsSelectedDay.map((product) =>
                        product.sales.length > 0 ? (
                          product.sales.map((sale) => (
                            <tr key={sale.id}>
                              <td className="px-6  whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 "></div>
                                  <div className="">
                                    <div className="text-sm font-medium text-gray-500">
                                      {product.name}
                                    </div>
                                    <div className="text-xs font-thin font-mono text-gray-500">
                                      {moment(sale.sale_at).format(
                                        "DD-MM-YYYY h:mm:ss"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {sale.quantity * sale.sale_price}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {sale.quantity}
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
