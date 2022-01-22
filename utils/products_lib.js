import { supabase } from "./supabaseClient";
import { createNewDayOrGetCurrentDay } from "./days_lib";

export const insertProduct = async (prod) => {
  try {
    //create product
    const { day } = await createNewDayOrGetCurrentDay();
    let { data: product, error } = await supabase
      .from("products")
      .insert([
        {
          name: prod.name,
          cost: prod.price,
          price: prod.salePrice,
          quantity: prod.quantity,
          day_id: day.id,
        },
      ])
      .single();

    const { purchase, errorPurchase } = await createPurchase(
      product,
      product.quantity,
      day
    );
    if (errorPurchase) {
      return errorPurchase;
    }
    console.log(product, purchase, error, "LOGGIN FROM INSET ON LIB");
    return { product, purchase, error };
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (product, quantity, currentDay) => {
  const { data, error } = await supabase
    .from("products")
    .update({
      quantity: product.quantity,
      quantity_sold: product.quantity_sold,
    })
    .eq("id", product.id);

  const { sales, errorSale } = await createSale(product, quantity, currentDay);

  if (errorSale) {
    return errorSale;
  }

  return { data, sales, error };
};
export const AddProductInventory = async (product, quantity, day) => {
  const { data, error } = await supabase
    .from("products")
    .update({
      name: product.name,
      cost: product.price,
      price: product.salePrice,
      quantity: product.quantity,
      day_id: day.id,
    })
    .eq("id", product.id);
  const { purchase, error: purchaseError } = await createPurchase(
    product,
    quantity,
    day
  );

  console.log(error, purchaseError, "ERROR UPDATING INVENTORY");

  return { data, purchase };
};
export const createPurchase = async (product, quantity, day) => {
  let { data: purchase, error } = await supabase
    .from("purchases")
    .insert([
      {
        cost: product.cost,
        quantity: quantity,
        product_id: product.id,
        day_id: day.id,
      },
    ])
    .single();
  return { purchase, error };
};
export const createSale = async (product, quantity, day) => {
  console.log(product, quantity);
  let { data: sales, error } = await supabase
    .from("sales")
    .insert([
      {
        sale_price: product.price,
        quantity: quantity,
        product_id: product.id,
        created_at: day.created_at,
        day_id: day.id,
      },
    ])
    .single();
  return { sales, error };
};

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*,sales(*),purchases(*)")
    .order("name");
  return { data, error };
};

export const getProductsPurchaseByDayId = async (id) => {
  const { data: dayPurchases, error } = await supabase
    .from("products")
    .select("*,purchases(*)")
    .eq("purchases.day_id", id);
  return { dayPurchases, error };
};
export const getProductsSalesByDayId = async (id) => {
  const { data: daySales, error } = await supabase
    .from("products")
    .select("*,sales(*)")
    .eq("sales.day_id", id);

  return { daySales, error };
};

export const getTotalDailySales = async (products) => {
  const sales = 0;

  if (products)
    products.map((_product) => {
      sales += _product.quantity_sold * _product.price;
    });
  return sales;
};
