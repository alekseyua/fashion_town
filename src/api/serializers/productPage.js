import productSerializer from './product';
import siteConfigurationSerializer from "./site_configuration";

const productPageSerializer = page => {
  const { init_state } = page
  const { page_info } = init_state;
  return {
    product: {...productSerializer(page_info)},
    ...init_state,
    site_configuration: siteConfigurationSerializer(init_state.site_configuration),
  }
}

export default productPageSerializer;
