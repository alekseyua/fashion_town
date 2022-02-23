import React from 'react';
import Layout from '../Views';
import Breadcrumbs from '../Views/Breadcrumbs';
import Container from '../Views/Container';
import AboutViews from '../Views/AboutViews';
import Modal from '../Views/ModalCreator';

import {
  aboutbox,
  aboutcheck,
  aboutShopping,
  aboutwoman1,
  aboutwoman2,
  mainAboutImg,
} from '../images';
import Title from '../Views/Title';

const AboutPage = (props) => {

  const { breadcrumbs, components, site_configuration } = props;

  const firstSection = components.filter((el) => el.id === 9)[0];
  const platformSection = components.filter((el) => el.id === 10)[0];
  const platformListSection = components.filter((el) => el.id === 11)[0];
  const techSection = components.filter((el) => el.id === 12)[0];
  const cardFeatures = components.filter((el) => el.id === 13)[0];
  const cardFeaturesTwo = components.filter((el) => el.id === 14)[0];
  const footerSection = components.filter((el) => el.id === 15)[0];
  const listPlantformDesc = platformListSection.children.map((el) => { 
    return {
      icon: el.image,
      content: el.content,
    };
  });


  return (
    <Layout {...props}>
      <Modal.StorControllerModal />
      <Container>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Container>
      <AboutViews.AboutFt>
        <AboutViews.Block className={'about_page_reg__wrapper'}>
          <AboutViews.DescriptionLeftBlock>
            <Title variant={'about-page'} type={'h1'}>
              {firstSection.title}
            </Title>
            <AboutViews.DescriptionText>
              <div dangerouslySetInnerHTML={{ __html: firstSection.content }}></div>
            </AboutViews.DescriptionText>
            <AboutViews.Link
              to={site_configuration.registration_slug}
              className={'about_page_reg__link'}
            >
              зарегистрироваться
            </AboutViews.Link>
          </AboutViews.DescriptionLeftBlock>
          <AboutViews.WomanImage image={mainAboutImg} />
        </AboutViews.Block>
      </AboutViews.AboutFt>

      <AboutViews.Block className={'about_page_exp'}>
        {platformSection.children
          ? platformSection.children.map((el) => {
              return <AboutViews.ExpItem key={el.id} desc={el.content} icon={el.image} />;
            })
          : null}
      </AboutViews.Block>

      <AboutViews.Block className={'about_page_for'}>
        <AboutViews.ImageBlock image={aboutShopping} className={'about_page_for__img'} />
        <AboutViews.WrapperTextBlock>
          <Title variant={'about_page_for__head'} type={'h4'}>
            {platformSection.title}
          </Title>
          <AboutViews.ListPlantformDesc items={listPlantformDesc} />
        </AboutViews.WrapperTextBlock>
      </AboutViews.Block>

      <AboutViews.TechnologiesBusiness>
        <AboutViews.Block className={'about_page_pluses'}>
          <Title variant={'about_page_pluses__head'} type={'h4'}>
            {techSection.title}
          </Title>
          <AboutViews.DescriptionFeature>
            <div dangerouslySetInnerHTML={{ __html: techSection.content }}></div>
          </AboutViews.DescriptionFeature>
          <AboutViews.CardFeatureWrapper>
            <AboutViews.CardFeature
              title={cardFeatures.title}
              items={cardFeatures.children}
              imageCard={cardFeatures.image}
            />
            <AboutViews.CardFeature
              title={cardFeaturesTwo.title}
              items={cardFeaturesTwo.children}
              imageCard={cardFeaturesTwo.image}
            />

            {/* <AboutViews.CardFeature
              title={'Почему у нас выгодно'}
              items={whyProfitableWithUsItems}
              itemsThree={whyProfitableWithUsThree}
              imageItem={aboutcheck}
              imageCard={aboutwoman1}
            /> */}
          </AboutViews.CardFeatureWrapper>
        </AboutViews.Block>
      </AboutViews.TechnologiesBusiness>
      <AboutViews.Block className={'about_page_economy'}>
        <AboutViews.WrapperEconomyDescription>
          <Title variant={'about_page_for__head'} type={'h4'}>
            {footerSection.title}
          </Title>
          <AboutViews.EconomyDescription content={footerSection.content} />
        </AboutViews.WrapperEconomyDescription>
        <AboutViews.EconomyImage image={aboutbox} />
      </AboutViews.Block>
      <AboutViews.Block className={'about_page_links'}>
        <AboutViews.LinksFooter linkPartnership={'/for_partners'} />

      </AboutViews.Block>
    </Layout>
  );
};

export default React.memo(AboutPage);
