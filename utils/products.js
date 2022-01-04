export const getTotalDailySales = (products) => {
  const sales = 0;
  if (products)
    products.map((product) => {
      sales += product.quantitySold * product.salePrice;
    });
  return sales;
};
