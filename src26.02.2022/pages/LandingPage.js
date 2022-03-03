import React, { useRef, useEffect, useState } from 'react';
import { createItem, createLast, pricingIcon } from '../images';
import Layout from '../Views';
import SwiperCore, { Thumbs, Navigation, Pagination, Autoplay, Virtual } from 'swiper/core';
import Landing from '../Views/Landing';
import Modal from '../Views/ModalCreator';


SwiperCore.use([Thumbs, Navigation, Pagination, Autoplay, Virtual]);

const LandingPage = (props) => {
  const {
    cabinet_menu,
    create_shop,
    breadcrumbs = [],
    cabinet_site_menu,
    profile,
    title,
    location,
    components = [],
    site_configuration,
  } = props;
  const { user = {}, shop = {}, role, passport, organization, links, balance, id } = profile;
  const { insta_link } = site_configuration;
  const { is_has_shop, shop_link } = shop;
  const { username = '' } = user;
  const twoSliderSwiperRef = useRef(null);
  const thumbgallerySwiperRef = useRef(null);
  const progressBarRef = useRef(null);

  const paramsSlider = {
    slidesPerView: 1,
    speed: 400,
    observer: true,
    observeParents: true,
    pagination: true,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    centeredSlides: true,
    watchSlidesProgress: true,
  };
  const paramsSliderThumb = {
    slidesPerView: 1,
    watchSlidesProgress: true,
    direction: 'vertical',
    thumbs: {
      swiper: thumbgallerySwiperRef.current,
    },
    observer: true,
    observeParents: true,
    direction: 'horizontal',
    watchSlidesVisibility: true,
    loop: true,
  };

  const [state, setState] = useState({
    title: '',
    subTitle: null,
    image: null,
    featureCard: [],
    subHeaderOfLeader: '',
  });
  const [abouteService, setAbouteService] = useState({
    title: '',
    subTitle: null,
    featureCard: [],
  });
  const [noPreСonditions, setNoPreСonditions] = useState({
    title: '',
    subTitle: null,
    image: null,
  });
  const [ownShop, setOwnShop] = useState({
    title: '',
    subTitle: null,
    featureCard: [],
  });
  const [configure, setСonfigure] = useState({
    title: '',
    featureCard: [],
  });
  const [howMuch, setHowMuch] = useState({
    title: '',
    subTitle: null,
    image: null,
    featureCard: [],
  });

  useEffect(() => {
    const baseComponent = components.filter((el) => el.id === 16)[0];
    const abouteServiceComponent = components.filter((el) => el.id === 17)[0];
    const noPreСonditionsComponent = components.filter((el) => el.id === 18)[0];
    const ownShopComponent = components.filter((el) => el.id === 19)[0];
    const configureComponent = components.filter((el) => el.id === 20)[0];
    const howMuchComponent = components.filter((el) => el.id === 21)[0];
    if (!baseComponent) return;
    setState({
      title: baseComponent.title,
      subTitle: baseComponent.content,
      image: baseComponent.image,
      featureCard: baseComponent.children,
      subHeaderOfLeader: baseComponent.children[0].title,
    });
    if (!abouteServiceComponent) return;
    setAbouteService({
      title: abouteServiceComponent.title,
      subTitle: abouteServiceComponent.content,
      featureCard: abouteServiceComponent.children,
    });
    if (!noPreСonditionsComponent) return;
    setNoPreСonditions({
      title: noPreСonditionsComponent.title,
      subTitle: noPreСonditionsComponent.content,
      image: noPreСonditionsComponent.image,
    });
    if (!ownShopComponent) return;
    setOwnShop({
      title: ownShopComponent.title,
      subTitle: ownShopComponent.content,
      featureCard: ownShopComponent.children,
    });
    if (!configureComponent) return;
    setСonfigure({
      title: configureComponent.title,
      featureCard: configureComponent.children,
    });
    if (!howMuchComponent) return;
    setHowMuch({
      title: howMuchComponent.title,
      subTitle: howMuchComponent.content,
      image: howMuchComponent.image,
      featureCard: howMuchComponent.children,
    });
  }, []);
  return (
    <Layout profile={profile} {...props}>
      <Modal.StorControllerModal />
      <Landing.OwnBusiness.WrapWithContent
        title={state.title}
        subTitle={state.subTitle}
        subHeaderOfLeader={state.subHeaderOfLeader}
        image={state.image}
      >
        {state.featureCard.map((el) => {
          const { content, id } = el;
          return <Landing.OwnBusiness.PopularBrands id={id} content={content} />;
        })}
      </Landing.OwnBusiness.WrapWithContent>

      <Landing.AbouteService.WrapWithContent
        title={abouteService.title}
        subTitle={abouteService.subTitle}
      >
        {abouteService.featureCard.map((el) => {
          const { content, id, title, image } = el;
          return (
            <Landing.AbouteService.AdvantagesOfService
              id={id}
              title={title}
              content={content}
              image={image}
            />
          );
        })}
      </Landing.AbouteService.WrapWithContent>

      <Landing.NoPreСonditions.WrapWithContent
        title={noPreСonditions.title}
        subTitle={noPreСonditions.subTitle}
        image={noPreСonditions.image}
      />

      <Landing.OwnShop.WrapWithContent title={ownShop.title} subTitle={ownShop.subTitle}>
        <Landing.OwnShop.Container>
          <Landing.OwnShop.WrapForStep>
            {ownShop.featureCard.map((el) => {
              const { content, id, title } = el;
              return (
                <>
                  {id !== ownShop.featureCard[ownShop.featureCard.length - 1].id ? (
                    <Landing.OwnShop.Step
                      id={id}
                      item={createItem}
                      title={title}
                      content={content}
                      nameForStyle="landing_create__list_head"
                    />
                  ) : (
                    <Landing.OwnShop.Step
                      id={id}
                      item={createLast}
                      title={title}
                      content={content}
                      nameForStyle="landing_create__list_head-accent"
                    />
                  )}
                </>
              );
            })}
          </Landing.OwnShop.WrapForStep>
          <Landing.OwnShop.WrapForIcon>
            {ownShop.featureCard.map((el) => {
              const { id, image } = el;
              return (
                <>
                  {id === ownShop.featureCard[0].id ? (
                    <Landing.OwnShop.TypeOfIcon
                      nameOfStyle={'landing_create__img_back'}
                      image={image}
                    />
                  ) : id === ownShop.featureCard[1].id ? (
                    <Landing.OwnShop.TypeOfIcon
                      nameOfStyle={'landing_create__img_front'}
                      image={image}
                    />
                  ) : null}
                </>
              );
            })}
          </Landing.OwnShop.WrapForIcon>
        </Landing.OwnShop.Container>
      </Landing.OwnShop.WrapWithContent>

      <Landing.Configure.WrapWithContent title={configure.title}>
        {configure.featureCard.map((el) => {
          const { title, id, image, content } = el;
          return <Landing.Configure.Advice id={id} title={title} content={content} image={image} />;
        })}
      </Landing.Configure.WrapWithContent>

      <Landing.Pricing.WrapWithContent
        title={howMuch.title}
        subTitle={howMuch.subTitle}
        image={howMuch.image}
      >
        {howMuch.featureCard.map((el) => {
          const { title, id, content } = el;
          return (
            <Landing.Pricing.Info
              id={id}
              title={title}
              content={content}
              nameForIcon={pricingIcon}
            />
          );
        })}
      </Landing.Pricing.WrapWithContent>
    </Layout>
  );
};

export default React.memo(LandingPage);
