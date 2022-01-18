import { useState, useEffect } from "react";
import moment from "moment";
import Date from "../../components/Date/date";
import NavBarDashBoard from "../../components/NavBar/navBarDashBoard";
import Stats from "../../components/Stats/stats";
import { getProductsPurchaseByDayId } from "../../utils/products_lib";
import { createNewDayOrGetCurrentDay } from "../../utils/days_lib";

export default function Purchases({ user }) {
  const [currentDay, setCurrentDay] = useState({});
  const [productsCurrentDay, setProductsCurrentDay] = useState([]);
  const [dailyPurchase, setDailyPurchase] = useState(0);

  useEffect(async () => {
    console.log("rinnung");
    const { day } = await createNewDayOrGetCurrentDay();
    const { dayPurchases } = await getProductsPurchaseByDayId(day.id);
    setProductsCurrentDay(dayPurchases);
  }, [currentDay.id]);

  const calculateDailyPurchase = async () => {
    const _dailyPurchase = 0;
    if (productsCurrentDay) {
      await productsCurrentDay.map((product) => {
        product.purchase.map((buy) => {
          _dailyPurchase += buy.cost * buy.quantity;
        });
      });
      return _dailyPurchase;
    }
  };

  return (
    <>
      <NavBarDashBoard />
      <Date />
      <Stats dailyPurchase={dailyPurchase} />
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
                    {productsCurrentDay &&
                      productsCurrentDay.map((product) =>
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
