import React, { useState } from 'react';
import Layout from '../Views';
import HomeComponent from '../components/HomeComponent';
import Modal from '../Views/ModalCreator';
import api from '../api';

const IMHome = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const {
    banners,
    partner_banners,
    first_screen,
    products,
    news,
    about_banner,
    live_photos,
    reviews,
    in_stock_product_filters,
    site_configuration,
  } = props;
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
      {/* //todo: ДЛЯ ИГОРЬКА ТЕСТИТЬ МАГАЗЫ */}
      {/* <button onClick={(e) => {
            api.getShop().then(res => // console.log(`res`, res))
          }}>МАГАЗЫМАГАЗЫМАГАЗЫМАГАЗЫМАГАЗЫМАГАЗЫМАГАЗЫ</button> */}
      <Modal.ModalCreator {...modalStates} setModalStates={setModalStates} />
      <Modal.StorControllerModal />
      <HomeComponent.TradingPlatform
        first_screen={first_screen}
        page_type_catalog={page_type_catalog}
      />
      <HomeComponent.MainCategories banners={banners} />
      <HomeComponent.ProductsInStock
        in_stock_product_filters={in_stock_product_filters}
        setModalStates={setModalStates}
        products={products}
        catalog_url={page_type_catalog}
      />
      <HomeComponent.Cooperation partner_banners={partner_banners} />
      <HomeComponent.MainNews news={news} news_url={page_type_news} />
      <HomeComponent.MainAbout about_banner={about_banner} />
      <HomeComponent.LivePhotos live_photos={live_photos} live_photos_url={page_type_live_photos} />
      <HomeComponent.MainReviews
        reviews={reviews}
        reviews_url={page_type_reviews}
        setModalStates={setModalStates}
      />
    </Layout>
  );
};

export default React.memo(IMHome);
