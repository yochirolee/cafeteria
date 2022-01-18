import { useState, useEffect, useContext } from "react";
import moment from "moment";
import NavBarDashBoard from "../../components/NavBar/navBarDashBoard";
import Date from "../../components/Date/date";
import {
  calculateDailySales,
  createNewDayOrGetCurrentDay,
} from "../../utils/days_lib";
import { getProductsSalesByDayId } from "../../utils/products_lib";
import Stats from "../../components/Stats/stats";

export default function Sales() {
  const [productsCurrentDay, setProductsCurrentDay] = useState([]);
  const [dailySales, setDailySales] = useState(0);
  const [currentDay, setCurrentDay] = useState({});

  useEffect(async () => {
    const { day } = await createNewDayOrGetCurrentDay();
    setCurrentDay(day);
    const { daySales } = await getProductsSalesByDayId(currentDay.id);
    await setDailySales(await calculateDailySales(daySales));
    setProductsCurrentDay(daySales);
  }, [currentDay.id]);

  return (
    <>
      <NavBarDashBoard />
      <Date />
      <Stats dailySales={dailySales} />
      <div className="bg-white mx-4 mt-4 rounded text-xs">
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
                        Venta
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Cant
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {productsCurrentDay &&
                      productsCurrentDay.map((product) =>
                        product.sales.length > 0 ? (
                          product.sales.map((sale) => (
                            <tr key={sale.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10"></div>
                                  <div className="">
                                    <div className="text-sm font-medium text-gray-900">
                                      {product.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
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
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                </a>
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
