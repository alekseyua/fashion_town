import React from 'react';
import Layout from '../Views';
import ProductDetailsComponents from '../components/ProductDetails';
import Modal from '../Views/ModalCreator';


const ProductDetails = (props) => {
  const {
    recommended,
    adding_type,
    location,
    profile,
    recommended_price,
    breadcrumbs,
    colors,
    sizes,
    id: productId,
    product,
    content,
    in_stock_count,
    in_category,
    reviews_statistic,
    role_configuration,
    site_configuration,
  } = props;
  const { user = {}, shop, role, passport, organization, links, id, balance } = profile;

 
  return (
    <Layout {...props}>
      <Modal.StorControllerModal />
      <ProductDetailsComponents.ProductPreview
        {...product}
        productId={productId}
        adding_type={adding_type}
        content={content}
        colors={colors}
        sizes={sizes}
        recommended_price={recommended_price}
        location={location}
        in_stock_count={in_stock_count}
        breadcrumbs={breadcrumbs}
        in_category={in_category}
        reviews_statistic={reviews_statistic}
        role_configuration={role_configuration}
        profileId={id}
        recommended={recommended}
        site_configuration={site_configuration}
      />
    </Layout>
  );
};

export default React.memo(ProductDetails);
