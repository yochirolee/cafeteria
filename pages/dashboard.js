import NavBar from "../components/NavBar/navbar";
import { supabase } from "../utils/supabaseClient";
import { ProductsContext } from "../context/ProductsContext";
import { useContext, useEffect, useState } from "react";
import ModalForm from "../components/Modal/modalForm";
import ProductsTable from "../components/Table/ProductsTable";
import DeleteModal from "../components/Modal/deleteModal";
import AuthLayout from "../layout/AuthLayout";

export default function DashBoard() {
  const [products, setProducts] = useContext(ProductsContext);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const handleDeleteProduct = async () => {
    console.log(deleteId, "deleteID");
    const { data, error } = await supabase
      .from("product")
      .delete()
      .match({ id: deleteId });
    if (!error) {
      const _prods = [...products];
      const index = await _prods.indexOf(
        _prods.find((prod) => prod.id == deleteId)
      );
      _prods.splice(index, 1);
      await setProducts([..._prods]);
      setShowConfirmationModal(!showConfirmationModal);
    }
  };

  const handleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  return (
    <AuthLayout>
      <div className="container mx-auto  ">
        <DeleteModal
          showConfirmationModal={showConfirmationModal}
          handleConfirmationModal={handleConfirmationModal}
          handleDeleteProduct={handleDeleteProduct}
        />

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
        <ProductsTable
          products={products}
          handleConfirmationModal={handleConfirmationModal}
          setShowModal={setShowModal}
          setDeleteId={setDeleteId}
        />
      </div>
    </AuthLayout>
  );
}

/*export async function getStaticProps(context) {
  const { data: _products, _error } = await supabase.from("product").select();

  return {
    props: { _products }, // will be passed to the page component as props
  };
}*/
