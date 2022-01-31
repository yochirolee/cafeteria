import { useEffect, useState } from "react";
import { getTotalDailySales } from "../../utils/products_lib";
import { supabase } from "../../utils/supabaseClient";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);

  // Initial states
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [dailySales, setDailySales] = useState(0);

  useEffect(async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("name");
    setProducts(data);
  }, []);
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
    setEdit(true);
    const { name, value } = e.target;
    const list = [...products];
    list[index][name] = value;
    setProducts(list);
    setDailySales(await getTotalDailySales(products));
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
            <thead className="text-xs  uppercase text-gray-400 bg-gray-50  rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-light text-left">Producto</div>
                </th>

                <th className="p-2">
                  <div className="font-light text-left">Inicio</div>
                </th>

                <th className="p-2">
                  <div className="font-light text-left">Vendido</div>
                </th>
                <th className="p-2">
                  <div className="font-light text-left">Precio</div>
                </th>
                <th className="p-2">
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
                      <div className="text-center ">
                        <input
                          value={product.quantity_sold}
                          name="quantity_sold"
                          onChange={(e) => handleInputChange(e, i)}
                          className="w-10 text-center bg-transparent outline-1 outline-slate-50"
                        />
                      </div>
                    </td>
                    <td className=" ">
                      <div className="text-center text-green-600 rounded-lg m-1 p-1 border-green-100 border bg-green-50">
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
