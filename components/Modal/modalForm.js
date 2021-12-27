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
    <div className="absolute left-0  mt-2 w-full h-screen bg-white top-10 ">
      <div>
        <div className="flex flex-row justify-between m-4 text-white items-center">
          <p>Nuevo Producto</p>
          <i
            href="#"
            className="las la-times-circle text-red-600 text-xl text-center  p-2"
            onClick={handleCloseClick}
          ></i>
        </div>
        {title && <div>{title}</div>}
        <div>
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
      </div>
    </div>
  ) : null;

  return modalContent;
}
