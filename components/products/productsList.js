import ProductCard from "./productCard";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { updateProduct } from "../../utils/products_lib";
import { CurrentDayContext } from "../../context/CurrentDayContext";

export default function ProductList() {
  const [products, setProducts] = useContext(ProductsContext);
  const [currentDay] = useContext(CurrentDayContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(async () => {
    const results = await products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {}, [products]);

  const handleProductUpdate = async (id, count) => {
    console.log("handle Product Update");
    const prod = products.find((product) => product.id == id);
    if (count > 0 && prod.quantity - count >= 0) {
      prod.quantity = prod.quantity - count;
      prod.quantity_sold = prod.quantity_sold + count;

      const { error } = updateProduct(prod, count, currentDay);

      if (!error) {
        const index = products.indexOf(prod);
        let _products = [...products];
        _products[index] = prod;
        setProducts(_products);
      }
    }
  };

  return products ? (
    <div className=" flex flex-col lg:grid  lg:grid-cols-6 justify-items-center">
      <header className="inline-flex w-full mx-auto bg-transparent shadow-sm items-center rounded-lg m-2 justify-around py-2 border-gray-500 border-dashed">
        <div className="my-3 w-full  px-4 relative rounded-md ">
          <input
            type="text"
            name="search"
            className=" h-12 w-full block  pl-7 pr-12 border  rounded-md"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <div className="absolute   rounded-r-md  inset-y-0 right-0 flex  items-center">
            <i className="las la-search items-center text-2xl pr-6 mt-1 text-gray-400 "></i>
          </div>
        </div>
      </header>

      {searchTerm
        ? searchResults.map((result) => (
            <ProductCard
              key={result.id}
              product={result}
              handleProductUpdate={handleProductUpdate}
            />
          ))
        : products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              handleProductUpdate={handleProductUpdate}
            />
          ))}
    </div>
  ) : (
    <div>Loading</div>
  );
}
