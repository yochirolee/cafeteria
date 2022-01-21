import { supabase } from "./supabaseClient";
import moment from "moment";
import {
  getProductsSalesByDayId,
  getProductsPurchaseByDayId,
} from "./products_lib";

export const createNewDayOrGetCurrentDay = async () => {
  const isCurrent = await IsCurrentDay();
  if (!isCurrent) {
    await updateLastDay();
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

export const updateLastDay = async () => {
  const lastDay = await getLastDay();
  const { daySales } = await getProductsSalesByDayId(lastDay.id);
  const { dayPurchases } = await getProductsPurchaseByDayId(lastDay.id);
  const totalDailySales = await calculateDailySales(daySales);
  const totalDailyPurchases = await calculateDailyPurchases(dayPurchases);
  let { data: day } = await supabase
    .from("days")
    .update({ purchases: totalDailyPurchases, sales: totalDailySales })
    .eq("id", lastDay.id);
  return day;
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
  const { data: day, error } = await supabase
    .from("days")
    .select("*")
    .order("id", { ascending: false })
    .limit(1);
  return day[0];
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
export const calculateDailyPurchases = async (products) => {
  const _dailyPurchases = 0;

  if (products) {
    await products.map((product) => {
      product.purchases.map((purchase) => {
        _dailyPurchases += purchase.cost * purchase.quantity;
      });
    });
    return _dailyPurchases;
  }
};
