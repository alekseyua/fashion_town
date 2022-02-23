import React, { useState, useEffect } from 'react';
import Layout from '../Views';
import Text from '../components/Text';
import InformationViews from '../Views/InformationViews';
import Title from '../Views/Title';
import Breadcrumbs from '../Views/Breadcrumbs';
import Container from '../Views/Container';
import Modal from '../Views/ModalCreator';


const InformationExchange = (props) => {
  const {
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile,
    breadcrumbs = [],
    page_info,
  } = props;

  const { user = {}, shop = {}, role, passport, organization, links, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username = '' } = user;
  //todo: можно пропсом кастрировать футер

  return (
    <Layout {...props}>
      <Modal.StorControllerModal />
      <Container>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <InformationViews.PaymentsConteiner>
          <Title variant={'information-payments__title'} type={'h1'}>
            {/* обмен и возврат */}
            {/* {state.title} */}
            {page_info.title}
          </Title>
          <InformationViews.HowToWrapper>
            <InformationViews.BlockHowTo>
              <InformationViews.ContainerMin>
                {/* <InformationViews.PaymentsDescription>
              <div dangerouslySetInnerHTML={{ __html: page_info.content }}></div>
              </InformationViews.PaymentsDescription> */}
                <InformationViews.PaymentsDescription content={page_info.content} />
              </InformationViews.ContainerMin>
            </InformationViews.BlockHowTo>
          </InformationViews.HowToWrapper>
        </InformationViews.PaymentsConteiner>
      </Container>
    </Layout>
  );
};

export default React.memo(InformationExchange);
