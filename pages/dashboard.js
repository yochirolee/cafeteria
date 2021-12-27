import NavBar from "../components/NavBar/navbar";
import { set, useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient";
import { ProductsContext } from "../context/ProductsContext";
import { useContext, useEffect, useState } from "react";
import ModalForm from "../components/Modal/modalForm";

export default function DashBoard() {
  const [products, setProducts] = useContext(ProductsContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    const getData = async () => {
      const { data, error } = await supabase.from("product").select();
      await setProducts(data);
      if (error) setError(error);
      return;
    };
    await getData();
  }, [products]);

  /*INSERT PRODUCT
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
*/
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
    <div>
      <NavBar />

      <div className="container mx-auto  ">
        <ModalForm
          onClose={() => setShowModal(false)}
          show={showModal}
        ></ModalForm>

        <div className="flex flex-row justify-evenly bg-white rounded-lg p-2 m-2">
          <div className=" flex flex-col items-center p-2 rounded-lg bg-white shadow-lg border">
            <p className="font-bold text-xl text-gray-500">$ 34 000</p>
            <p>Venta Diaria</p>
          </div>
          <div className="p-2 rounded-lg bg-white shadow-lg border">
            Venta Semanal
          </div>
          <div className="p-2 rounded-lg bg-white shadow-lg border">
            Venta Mesual
          </div>
          <div className="p-2 rounded-lg bg-white shadow-lg border">
            Venta Total
          </div>
        </div>

        <div className=" m-2 bg-white w-auto flex flex-col  ">
          <div className="flex flex-row justify-between  items-center border-b">
            <p className="ml-2">Inventario:</p>
            <i
              className="bg-gray-700 text-white p-1 px-2 m-2 rounded-lg las la-plus  "
              onClick={() => setShowModal(true)}
            ></i>
          </div>
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
                      <div className="flex flex-row justify-around align-middle text-center">
                        <i className="las la-edit w-12 h-12 text-green-500 text-xl cursor-pointer"></i>
                        <i
                          className="las la-trash w-12 h-12 text-red-500 text-xl cursor-pointer"
                          onClick={() => handleDeleteProduct(product.id)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="flex flex-row border">
                  <p className="p-2 mx-auto">No hay Productos Disponibles</p>
                </div>
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
