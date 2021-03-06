import { useState, useEffect, Fragment } from "react";
import moment from "moment";
import CustomDayPicker from "../../components/Date/customDayPicker";
import NavBarDashBoard from "../../components/NavBar/navBarDashBoard";
import {
  getProductsPurchasesByDayId,
  getProductsSalesByDayId,
} from "../../utils/products_lib";
import Stats from "../../components/Stats/stats";
import { supabase } from "../../utils/supabaseClient";
import { getLastDay } from "../../utils/days_lib";
import { Tab } from "@headlessui/react";
import Rebalance from "../../components/Tabs/rebalance";

export default function Details() {
  const [productsPurchasesSelectedDay, setProductsSelectedDay] = useState([]);
  const [productsSalesSelectedDay, setProductsSalesSelectedDay] = useState([]);
  const [selectedDay, setSelectedDay] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [activeDays, setActiveDays] = useState([]);

  useEffect(async () => {
    setSelectedDay(await getLastDay());
    await getActiveDays();
  }, []);

  useEffect(async () => {
    if (selectedDay) {
      const { dayPurchases } = await getProductsPurchasesByDayId(
        selectedDay.id
      );
      const { daySales } = await getProductsSalesByDayId(selectedDay.id);
      setProductsSalesSelectedDay(daySales);

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

  function MyTabs() {
    return (
      <Tab.Group>
        <Tab.List>
          <div
            className="flex p-1 mb-2 space-x-1 bg-gray-700 mx-2 rounded-xl"
            role="tablist"
            aria-orientation="horizontal"
          >
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg focus:outline-none ring-2 ring-offset-2 ring-offset-gray-400 ring-white ring-opacity-60 bg-white/[0.12] "
                      : "w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-400 ring-white ring-opacity-60 hover:bg-white/[0.12] hover:text-white"
                  }
                  id="headlessui-tabs-tab-1"
                  role="tab"
                  type="button"
                  aria-selected="false"
                  tabIndex="-1"
                >
                  Ventas
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className="w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-400 ring-white ring-opacity-60 hover:bg-white/[0.12] hover:text-white"
                  id="headlessui-tabs-tab-1"
                  role="tab"
                  type="button"
                  aria-selected="false"
                  tabIndex="-1"
                >
                  Compras
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className="w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-400 ring-white ring-opacity-60 hover:bg-white/[0.12] hover:text-white"
                  id="headlessui-tabs-tab-1"
                  role="tab"
                  type="button"
                  aria-selected="false"
                  tabIndex="-1"
                >
                  Rebalanceo
                </button>
              )}
            </Tab>
          </div>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className=" rounded-xl  bg-gray-100  overflow-y-auto mx-2 px-3  focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-400 ring-white ring-opacity-60">
              <ul className="pt-3">
                {productsSalesSelectedDay &&
                  productsSalesSelectedDay.map((product) =>
                    product.sales.length > 0 ? (
                      product.sales.map((sale) => (
                        <li key={sale.id} className="relative flex   items-center bg-white shadow-md p-3  mb-2 rounded-md hover:bg-gay-50">
                          <h3 className="text-sm basis-1/4 text-center font-medium leading-5">
                            {product.name}
                          </h3>
                          <ul className="flex  flex-row w-full justify-around mt-1 space-x-1 text-xs font-normal leading-4 text-gray-500">
                            <li className="flex flex-col  text-center">
                              <span>Hora:</span>
                              <p className="mt-2">
                                {moment(sale.created_at).format("h:mm:ss")}
                              </p>
                            </li>

                            <li className="flex flex-col text-center">
                              <span>Cantidad</span>
                              <p className=" mt-2">{sale.quantity}</p>
                            </li>

                            <li className="flex flex-col ">
                              <span>Valor Total</span>
                              <span className="px-2 mt-2  inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {sale.quantity * sale.sale_price}
                              </span>
                            </li>
                          </ul>
                          <a
                            href="#"
                            className="absolute inset-0 rounded-md focus:z-10 focus:outline-none focus:ring-2 ring-gray-400"
                          ></a>
                        </li>
                      ))
                    ) : (
                      <></>
                    )
                  )}
              </ul>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className=" rounded-xl  bg-gray-100 overflow-y-auto mx-2 px-3  focus:outline-none focus:ring-2 ring-offset-2 ring-gray-400 ring-opacity-60">
              <ul className="pt-3">
                {productsPurchasesSelectedDay &&
                  productsPurchasesSelectedDay.map((product) =>
                    product.purchases.length > 0 ? (
                      product.purchases.map((buy) => (
                        <li key={buy.id} className="relative flex   items-center bg-white shadow-md p-3  mb-2 rounded-md hover:bg-gray-50">
                          <h3 className="text-sm basis-1/4 text-center font-medium leading-5">
                            {product.name}
                          </h3>
                          <ul className="flex  flex-row w-full justify-around mt-1 space-x-1 text-xs font-normal leading-4 text-gray-500">
                            <li className="flex flex-col  text-center">
                              <span>Hora:</span>
                              <p className=" mt-2">
                                {moment(buy.created_at).format("h:mm:ss")}
                              </p>{" "}
                            </li>

                            <li className="flex flex-col text-center">
                              <span>Cantidad</span>
                              <p className=" mt-2">{buy.quantity}</p>
                            </li>

                            <li className="flex flex-col text-center">
                              <span>Valor Total</span>{" "}
                              <span className="px-2 mt-2  inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                $ {buy.quantity * buy.cost}
                              </span>
                            </li>
                          </ul>
                          <a
                            href="#"
                            className="absolute inset-0 rounded-md focus:z-10 focus:outline-none focus:ring-2 ring-gray-400"
                          ></a>
                        </li>
                      ))
                    ) : (
                      <></>
                    )
                  )}
              </ul>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <Rebalance selectedDay={selectedDay} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    );
  }
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
      <MyTabs />
    </>
  );
}
