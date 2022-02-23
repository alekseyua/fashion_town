import React, { useState } from 'react';
import Layout from '../Views';
import Text from '../components/Text';
import InformationViews from '../Views/InformationViews';
import Title from '../Views/Title';
import Breadcrumbs from '../Views/Breadcrumbs';
import Container from '../Views/Container';
import Modal from '../Views/ModalCreator';


const InformationContacts = (props) => {
  const {
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile,
    components = [],
    breadcrumbs,
  } = props;
  const { user = {}, shop = {}, role, passport, organization, links, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username = '' } = user;

  //todo: можно пропсом кастрировать футер
  return (
    <Layout profile={profile} {...props}>
      <Modal.StorControllerModal />
      <Container>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {components.map((el, i) => {
          return (
            <InformationViews.PaymentsConteiner key={el.id}>
              <Title variant={'information-payments__title'} type={'h1'}>
                {el.title}
              </Title>
              <InformationViews.ContactWrapper>
                {el.children.map((elChild, iChild) => {
                  return (
                    <InformationViews.ContactItem
                      key={iChild}
                      title={elChild.title}
                      content={elChild.content}
                    />
                  );
                })}
              </InformationViews.ContactWrapper>
            </InformationViews.PaymentsConteiner>
          );
        })}
      </Container>
    </Layout>
  );
};

export default React.memo(InformationContacts);
