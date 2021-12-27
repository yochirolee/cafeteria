import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";

export default function NavBar() {
  const [products] = useContext(ProductsContext);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const sales = 0;
    if (products)
      products.map((product) => {
        sales += product.quantitySold * product.salePrice;
      });
    setTotalSales(sales);
  }, [products]);

  return (
    <header>
      <div className="bg-gray-700 text-white w-full mb-4 h-12 flex flex-row justify-between px-2 lg:px-8 items-center">
        <a className="font-bold text-xl"> El Triunfo</a>
        <div className="flex flex-row items-center  justify-end lg:pr-8 py-2 ">
          <div className="flex flex-row items-center">
            <p className="mr-4 ">Venta:</p>
            <p className=" ring-1 ring-gray-500 relative justify-end p-1 rounded-lg font-bold">
              $ {totalSales}
            </p>
          </div>
          <a className="rounded-full ml-4 bg-gray-500 w-8 h-8">
            <img
              className="rounded-full object-contain"
              src="images/elyse.png"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
