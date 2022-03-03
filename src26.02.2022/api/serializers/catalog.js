import productSerializer from './product';
import siteConfigurationSerializer from "./site_configuration";

const catalogPageSerializer = page => {
  const { init_state } = page
  const { page_info, products, top_cats } = init_state;
  const { product_set } = page_info;
  const products_list = products ? products.map(productSerializer) : product_set.map(productSerializer) // костыль т.к. бек не правильно отдает контент.
  const categories = top_cats ? top_cats : [];
  return {
    ...init_state,
    ...page_info,
    products: products_list,
    categories,
    site_configuration: siteConfigurationSerializer(init_state.site_configuration),
  }
}

export default catalogPageSerializer;
