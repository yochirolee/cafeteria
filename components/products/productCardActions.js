import { useState } from "react";

export default function ProductCardActions({ prod, handleProductUpdate }) {
  const [count, setCount] = useState(0);
  const [updating, setUpdating] = useState(false);

  const handlePlus = () => {
    if (prod.quantity - count > 0) setCount((count) => count + 1);
  };
  const handleMinus = () => {
    if (count > 0) setCount((count) => count - 1);
  };

  const handleUpdate = async (id) => {
    setUpdating(true);
    await handleProductUpdate(id, count);
    setUpdating(false);
    setCount(0);
  };

  return (
    <div className="flex flex-col items-center m-2 w-full lg:w-3/4 ">
      <div className="flex flex-row justify-around w-3/4 ">
        <button
          className="rounded-full  h-6 w-6 bg-green-600 text-white font-bold hover:bg-green-700 "
          onClick={() => handleMinus()}
        >
          -
        </button>
        <span>{count}</span>
        <button
          className="rounded-full  h-6 w-6 bg-green-600 text-white font-bold hover:bg-green-700 "
          onClick={() => handlePlus()}
        >
          +
        </button>
      </div>

      <button
        className={`mt-4 text-sm lg:text-md rounded-lg w-3/4 ${
          prod.quantity == 0 ? "bg-red-600" : "bg-gray-700"
        }`}
      >
        <p className="p-2 text-white" onClick={() => handleUpdate(prod.id)}>
          {prod.quantity == 0 ? "Agotado" : updating ? "Vendiendo" : "Vender"}
        </p>
      </button>
    </div>
  );
}
