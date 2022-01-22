import React from 'react';
import Layout from '../Views';
import { Catalog } from '../components/Catalog';

const CatalogPage = (props) => {
  const { multy_choise_filters, categories, breadcrumbs, role_configuration, content, profile } = props;

  return (
    <Layout {...props}>
      <Catalog
        content={content}
        breadcrumbs={breadcrumbs}
        categories={categories}
        multy_choise_filters={multy_choise_filters}
        location={props.location}
        role_configuration={role_configuration}
        profile={profile}
      />
    </Layout>
  );
};

export default React.memo(CatalogPage);
