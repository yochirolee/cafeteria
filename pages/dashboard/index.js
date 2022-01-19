import { useContext, useState } from "react";
import ProductCardDashBoard from "../../components/productsDashboard/productCardDashBoard";
import { ProductsContext } from "../../context/ProductsContext";
import DashBoardLayout from "../../layout/DashBoardLayout";
import ModalFormAdd from "../../components/Modal/modalFormAdd";
import { CurrentDayContext } from "../../context/CurrentDayContext";
import { AddProductInventory, insertProduct } from "../../utils/products_lib";
import ModalFormInsert from "../../components/Modal/modalFormInsert";

export default function Dashboard({ user }) {
  const [products, setProducts] = useContext(ProductsContext);
  const [showModalInsert, setShowModalInsert] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [currentDay, setCurrentDay] = useContext(CurrentDayContext);
  const [productForUpdate, setProdcutForUpdate] = useState({});

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

  const handleUpdateProduct = async (data) => {
    console.log(data, "data");
    const quantityAdded = parseInt(data.quantity);
    productForUpdate.quantity += quantityAdded;
    const { data: productUpdated, purchase } = await AddProductInventory(
      productForUpdate,
      quantityAdded,
      currentDay
    );
    console.log(productUpdated, purchase, "ADDED PRODUCT TO INVENTORY");
  };

  const handleDeleteProduct = () => {};

  const handleGetProductQuantityAdd = (product) => {
    setProdcutForUpdate(product);
    setShowModalAdd(true);
  };

  return (
    <div>
      <DashBoardLayout user={user}>
        <div>
          <header className="flex flex-row bg-transparent shadow-sm items-center rounded-lg m-2 justify-around py-2 border-gray-500 border-dashed">
            <div class="my-3  relative rounded-md ">
              <input
                type="text"
                name="search"
                className=" h-12  block w-full pl-7 pr-12 border  rounded-md"
                placeholder="Buscar"
              />
              <div class="absolute   rounded-r-md  inset-y-0 right-0 flex  items-center">
                <i className="las la-search items-center text-2xl p-4 mt-1 text-gray-400 "></i>
              </div>
            </div>

            <div
              onClick={() => setShowModalInsert(true)}
              className="flex flex-row items-center h-12 p-2 cursor-pointer bg-gray-600 rounded-lg   hover:text-white  ring-gray-700 hover:ring-2 "
            >
              <p className="text-white mx-2">Crear Producto</p>
            </div>
          </header>

          {products.map((product) => (
            <ProductCardDashBoard
              product={product}
              handleGetProductQuantityAdd={handleGetProductQuantityAdd}
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
          handleProductUpdate={handleUpdateProduct}
          productForUpdate={productForUpdate}
        ></ModalFormAdd>
      </DashBoardLayout>
    </div>
  );
}
