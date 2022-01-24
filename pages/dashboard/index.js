import { useContext, useEffect, useState } from "react";
import ProductCardDashBoard from "../../components/productsDashboard/productCardDashBoard";
import { ProductsContext } from "../../context/ProductsContext";
import DashBoardLayout from "../../layout/DashBoardLayout";
import ModalFormAdd from "../../components/Modal/modalFormAdd";
import { CurrentDayContext } from "../../context/CurrentDayContext";
import { AddProductInventory, insertProduct } from "../../utils/products_lib";
import ModalFormInsert from "../../components/Modal/modalFormInsert";
import DeleteModal from "../../components/Modal/deleteModal";
import { supabase } from "../../utils/supabaseClient";
import ModalFormUpdate from "../../components/Modal/modalFormUpdate";

export default function Dashboard({ user }) {
  const [products, setProducts] = useContext(ProductsContext);
  const [showModalInsert, setShowModalInsert] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [currentDay] = useContext(CurrentDayContext);
  const [productForUpdate, setProductForUpdate] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(async () => {
    const results = await products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  const handleUpdateAddProduct = async (data) => {
    const quantityAdded = parseInt(data.quantity);
    productForUpdate.quantity += quantityAdded;
    const { data: productUpdated, purchase } = await AddProductInventory(
      productForUpdate,
      quantityAdded,
      currentDay
    );
  };

  const handleProductUpdate = async (product) => {
    productForUpdate.name = product.name;
    productForUpdate.price = parseInt(product.price);
    productForUpdate.cost = parseInt(product.cost);
    const { data, error } = await supabase
      .from("products")
      .update({
        name: productForUpdate.name,
        cost: productForUpdate.cost,
        price: productForUpdate.price,
      })
      .eq("id", productForUpdate.id);
  };

  const handleDeleteProduct = async () => {
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .delete()
      .match({ product_id: deleteId });
    const { data: sales, error: salesError } = await supabase
      .from("sales")
      .delete()
      .match({ product_id: deleteId });

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
    setSearchTerm("");
  };

  const handleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const handleGetProductQuantityAdd = (product) => {
    setProductForUpdate(product);
    setShowModalAdd(true);
  };

  const handleGetProductForUpdate = (product) => {
    setProductForUpdate(product);
    setShowModalUpdate(true);
  };

  return (
    <div className="antialiased text-slate-500 dark:text-slate-400  dark:bg-slate-900">
      <DashBoardLayout user={user}>
        <div>
          <header className="inline-flex  w-full mx-auto bg-transparent shadow-sm items-center rounded-lg justify-around  border-gray-500 border-dashed">
            <div className="my-3   relative rounded-md ">
              <input
                type="text"
                name="search"
                className=" h-12  block  pl-7 pr-12 border  rounded-md"
                placeholder="Buscar"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
              <div className="absolute   rounded-r-md  inset-y-0 right-0 flex  items-center">
                <i className="las la-search items-center text-2xl p-4 mt-1 text-gray-400 "></i>
              </div>
            </div>

            <div
              onClick={() => setShowModalInsert(true)}
              className="flex flex-row items-center h-12 p-2 cursor-pointer bg-gray-600 rounded-lg   hover:text-white  ring-gray-700 hover:ring-2 "
            >
              <p className="text-white mx-2">Crear</p>
            </div>
          </header>
          {searchTerm
            ? searchResults.map((result) => (
                <ProductCardDashBoard
                  product={result}
                  handleGetProductQuantityAdd={handleGetProductQuantityAdd}
                  handleGetProductForUpdate={handleGetProductForUpdate}
                  handleConfirmationModal={handleConfirmationModal}
                  setDeleteId={setDeleteId}
                  key={result.id}
                />
              ))
            : products.map((product) => (
                <ProductCardDashBoard
                  product={product}
                  handleGetProductQuantityAdd={handleGetProductQuantityAdd}
                  handleGetProductForUpdate={handleGetProductForUpdate}
                  handleConfirmationModal={handleConfirmationModal}
                  setDeleteId={setDeleteId}
                  key={product.id}
                />
              ))}
        </div>
        <ModalFormInsert
          show={showModalInsert}
          handleInsertProduct={handleInsertProduct}
          onClose={() => setShowModalInsert(false)}
        ></ModalFormInsert>

        <ModalFormAdd
          showModalAdd={showModalAdd}
          setShowModalAdd={setShowModalAdd}
          handleProductAddUpdate={handleUpdateAddProduct}
          productForUpdate={productForUpdate}
        ></ModalFormAdd>
        <DeleteModal
          showConfirmationModal={showConfirmationModal}
          handleConfirmationModal={handleConfirmationModal}
          handleDeleteProduct={handleDeleteProduct}
        />
        <ModalFormUpdate
          showModalUpdate={showModalUpdate}
          setShowModalUpdate={setShowModalUpdate}
          handleProductUpdate={handleProductUpdate}
          productForUpdate={productForUpdate}
        />
      </DashBoardLayout>
    </div>
  );
}
