import { useContext, useState } from "react";
import ProductCardDashBoard from "../../components/productsDashboard/productCardDashBoard";
import { ProductsContext } from "../../context/ProductsContext";
import DashBoardLayout from "../../layout/DashBoardLayout";
import ModalFormAdd from "../../components/Modal/modalFormAdd";
import { CurrentDayContext } from "../../context/CurrentDayContext";
import { AddProductInventory } from "../../utils/products_lib";

export default function Dashboard({ user }) {
  const [products, setProducts] = useContext(ProductsContext);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [currentDay, setCurrentDay] = useContext(CurrentDayContext);
  const [productForUpdate, setProdcutForUpdate] = useState({});

  const handleInsertProduct = () => {};

  const handleUpdateProduct = async (data) => {
    console.log(data, "data");
    const quantityAdded = parseInt(data.quantity);
    productForUpdate.quantity += quantityAdded;
    const { data:productUpdated, purchase } = await AddProductInventory(
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
        <div className="mx-auto px-10">
          <div class="my-3 relative rounded-md shadow-sm">
            <input
              type="text"
              name="price"
              id="price"
              class=" h-12  block w-full pl-7 pr-12 sm:text-sm  rounded-md"
              placeholder="Buscar"
            />
            <div class="absolute   rounded-r-md bg-gray-700 inset-y-0 right-0 flex  items-center">
              <i className="las la-search items-center text-2xl p-4 mt-2 text-gray-200 "></i>
            </div>
          </div>
        </div>
        <div>
          {products.map((product) => (
            <ProductCardDashBoard
              product={product}
              handleGetProductQuantityAdd={handleGetProductQuantityAdd}
            />
          ))}
        </div>
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
