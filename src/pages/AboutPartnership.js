import React, { useState, useEffect } from 'react';
import Layout from '../Views';
import Text from '../components/Text';
import InformationViews from '../Views/InformationViews';
import Breadcrumbs from '../Views/Breadcrumbs';
import Title from '../Views/Title';
import Container from '../Views/Container';
import { ROLE } from '../const';

const AboutPartnership = (props) => {
  const [state, setstate] = useState({
    title: '',
    subTitle: null,
    featureCard: [],
    subContent: [],
  });
  const {
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile,
    breadcrumbs = [],
    components = [],
    site_configuration,
  } = props;
  const { user = {}, shop = {}, role, passport, organization, links } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username = '' } = user;

  useEffect(() => {
    const baseComponent = components.filter((el) => el.id === 4)[0];
    const subComponent = components.filter((el) => el.id === 5)[0];
    if (!baseComponent) return;
    setstate({
      title: baseComponent.title,
      subTitle: baseComponent.content,
      featureCard: baseComponent.children,
      subContent: subComponent.children,
    });
  }, []);
  return (
    <Layout {...props}>
      <Container>
        <InformationViews.PaymentsConteiner>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <InformationViews.HowToWrapper>
            <Title variant={'information-payments__title'} type={'h1'}>
              {state.title}
            </Title>
            <InformationViews.SubTitle variant={'subtitle-partnership'}>
              <div dangerouslySetInnerHTML={{ __html: state.subTitle }}></div>
            </InformationViews.SubTitle>
            <InformationViews.InfoCardBlock>
              {state.featureCard.map((el) => {
                const { content, id, title } = el;
                return <InformationViews.InfoCard key={id} title={title} content={content} />;
              })}
            </InformationViews.InfoCardBlock>
            <InformationViews.InfoSubBlock>
              {state.subContent.map((el, i) => {
                const { content, id, title, image } = el;
                return (
                  <InformationViews.InfoSubContent
                    key={id}
                    image={image}
                    title={title}
                    content={content}
                    reverse={i % 2 === 0}
                    url={site_configuration.registration_slug}
                  />
                );
              })}
            </InformationViews.InfoSubBlock>
          </InformationViews.HowToWrapper>
        </InformationViews.PaymentsConteiner>
      </Container>
    </Layout>
  );
};

export default React.memo(AboutPartnership);
