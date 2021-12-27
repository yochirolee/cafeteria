import NavBar from "../components/NavBar/navbar";
import { set, useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient";
import { ProductsContext } from "../context/ProductsContext";
import { useContext, useEffect } from "react";

export default function DashBoard() {
  const [products, setProducts] = useContext(ProductsContext);

  useEffect(async () => {
    const getData = async () => {
      const { data, error } = await supabase.from("product").select();
      await setProducts(data);
      if (error) setError(error);
      return;
    };
    await getData();
  }, [products]);

  //INSERT PRODUCT
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    let { data: product, error } = await supabase
      .from("product")
      .insert([
        {
          name: data.name,
          price: data.price,
          salePrice: data.salePrice,
          quantity: data.quantity,
          image: data.image,
        },
      ])
      .single();
    if (!error) products.push(product);
  };

  //DELTE PRODUCT

  const handleDeleteProduct = async (id) => {
    const { data, error } = await supabase
      .from("product")
      .delete()
      .match({ id: id });
    if (!error) {
      const _prods = [...products];
      const index = await _prods.indexOf(_prods.find((prod) => prod.id == id));
      _prods.splice(index, 1);
      await setProducts([..._prods]);
    }
  };

  return (
    <div className="border">
      <NavBar />

      <div className="  flex flex-col   ">
        <div className="lg:flex-row w-3/4  bg-white  mx-auto rounded-xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center "
          >
            <input
              type="text"
              className="border p-1 m-2"
              placeholder="nombre"
              {...register("name", { required: true })}
            />
            <input
              className="border p-1 m-2"
              type="number"
              placeholder="precio"
              {...register("price", {})}
            />
            <input
              className="border p-1 m-2"
              type="number"
              placeholder="Precio de Venta"
              {...register("salePrice", {})}
            />
            <input
              className="border p-1 m-2"
              type="number"
              placeholder="Cantidad"
              {...register("quantity", {})}
            />
            <input
              className="border p-1 m-2"
              type="text"
              placeholder="Imagen"
              {...register("image", {})}
            />

            <input
              type="submit"
              className="border bg-gray-700  text-white p-2 m-2 w-1/2"
            />
          </form>
        </div>
        <div className=" m-2 bg-white w-auto">
          <table className="border-collapse table-auto  text-sm ">
            <thead className="border-b dark:border-gray-600 font-medium  text-gray-400 dark:text-gray-200 text-center">
              <tr>
                <th className="border-b dark:border-gray-600 font-medium  text-gray-400 dark:text-gray-200 text-center">
                  Producto
                </th>

                <th className="border-b text-center dark:border-gray-600 font-medium  text-gray-400 dark:text-gray-200 ">
                  Existencia
                </th>
                <th className="border-b dark:border-gray-600 font-medium  text-gray-400 dark:text-gray-200 text-center">
                  Vendido
                </th>
                <th className="border-b dark:border-gray-600 font-medium  text-gray-400 dark:text-gray-200 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="">
              {products ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">
                      {product.name}
                    </td>
                    <td className="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">
                      {product.quantity}
                    </td>
                    <td className="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">
                      {product.quantitySold}
                    </td>
                    <td className="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">
                      <div className="flex flex-row justify-around">
                        <button className="bg-green-500 text-white p-1 mr-2 rounded-lg">
                          Editar
                        </button>
                        <button
                          className="bg-red-500 text-white p-1 rounded-lg"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/*export async function getStaticProps(context) {
  const { data: _products, _error } = await supabase.from("product").select();

  return {
    props: { _products }, // will be passed to the page component as props
  };
}*/
