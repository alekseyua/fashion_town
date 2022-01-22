import React, { useState } from 'react';
import Layout from '../Views';
import NewsComponent from '../components/NewsComponent';

const NewsPage = (props) => {
  const { site_configuration, rubrics } = props;

  const {
    page_type_catalog,
    page_type_news,
    page_type_reviews,
    page_type_live_photos,
    page_type_404,
    page_type_500,
  } = site_configuration;

  return (
    <Layout {...props}>
      <NewsComponent rubrics={rubrics} />
    </Layout>
  );
};

export default React.memo(NewsPage);
