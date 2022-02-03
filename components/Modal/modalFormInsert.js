import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ModalFormInsert({
  show,
  onClose,
  handleInsertProduct,
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
    await handleInsertProduct(data);
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
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mt-3  flex flex-col mx-auto">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Adicionar Producto
                </h3>
                <div className="mt-2 ">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center  "
                  >
                    <input
                      type="text"
                      className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Nombre"
                      {...register("name", { required: true })}
                    />
                    <input
                      className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      type="number"
                      step="any"
                      placeholder="Precio de Compra"
                      {...register("price", { required: true })}
                    />
                    <input
                      className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      type="number"
                      placeholder="Precio de Venta"
                      {...register("salePrice", { required: true })}
                    />
                    <input
                      className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      type="number"
                      placeholder="Cantidad"
                      {...register("quantity", { required: true })}
                    />

                    <div >
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center my-2 rounded-md border border-transparent shadow-sm px-4 py-2 border-gray-700 text-base font-medium text-gray-800 hover:bg-gray-700  hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {updating ? "Adicionando..." : "Adicionar"}
                      </button>
                      <button
                        onClick={handleCloseClick}
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-red-500 text-red-500 shadow-sm px-4 py-2  text-base font-medium hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
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
