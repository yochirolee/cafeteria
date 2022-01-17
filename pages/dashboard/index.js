import DashBoardLayout from "../../layout/DashBoardLayout";
import authWrapper from "../../lib/authWrapper";
import { useContext, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { supabase } from "../../utils/supabaseClient";
import DeleteModal from "../../components/Modal/deleteModal";
import ModalForm from "../../components/Modal/modalForm";
import ProductsTable from "../../components/Table/ProductsTable";
import { insertProduct, updateProduct } from "../../utils/products";
import { getTotalDailySales } from "../../utils/products";
import ModalFormAdd from "../../components/Modal/modalFormAdd";
import OpenToggle from "../../components/Toggle/openToggle";
import TodayDate from "../../components/Date/TodayDate";
import Stats from "../../components/Stats/stats";

export default function Dashboard({ user }) {
  const [products, setProducts] = useContext(ProductsContext);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [productUpdate, setProductUpdate] = useState(null);

  const handleInsertProduct = async (data) => {
    const { product, error } = await insertProduct(data);
    if (!error) {
      const aux = [...products];
      aux.push(product);
      setProducts(aux);
    } else {
      setError(error);
    }
  };

  const handleUpdate = async (product) => {
    setShowModalUpdate(true);
    setProductUpdate(product);
  };

  const handleUpdateProductInventory = async ({ quantity }) => {
    const aux_pro = { ...productUpdate };
    aux_pro.quantity += parseInt(quantity);
    const auxProducts = [...products];
    const { error } = await updateProduct(aux_pro, quantity);
    if (!error) {
      const index = auxProducts.findIndex((elem) => elem.id === aux_pro.id);
      auxProducts[index] = aux_pro;
      setProducts(auxProducts);
    }
  };

  const handleDeleteProduct = async () => {
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchase")
      .delete()
      .match({ product_id: deleteId });
    console.log(purchaseError, purchase);
    const { data: sales, error: salesError } = await supabase
      .from("sales")
      .delete()
      .match({ product_id: deleteId });
    console.log(salesError, sales);

    const { data, error } = await supabase
      .from("products")
      .delete()
      .match({ id: deleteId });
    if (!error) {
      const _prods = [...products];
      const index = await _prods.findIndex((prod) => prod.id == deleteId);
      _prods.splice(index, 1);
      await setProducts([..._prods]);
      setShowConfirmationModal(!showConfirmationModal);
    }
    console.log(error);
  };

  const handleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  return (
    <DashBoardLayout user={user}>
      <div className="col-span-full container mx-auto xl:col-span-8  rounded-sm  border-gray-200 m-2">
        <div className="col-span-full xl:col-span-6   rounded-sm ">
          <div className=" w-full mx-auto  ">
            <DeleteModal
              showConfirmationModal={showConfirmationModal}
              handleConfirmationModal={handleConfirmationModal}
              handleDeleteProduct={handleDeleteProduct}
            />

            <ModalForm
              show={showModal}
              handleInsertProduct={handleInsertProduct}
              onClose={() => setShowModal(false)}
            ></ModalForm>

            <ModalFormAdd
              show={showModalUpdate}
              productUpdate={productUpdate}
              onClose={() => setShowModalUpdate(false)}
              handleUpdateProductInventory={handleUpdateProductInventory}
            ></ModalFormAdd>

            <div className="  m-3 ring-gray-900  overflow-hidden bg-gray-50">
              <div className="flex  flex-row border-b justify-around bg-white items-center py-2">
                <TodayDate />
            
              </div>
            </div>
            <Stats />
            <ProductsTable
              products={products}
              handleConfirmationModal={handleConfirmationModal}
              setShowModal={setShowModal}
              setDeleteId={setDeleteId}
              handleUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    </DashBoardLayout>
  );
}

export const getServerSideProps = authWrapper();
