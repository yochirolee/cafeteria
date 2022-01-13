import { supabase } from "./supabaseClient";

/*export const insertProduct = async (data) => {
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
*/
export const insertProduct = async (prod) => {
  try {
    //create product
    let { data: product, error } = await supabase
      .from("products")
      .insert([
        {
          name: prod.name,
          cost: prod.price,
          price: prod.salePrice,
          quantity: prod.quantity,
        },
      ])
      .single();

    const { purchase, errorPurchase } = await createPurchase(
      product,
      product.quantity
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
  const { data, error } = await supabase
    .from("products")
    .update({ quantity: product.quantity })
    .eq("id", product.id);

  const { purchase, errorPurchase } = await createPurchase(product, quantity);
  if (errorPurchase) {
    console.log(errorPurchase);
    return errorPurchase;
  }

  return { data, purchase, error };
};

export const createPurchase = async (product, quantity) => {
  let { data: purchase, error } = await supabase
    .from("purchase")
    .insert([
      {
        cost: product.cost,
        quantity: quantity,
        product_id: product.id,
      },
    ])
    .single();
  return { purchase, error };
};

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
  *,
  purchase("*"),
  sales(*)
  `
    )
    .order("name");
    console.log(data,error,"From backend select")
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
