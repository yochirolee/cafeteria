import { supabase } from "./supabaseClient";
import moment from "moment";

export const createNewDayOrGetCurrentDay = async () => {
  const isCurrent = await IsCurrentDay();
  if (!isCurrent) {
    let { data: day, error } = await supabase
      .from("days")
      .insert([
        {
          sales: 0,
          purchases: 0,
          quantity: 0,
        },
      ])
      .single();

    let { data: products } = await supabase
      .from("products")
      .update({ quantity_sold: 0 });

    return { day, products, error };
  } else {
    const day = await getLastDay();
    return { day };
  }
};

export const IsCurrentDay = async () => {
  const lastDay = await getLastDay();

  if (!lastDay) {
    return false;
  }
  if (
    moment(Date.now()).format("DD-MM-YYYY") ==
    moment(lastDay.created_at).format("DD-MM-YYYY")
  ) {
    return true;
  } else {
    return false;
  }
};

export const getLastDay = async () => {
  const { data: days, error } = await supabase.from("days").select("*");
  if (days.length !== 0) {
    const count = days.length;
    const day = days[count - 1];
    return day;
  }
  return null;
};

export const updateIsOpen = async (day, isOpen) => {
  const { data, error } = await supabase
    .from("days")
    .update({ isOpen: isOpen })
    .eq("id", day.id);

  return { data, error };
};

export const calculateDailySales = async (products) => {
  const _dailySales = 0;

  if (products) {
    await products.map((product) => {
      product.sales.map((sale) => {
        _dailySales += sale.sale_price * sale.quantity;
      });
    });
    return _dailySales;
  }
};
