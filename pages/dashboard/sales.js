import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import moment from "moment";
import NavBarDashBoard from "../../components/NavBar/navBarDashBoard";
import Date from "../../components/Date/date";

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [dailySales,setDailySales]=useState(0);

  useEffect(async () => {
    const { data, error } = await supabase
      .from("products")
      .select("id,name, sales(*)")
      .order("created_at");
    setProducts(data);
    setDailySales(await calculateDailySales());
  }, [products.length]);

 
  const calculateDailySales = async () => {
    const _dailySales = 0;
    console.log(products)
    if (products) {
      await products.map((product) => {
        product.sales.map((sale) => {
          _dailySales += sale.sale_price * sale.quantity;
        });
      });
      return _dailySales;
    }
  };

  return (
    <>
      <NavBarDashBoard />
      <Date />
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
                    {products &&
                      products.map((product) =>
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
                                      {moment(sale.created_at).format(
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
