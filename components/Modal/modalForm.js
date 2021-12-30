import { useState, useContext, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { supabase } from "../../utils/supabaseClient";
import { ProductsContext } from "../../context/ProductsContext";

export default function ModalForm({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [products, setProducts] = useContext(ProductsContext);
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
    if (!error) {
      products.push(product);
      handleCloseClick();
    }
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = () => {
    onClose();
  };

  const modalContent = show ? (
    <div
      className="fixed z-10 inset-0 overflow-y-auto "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center  min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
               <i className="las la-plus-circle text-green-500 text-3xl"></i>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Adicionar Producto
                </h3>
                <div className="mt-2">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center "
                  >
                    <input
                      type="text"
                      className="border p-1 m-2  rounded-md"
                      placeholder="nombre"
                      {...register("name", { required: true })}
                    />
                    <input
                      className="border p-1 m-2 rounded-md"
                      type="number"
                      placeholder="precio"
                      {...register("price", {})}
                    />
                    <input
                      className="border p-1 m-2  rounded-md"
                      type="number"
                      placeholder="Precio de Venta"
                      {...register("salePrice", {})}
                    />
                    <input
                      className="border p-1 m-2  rounded-md"
                      type="number"
                      placeholder="Cantidad"
                      {...register("quantity", {})}
                    />
                    <input
                      className="border p-1 m-2  rounded-md"
                      type="text"
                      placeholder="Imagen"
                      {...register("image", {})}
                    />
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Adicionar
                      </button>
                      <button
                      onClick={handleCloseClick}
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return modalContent;
}
