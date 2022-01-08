import { supabase } from "./supabaseClient";

export const insertProduct = async (data) => {
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
  return { product, error };
};

export const getProducts = async () => {
  const { data, error } = await supabase.from("product").select().order("id");
  console.log("query");
  return { data, error };
};

export const getTotalDailySales = (products) => {
  const sales = 0;
  if (products)
    products.map((product) => {
      sales += product.quantitySold * product.salePrice;
    });
  return sales;
};
