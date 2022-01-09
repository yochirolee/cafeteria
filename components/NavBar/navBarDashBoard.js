import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import Link from "next/link";
import UserActions from "./userActions";
import { getTotalDailySales } from "../../utils/products";

export default function NavBarDashBoard({ user }) {
  const [products] = useContext(ProductsContext);
  const [totalSales, setTotalSales] = useState(0);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setTotalSales(getTotalDailySales(products));
  }, [products]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <header>
      <div className="bg-gray-700  text-white w-full  h-12 flex flex-row justify-between px-2 lg:px-8 items-center">
        <div className="hidden lg:inline-block">
          <Link href="/" className="text-center  lg:block">
            <a className="font-bold text-xl "> El Triunfo</a>
          </Link>
        </div>
        <div>
          <ul className="inline-flex  cursor-pointer">
            <li className="mx-2">
              <Link href="/" className="text-center hidden lg:block">
                <div>
                  <i className="las la-home mr-1"></i>
                  <a className="hidden lg:inline-block">Dashboard</a>
                </div>
              </Link>
            </li>
            <li className="mx-2">
              <Link href="/dashboard" className="text-center hidden lg:block">
                <div>
                  <i className="las la-list mr-1"></i>
                  <a className="hidden lg:inline-block">Productos</a>
                </div>
              </Link>
            </li>
            <li className="mx-2">
              <Link
                href="/dashboard/users"
                className="text-center hidden lg:block"
              >
                <div>
                  <i className="las la-user mr-1"></i>
                  <a className="hidden lg:inline-block">Usuarios</a>
                </div>
              </Link>
            </li>
            <li className="mx-2">
              <Link
                href="/dashboard/calendar"
                className="text-center hidden lg:block"
              >
                <div>
                  <i className="las la-clipboard-list mr-1"></i>
                  <a className="hidden lg:inline-block">Reportes</a>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row items-center  justify-end lg:pr-8 py-2 ">
          <div className="flex flex-row items-center">
            <p className="mr-2 hidden lg:inline-block">Venta:</p>
            <p className=" bg-black text-sm lg:text-md rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none relative justify-end p-2  font-bold">
              $ {totalSales}
            </p>
          </div>
          <a
            className="rounded-full ml-4 bg-gray-500 w-8 h-8"
            onClick={handleToggle}
          >
            <img
              className="rounded-full object-contain"
              src="/images/elyse.png"
            />
            <UserActions toggle={toggle} user={user} />
          </a>
        </div>
      </div>
    </header>
  );
}
