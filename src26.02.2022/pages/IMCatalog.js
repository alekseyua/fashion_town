import React from 'react';
import Layout from '../Views';
import { Catalog } from '../components/Catalog';

const IMCatalog = (props) => {
  const { multy_choise_filters, categories, breadcrumbs, role_configuration } = props;

  return (
    <Layout {...props}>
      <Catalog
        breadcrumbs={breadcrumbs}
        categories={categories}
        multy_choise_filters={multy_choise_filters}
        location={props.location}
        role_configuration={role_configuration}
      />
    </Layout>
  );
};

export default React.memo(IMCatalog);
