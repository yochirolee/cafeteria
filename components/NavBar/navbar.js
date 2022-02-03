import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import Link from "next/link";
import UserActions from "./userActions";
import { getTotalDailySales } from "../../utils/products_lib";

export default function NavBar({ user }) {
  const [{ dailySales }] = useContext(ProductsContext);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <header>
      <div className="bg-gray-700 text-white w-full  h-12 flex flex-row justify-between px-2 lg:px-8 items-center">
        <div>
          <Link href="/" className="text-center hidden lg:block">
            <a className="font-bold text-xl "> El Triunfo</a>
          </Link>
        </div>
        <div className="flex flex-row items-center  justify-end lg:pr-8 py-2 ">
          <div className="flex flex-row items-center">
            <p className="mr-2 ">Venta:</p>
            <p className=" bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none relative justify-end p-2  font-bold">
              $ {dailySales}
            </p>
          </div>
          <a
            className="rounded-full ml-4 bg-gray-500 w-8 h-8"
            onClick={handleToggle}
          >
            <img
              className="rounded-full object-contain"
              src="images/elyse.png"
            />
            <UserActions toggle={toggle} user={user} />
          </a>
        </div>
      </div>
    </header>
  );
}
