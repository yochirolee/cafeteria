import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { supabase } from "../../utils/supabaseClient";
import AuthLayout from "../../layout/AuthLayout";
import DeleteModal from "../Modal/deleteModal";
import ModalForm from "../Modal/modalForm";
import ProductsTable from "../Table/ProductsTable";
import {getTotalDailySales} from '../../utils/products'

export default function MainDashBoard() {
  const [products, setProducts] = useContext(ProductsContext);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
    <div className="col-span-full container mx-auto xl:col-span-8 bg-white  rounded-sm  border-gray-200 m-2">
      <div className="col-span-full xl:col-span-6 bg-white  rounded-sm ">
        <div className=" w-full mx-auto  ">
          <DeleteModal
            showConfirmationModal={showConfirmationModal}
            handleConfirmationModal={handleConfirmationModal}
            handleDeleteProduct={handleDeleteProduct}
          />

          <ModalForm
            onClose={() => setShowModal(false)}
            show={showModal}
          ></ModalForm>

          <div className="rounded-lg ring-1 m-3 ring-gray-900 ring-opacity-5 overflow-hidden bg-gray-50">
            <div className="flex-row flex  w-full justify-evenly ">
              <div className="rounded-lg ring-1 w-1/3 m-2  p-4 text-center ring-gray-900 ring-opacity-5 overflow-hidden bg-white">
                <span className="text-gray-400 text-xs lg:text-base inline-flex   ">Venta de Hoy</span>
                  <p className="text-xl lg:text-5xl font-bold text-gray-600  p-2">
                  <i className="las la-dollar-sign text-green-500 "></i>{getTotalDailySales(products)}
                </p>
              </div>
              <div className="rounded-lg ring-1 w-1/3 m-3 ring-gray-900 ring-opacity-5 overflow-hidden bg-white">
                as
              </div>
              <div className="rounded-lg ring-1  w-1/3 m-3 ring-gray-900 ring-opacity-5 overflow-hidden bg-white">
                as
              </div>
            </div>
          </div>

          <ProductsTable
            products={products}
            handleConfirmationModal={handleConfirmationModal}
            setShowModal={setShowModal}
            setDeleteId={setDeleteId}
          />
        </div>
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
