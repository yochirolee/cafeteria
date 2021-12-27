import NavBar from "../components/NavBar/navbar";
import { set, useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient";
import { ProductsContext } from "../context/ProductsContext";
import { useContext, useEffect, useState } from "react";
import ModalForm from "../components/Modal/modalForm";
import InventoryTable from "../components/Table/InventoryTable";

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

        <div className="flex flex-row grow-0 justify-evenly bg-white rounded-lg p-2 m-2">
          <div className=" flex flex-col items-center p-2 rounded-lg bg-white shadow-lg border">
            <p className="font-bold text-xl text-gray-500">$ 34 000</p>
            <p>Venta Diaria</p>
          </div>
          <div className="p-2 rounded-lg bg-white shadow-lg border">
            Venta Semanal
          </div>
          <div className="p-2 rounded-lg bg-white shadow-lg border hidden lg:block">
            Venta Mesual
          </div>
          <div className="p-2 rounded-lg bg-white shadow-lg border">
            Venta Total
          </div>
        </div>
        <InventoryTable
          products={products}
          handleDeleteProduct={handleDeleteProduct}
          setShowModal={setShowModal}
        />
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
