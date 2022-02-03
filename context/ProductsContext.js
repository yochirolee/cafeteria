import React, { useReducer, useEffect, createContext } from "react";
import {
  getProducts,
  getTotalDailySales,
  insertProduct,
} from "../utils/products_lib";
export const ProductsContext = createContext();

const ACTIONS = {
  LOADING: "loading",
  ERROR: "error",
  ADD_PRODUCT: "add_product",
  UPDATE_PRODUCT: "update_product",
  REMOVE_PRODUCT: "remove_product",
  GET_PRODUCTS: "get_products",
  GET_DAILY_SALES: "get_daily_sales",
};
const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  dailySales: 0,
};

const productsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ACTIONS.GET_PRODUCTS: {
      return {
        ...state,
        products: action.payload.products,
        isLoading: false,
      };
    }

    case ACTIONS.EDIT_PRODUCT: {
      state.products[actions.payload.index] = action.payload.product;
      return { ...state };
    }

    case ACTIONS.REMOVE_PRODUCT: {
      const index = state.products.findIndex(
        (prod) => prod.id == action.payload.index
      );
      state.products.splice(index, 1);
      return { ...state };
    }

    case ACTIONS.ADD_PRODUCT: {
      state.products.push(action.payload.product);
      return { ...state };
    }

    case ACTIONS.GET_DAILY_SALES: {
      const sales = 0;
      state.products.map((_product) => {
        sales += _product.quantity_sold * _product.price;
      });
      return { ...state, dailySales: sales };
    }

    default:
      return { ...state };
  }
};

export const ProductsProvider = (props) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  useEffect(async () => {
    dispatch({ type: ACTIONS.LOADING });
    const getData = async () => {
      const { data, error } = await getProducts();
      if (!error) {
        dispatch({
          type: ACTIONS.GET_PRODUCTS,
          payload: { products: data },
        });
      } else {
        console.log("ERROR DISPATCH");
      }
    };

    await getData();
    dispatch({ type: ACTIONS.GET_DAILY_SALES });
  }, []);

  return (
    <ProductsContext.Provider value={[state, dispatch]}>
      {props.children}
    </ProductsContext.Provider>
  );
};
