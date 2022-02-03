import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ModalFormUpdate({
  showModalUpdate,
  handleProductUpdate,
  productForUpdate,
  setShowModalUpdate,
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
    await handleProductUpdate(data);
    reset();
    setUpdating(false);
    handleCloseClick();
  };

  const handleCloseClick = () => {
    setShowModalUpdate(false);
  };

  useEffect(() => {
    reset();
  }, [productForUpdate]);

  const modalContent = showModalUpdate ? (
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
            <div className="sm:flex sm:items-start">
              <div className="mt-3  flex flex-col mx-auto">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Actualizar Producto
                </h3>
                <div className="mt-2 ">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center   "
                  >
                    <div className="w-full">
                      <label className="pl-2">Nombre</label>
                      <input
                        type="text"
                        className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Nombre"
                        {...register("name", { required: true })}
                        defaultValue={productForUpdate.name}
                      />
                    </div>

                    <div className="w-full">
                      <label className="pl-2">Precio de Compra</label>
                      <input
                        className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        type="number"
                        placeholder="Precio de Compra"
                        {...register("cost", { required: true })}
                        defaultValue={productForUpdate.cost}
                      />
                    </div>
                    <div className="w-full">
                      <label className="pl-2">Precio de Venta</label>

                      <input
                        className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        type="number"
                        placeholder="Precio de Venta"
                        {...register("price", { required: true })}
                        defaultValue={productForUpdate.price}
                      />
                    </div>
                    <div className="w-full">
                      <label className="pl-2">Cantidad</label>

                      <input
                        className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        type="number"
                        placeholder="Cantidad"
                        {...register("quantity", { required: true })}
                        defaultValue={productForUpdate.quantity}
                      />
                    </div>
                    <div className="w-full">
                      <label className="pl-2">Entrada</label>

                      <input
                        className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        type="number"
                        placeholder="Cantidad"
                        {...register("entry", { required: true })}
                        defaultValue={productForUpdate.entry}
                      />
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex ">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {updating ? "Adicionando..." : "Adicionar"}
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
