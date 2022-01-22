import siteConfigurationSerializer from "./site_configuration";
import orderSerializers from "./orders";

const accountSerializer = page => {
  const { init_state } = page
  const { page_info, orders } = init_state;
  const pageInfo = page_info[0];
  return {
    ...init_state,
    ...pageInfo,
    orders: orders.map(orderSerializers),
    site_configuration: siteConfigurationSerializer(init_state.site_configuration),
  }
}

export default accountSerializer;