import React, { useState, useEffect } from 'react';
import Layout from '../Views';
import Text from '../components/Text';
import InformationViews from '../Views/InformationViews';
import Title from '../Views/Title';
import Breadcrumbs from '../Views/Breadcrumbs';
import Container from '../Views/Container';
import Modal from '../Views/ModalCreator';


const Information = (props) => {
  const [state, setstate] = useState({
    title: '',
    contents: [],
  });
  const {
    cabinet_menu,
    create_shop,
    breadcrumbs = [],
    cabinet_site_menu,
    profile,
    components,
    info_payment,
    site_configuration,
  } = props;
  const { user = {}, shop = {}, role, passport, organization, links, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username = '' } = user;
  //todo: можно пропсом кастрировать футер

  useEffect(() => {
    const contentFromComponent = components.filter((el) => el.id === 6)[0];
    setstate({
      title: contentFromComponent.title,
      contents: contentFromComponent.children,
    });
  }, []);
  return (
    <Layout profile={profile} {...props}>
      <Modal.StorControllerModal />
      <Container>
        <InformationViews.PaymentsConteiner>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <InformationViews.HowToWrapper>
            <Title variant={'information-payments__title'} type={'h1'}>
              {state.title}
            </Title>
            {state.contents.map((el, i) => {
              const { content, id, title, image } = el;
              return (
                <InformationViews.InfoSubContent
                  key={id}
                  image={image}
                  title={title}
                  content={content}
                  reverse={i % 2 === 0}
                  url={false}
                />
              );
            })}
          </InformationViews.HowToWrapper>
        </InformationViews.PaymentsConteiner>
      </Container>
    </Layout>
  );
};

export default React.memo(Information);
