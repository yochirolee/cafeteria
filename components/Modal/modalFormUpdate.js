import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ModalFormUpdate({
  show,
  onClose,
  handleUpdateProductInventory,
  productUpdate,
}) {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setUpdating(true);
    await handleUpdateProductInventory(data);
    setUpdating(false);
    reset();
    handleCloseClick();
  };

  const handleCloseClick = () => {
    onClose();
  };

  const modalContent = show ? (
    <div
      className="fixed z-10  inset-0 overflow-y-auto  "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center   pt-10 lg:px-4  text-center sm:block sm:p-0">
        <div
          className="fixed  inset-0 bg-gray-500  bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="inline-block w-full m-6 lg:w-1/4 align-bottom lg:mt-20 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex justify-end ">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="authentication-modal"
                onClick={handleCloseClick}
              ></button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mt-3  flex flex-col mx-auto">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Editar Producto
                </h3>
                <div className="mt-2 ">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-left text-sm "
                  >
                    <div className="inline-flex">
                      <span className="mr-2">Nombre:</span>
                      <p className="font-bold">{productUpdate.name}</p>
                    </div>
                    <div className="inline-flex">
                      <span className="mr-2">Precio de Compra:</span>
                      <p>{productUpdate.price}</p>
                    </div>
                    <div className="inline-flex">
                      <span className="mr-2">Precio de Venta:</span>
                      <p>{productUpdate.salePrice}</p>
                    </div>
                    <div className="inline-flex">
                      <span className="mr-2">Cantidad en Inventario:</span>
                      <p>{productUpdate.quantity}</p>
                    </div>

                    <div className="border-b py-4"></div>

                    <p className="mt-2 mx-auto">Adicionar a Inventario</p>
                    <input
                      className="bg-gray-50 w-64 mx-auto  m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      type="number"
                      placeholder="Cantidad"
                      
                      {...register("quantity", { required: true })}
                    />

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex ">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-700 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {updating ? "Updating..." : "Update"}
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
                  {error ? (
                    <div className="text-center border animate-pulse text-red-600">
                      {error.message}
                    </div>
                  ) : (
                    <div></div>
                  )}
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
