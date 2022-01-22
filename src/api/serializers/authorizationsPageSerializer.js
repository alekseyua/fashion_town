import siteConfigurationSerializer from './site_configuration';
const authorizationsPageSerializer = (page) => {
  const { init_state, page_info } = page;
  return {
    ...init_state,
    ...page_info,
    site_configuration: init_state.site_configuration
      ? siteConfigurationSerializer(init_state.site_configuration)
      : null,
  };
};

export default authorizationsPageSerializer;
