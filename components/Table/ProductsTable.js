import { useState } from "react";

import { supabase } from "../../utils/supabaseClient";
import IsError from "../Spinners/isError";
import IsLoading from "../Spinners/isLoading";

export default function ProductsTable({
  products,
  isLoading,
  isError,
  dailySales,
  dispatch,
}) {
  // Initial states
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  // Function For closing the alert snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Function For adding new row object
  const handleAdd = () => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        name: "",
        quantity: "",
        price: "",
      },
    ]);
    setEdit(true);
  };

  // Function to handle edit
  const handleEdit = (i) => {
    // If edit mode is true setEdit will
    // set it to false and vice versa
    setEdit(!isEdit);
  };

  // Function to handle save
  const handleSave = async () => {
    setProducts(products);
    console.log("saved : ", products);
    const { data, error } = await supabase.from("products").upsert(products);
    console.log(data, error);
    setEdit(false);
  };

  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes
  // to input elements and record their values in state
  const handleInputChange = async (e, index) => {
    console.log("handle changin");
    const { name, value } = e.target;
    products[index][name] = value;

    dispatch({
      type: "update_product",
      payload: { index: index, product: products[index] },
    });
    dispatch({ type: "get_daily_sales" });

    // dispatch({ type: ACTIONS.IS_UPDATING, payload: { e, index } });
    // setDailySales(await getTotalDailySales(products));
  };

  // Showing delete confirmation to users
  const handleConfirm = () => {
    setShowConfirm(true);
  };

  // Handle the case of delete confirmation where
  // user click yes delete a specific row of id:i
  const handleRemoveClick = (i) => {
    const list = [...rows];
    list.splice(i, 1);
    setProducts(list);
    setShowConfirm(false);
  };

  // Handle the case of delete confirmation
  // where user click no
  const handleNo = () => {
    setShowConfirm(false);
  };

  if (isLoading) return <IsLoading />;

  if (isError) return <IsError />;

  return (
    <div className="rounded-lg ring-1 m-3 ring-gray-900 ring-opacity-5 overflow-hidden bg-white">
      <div className="p-3 my-2">
        <div className="flex flex-row justify-between pb-3 items-center  ">
          <div>
            {isEdit ? (
              <button
                className="mx-2 p-2 border rounded-lg  bg-green-400 text-white"
                onClick={handleSave}
              >
                <i className="las la-save" />
                Guardar
              </button>
            ) : (
              <button className="mx-2 p-2 border rounded-lg   text-gray-300">
                <i className="las la-save" />
                Guardar
              </button>
            )}
          </div>

          <div className="flex p-3">
            <p className="mr-2">Total:</p>
            <p>${dailySales}</p>
          </div>
        </div>

        <div className="overflow-x-auto ">
          <table className="table-auto w-full">
            <thead className="text-xs   text-gray-400 bg-gray-50  rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-light text-center">Producto</div>
                </th>

                <th className="p-1">
                  <div className="font-light text-center">Inicio</div>
                </th>
                <th className="p-1">
                  <div className="font-light text-center">Entrada</div>
                </th>
                <th className="p-1">
                  <div className="font-light text-center">A Venta</div>
                </th>

                <th className="p-1">
                  <div className="font-light text-left">Vendido</div>
                </th>
                <th className="p-1">
                  <div className="font-light text-left">Final</div>
                </th>
                <th className="p-1">
                  <div className="font-light text-left">Precio</div>
                </th>
                <th className="p-1">
                  <div className="font-light text-left">Importe</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-xs lg:text-sm font-medium  divide-y divide-gray-100 items-center">
              {products ? (
                products.map((product, i) => (
                  <tr
                    className={`${
                      product.quantity <= 0 ? `bg-red-50` : ""
                    } items-center `}
                    key={product.id}
                  >
                    <td className="text-left">{product.name}</td>

                    <td className=" ">
                      <div className="text-center">{product.quantity}</div>
                    </td>
                    <td className=" ">
                      <div className="text-center">0</div>
                    </td>
                    <td className=" ">
                      <div className="text-center">0</div>
                    </td>
                    <td className=" ">
                      <div className="text-center ">
                        <input
                          value={product.quantity_sold}
                          name="quantity_sold"
                          onChange={(e) => handleInputChange(e, i)}
                          onBlur={() => {}}
                          className="w-10 text-center bg-transparent outline-1 outline-slate-50"
                        />
                      </div>
                    </td>
                    <td className=" ">
                      <div className="text-center">0</div>
                    </td>
                    <td className=" ">
                      <div className="text-center text-green-600  m-1 p-1 ">
                        {product.price}
                      </div>
                    </td>
                    <td className=" ">
                      <div className="text-center">
                        {product.quantity_sold * product.price}
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
