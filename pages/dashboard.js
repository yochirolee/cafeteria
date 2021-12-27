import NavBar from "../components/NavBar/navbar";
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient";

export default function DashBoard({ products, error }) {
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
    console.log(errors);
  };
  return (
    <>
    
      <div className="flex flex-row ">
        <div className="w-44  bg-gray-700 text-white h-screen top-1 pt-6 -mt-4 ">
          <ul className="flex flex-col items-center cursor-pointer">
            <li>
              <a>Inicio</a>
            </li>
            <li>
              <a>Productos</a>
            </li>
            <li>
              <a>Inventario</a>
            </li>
            <li>
              <a>Reportes</a>
            </li>
          </ul>
        </div>
        <div className=" flex-1 flex flex-row bg-white m-4  rounded-xl  ">
          <div className=" w-1/4 border-r mt-10  h-screen-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center"
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
                className="border bg-gray-600 text-white p-2 m-2 w-1/2"
              />
            </form>
          </div>
          <div className="bg-gray-300 w-full">
            {products.map((product) => (
              <div className="border bg-white h-10 m-2 flex flex-col justify-evenly ">
                <div className="flex flex-row justify-evenly">
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const { data: products, error } = await supabase.from("product").select();

  return {
    props: { products, error }, // will be passed to the page component as props
  };
}
