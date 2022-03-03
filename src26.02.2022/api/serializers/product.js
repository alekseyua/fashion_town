
const productSerializer = (products) => {
  return products.map((el) => {
    return {
      title: el.title,
      brand: el.brand,
      prices: el.prices,
      stock: el.stock,
      images: el.images,
      colors: el.colors,
      isSales: el.is_closeout,
      isNew: el.is_new,
      sizes: el.sizes,
      isHit: el.is_bestseller,
      favorite: el.is_liked,
      product_rc: el.product_rc,
    };
  });
};

export default productSerializer;
