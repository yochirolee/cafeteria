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

    return { product, purchase, error };
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (product, quantity) => {
  const { day } = await createNewDayOrGetCurrentDay();
  const { data, error } = await supabase
    .from("products")
    .update({
      quantity: product.quantity,
      quantity_sold: product.quantity_sold,
    })
    .eq("id", product.id);

  const { sales, errorSale } = await createSale(product, quantity, day);
  console.log(sales, "creating sales");
  if (errorSale) {
    return errorSale;
  }

  return { data, sales, error };
};

export const createPurchase = async (product, quantity, day) => {
  let { data: purchase, error } = await supabase
    .from("purchase")
    .insert([
      {
        cost: product.cost,
        quantity: quantity,
        product_id: product.id,
        created_at: day.created_at,
      },
    ])
    .single();
  return { purchase, error };
};
export const createSale = async (product, quantity, day) => {
  console.log(product, quantity);
  let { data: sale, error } = await supabase
    .from("sales")
    .insert([
      {
        sale_price: product.price,
        quantity: quantity,
        product_id: product.id,
        created_at: day.created_at,
      },
    ])
    .single();
  console.log(sale);
  return { sale, error };
};

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
  *,sales(*),
  purchase("*")
  
  `
    )
    .order("name");

  return { data, error };
};

export const getTotalDailySales = (products) => {
  const sales = 0;
  if (products)
    products.map((product) => {
      sales += product.quantity_sold * product.price;
    });
  return sales;
};

export const getDayProductsSalesByDay = async (date) => {
  const currentDay = null;
  const created_at = null;
  if (!date) {
    currentDay = await createNewDayOrGetCurrentDay();
    created_at = currentDay.day.created_at;
  } else {
    created_at = date;
  }
  const { data: daySales, error } = await supabase
    .from("products")
    .select("*,sales(*)")
    .eq("sales.created_at", created_at);
  console.log(daySales, "current Day day Sales");
  return { daySales, error };
};
