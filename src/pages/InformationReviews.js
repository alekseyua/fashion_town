import React from 'react';
import Layout from '../Views';
import ReviewsPageComponent from '../components/ReviewsPageComponent';
import Modal from '../Views/ModalCreator';


const InformationReviews = (props) => {
  const {
    cabinet_menu,
    create_shop,
    breadcrumbs = [],
    cabinet_site_menu,
    profile,
    title,
    location,
    site_configuration,
  } = props;
  const { user = {}, shop = {}, role, passport, organization, links, balance, id } = profile;
  const { insta_link } = site_configuration;
  const { is_has_shop, shop_link } = shop;
  const { username = '' } = user;
  //todo: можно пропсом кастрировать футер

  return (
    <Layout profile={profile} {...props}>
      <Modal.StorControllerModal />
      <ReviewsPageComponent
        location={location}
        breadcrumbs={breadcrumbs}
        title={title}
        profile={id}
        insta_link={insta_link}
      />
    </Layout>
  );
};

export default React.memo(InformationReviews);
