import ProductsTable from "../../components/Table/ProductsTable";
import NavBarDashBoard from "../../components/NavBar/navBarDashBoard";
import { useState, useContext, useEffect } from "react";
import { ProductsContext } from "../../context/ProductsContext";

export default function IPV() {
  const [{ products, isLoading, isError, dailySales }, dispatch] =
    useContext(ProductsContext);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(async () => {
    const results = await products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <NavBarDashBoard />
      <div className=" w-full pt-4  px-4 relative rounded-md ">
        <input
          type="text"
          name="search"
          className=" h-12 w-full block  pl-7 pr-12 border  rounded-md"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <div className="absolute   rounded-r-md  inset-y-0 right-0 flex  items-center">
          {!searchTerm ? (
            <i className="las la-search items-center text-2xl pr-6 mt-4 text-gray-400 "></i>
          ) : (
            <i
              onClick={() => {
                setSearchTerm("");
              }}
              className="las la-times items-center text-2xl pr-6 mt-4 text-gray-400 "
            ></i>
          )}
        </div>
      </div>
      <div className=" flex flex-nowrap bg-white/90 text-slate-600 justify-around border m-4">
        <div className="rounded-lg bg-white p-4  m-2 text-center">
          <p>Venta:</p>
          <p className="font-bold">{dailySales}</p>
        </div>
      </div>
      {searchTerm ? (
        <ProductsTable
          products={searchResults}
          isLoading={isLoading}
          isError={isError}
          dailySales={dailySales}
          dispatch={dispatch}
        />
      ) : (
        <ProductsTable
          products={products}
          isLoading={isLoading}
          isError={isError}
          dailySales={dailySales}
          dispatch={dispatch}
        />
      )}
    </>
  );
}
