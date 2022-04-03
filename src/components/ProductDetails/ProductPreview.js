import React, { useState } from 'react';
import Breadcrumbs from '../../Views/Breadcrumbs';
import { useIntl } from 'react-intl';
import CheckBox from '../../Views/CheckBox';
import {
  GxIcon,
  GxButton,
  GxTooltip,
  GxRating,
  GxTextarea,
  GxCheckbox,
} from '@garpix/garpix-web-components-react';
import MoreLink from '../../Views/MoreLink';
import ProductCard from '../../Views/ProductCard';
import ReviewsCard from '../../Views/ReviewsCard';
import Text from '../../components/Text';
import {
  deliveryIcon,
  hanger,
  fire,
  labelHit,
  labelNew,
  labelSale,
  labelOnsale,
  color,
  shoppingIcon,
} from '../../images';
import { productCard1, productCard2, productCard3 } from '../../images/index';
import { Swiper, SwiperSlide } from 'swiper/react';
import AsyncComponent from '../../components/AsyncComponent';
import Slider from './Slider';
import { useStoreon } from 'storeon/react';
import SwiperCore, { Thumbs } from 'swiper/core';
import api from '../../api'

const AsyncSlider = AsyncComponent(() => {
  return import('./Slider');
});

SwiperCore.use([Thumbs]);

const apiCart = api.cartApi
const ProductPreview = ({}) => {
  const { currenssies } = useStoreon('currenssies'); //currenssies
  const { locale } = useIntl();
  const tempBreadCrumbs = [
    {
      link: `/${locale}`,
      title: 'Главная',
    },
    {
      link: 'catalog',
      title: 'Каталог',
    },
    {
      link: 'product',
      title: 'Свитер из альпаки',
    },
  ];
  const defaultImageSet = [productCard1, productCard2, productCard3];
  const sliderParams = {
    slidesPerView: 1,
    speed: 400,
    observer: true,
    observeParents: true,
    centeredSlides: true,
    loop: true,
  };

  const sliderNavigationParams = {
    spaceBetween: 10,
    observer: true,
    slidesPerView: 4,
    direction: 'vertical',
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  };
  const sliderViewedproducts = {
    spaceBetween: 10,
    // observer: true,
    slidesPerView: 6,
    // freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    speed: 400,
    navigation: true,
  };

  const reviewsParams = {
    content: 'content',
    created_at: 'created_at',
    id: 'id',
    likes_count: 'likes_count',
    isLiked: 'isLiked',
    product: 'product',
    product_url: 'product_url',
    review_photos: [
      {
        image: productCard1,
        image_thumb: productCard1,
      },
    ],
    review_videos: [],
    stars: 5,
    updated_at: 'updated_at',
    user: 'user',
    user_rating: 'user_rating',
    setModalStates: 'setModalStates',
    setLike: 'setLike',
  };
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const changeThumbSlider = (data) => {
    setActiveIndex(data.activeIndex);
  };

  return (
    <div className="page-wrap">
      <section className="prodpage">
        <div className="container">
          <Breadcrumbs breadcrumbs={tempBreadCrumbs} />
          <div className="prodpage__row">
            <div className="prodpage__left">
              <div className="prodpage__images">
                <div className="prodpage__images-wrapper">{/* <Slider /> */}</div>
                <Swiper
                  onSlideChange={changeThumbSlider}
                  {...sliderParams}
                  thumbs={{ swiper: thumbsSwiper }}
                  className="prodpage-swiper__gallery"
                >
                  {[1, 2, 3, 4, 5].map((el) => {
                    return (
                      <SwiperSlide>
                        <img src={productCard1} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
            <div className="prodpage__right">
              <div className="prodpage__rating">
                <GxRating
                  className="prodpage__rating-indicator"
                  precision=".5"
                  value="2.5"
                ></GxRating>
                <span className="prodpage__rating-counter">15 отзывов</span>
              </div>
              <p className="prodpage__namebrand">NAME BRAND</p>
              <h1 className="prodpage__title">
                Свитер такой-то вязаный колючий сильно <br /> колючий из альпаки
              </h1>
              {/*h1  ??? name brand псевдокласс?   */}
              <ul className="prodpage-labels">
                <li className="prodpage-labels__item">
                  <GxIcon src={labelSale}></GxIcon>
                </li>
                <li className="prodpage-labels__item">
                  <GxIcon src={labelNew}></GxIcon>
                </li>
                <li className="prodpage-labels__item">
                  <GxIcon src={labelHit}></GxIcon>
                </li>
                <li className="prodpage-labels__item --long">
                  <GxIcon src={labelOnsale}></GxIcon>
                </li>
              </ul>
              <div className="prodpage-price-container">
                <p className="prodpage-price-container__mainprice">45 zl</p>
                <div className="prodpage-price-container__varpricecontainer">
                  <p>
                    При покупке от 3 ед. скидка <span>&nbsp; 5 %</span>
                  </p>
                  <p>
                    При покупке от 5 ед. скидка <span>&nbsp; 10 %</span>
                  </p>
                </div>
              </div>
              <div className="prodpage-colors">
                <p className="prodpage-colors__name">
                  <span>Цвет: &nbsp;</span>пепельно-розовый
                </p>
                <ul className="prodpage-colors__items">
                  <li className="prodpage-colors__item">
                    <GxButton className="prodpage-colors__btn" variant="text">
                      <GxIcon src={color} className="prodpage-colors__icon" />
                    </GxButton>
                  </li>
                  <li className="prodpage-colors__item">
                    <GxButton className="prodpage-colors__btn" variant="text">
                      <GxIcon src={color} className="prodpage-colors__icon" />
                    </GxButton>
                  </li>
                  <li className="prodpage-colors__item">
                    <GxButton className="prodpage-colors__btn" variant="text">
                      <GxIcon src={color} className="prodpage-colors__icon" />
                    </GxButton>
                  </li>
                </ul>
              </div>
              <div className="prodpage-sizes">
                <p className="prodpage-sizes__title">
                  <GxButton className="prodpage-sizes__btn" variant="text">
                    <GxIcon slot="icon-left" src={hanger} className="prodpage-sizes__icon"></GxIcon>
                    Таблица размеров
                  </GxButton>
                </p>
                <ul className="prodpage-sizes__items">
                  <li className="prodpage-sizes__item">
                    <GxTooltip
                      className="prodpage-sizes__size-tooltip"
                      content="Не менее 3-х единиц размера ONESIZE (безразмерные модели)”"
                      placement="top"
                    >
                      <GxButton className="prodpage-sizes__size-button">XS</GxButton>
                    </GxTooltip>
                  </li>
                  <li className="prodpage-sizes__item">
                    <GxTooltip
                      className="prodpage-sizes__size-tooltip"
                      // open
                      content="Не менее 3-х единиц размера ONESIZE (безразмерные модели)”"
                      placement="top"
                    >
                      <GxButton className="prodpage-sizes__size-button">S</GxButton>
                    </GxTooltip>
                  </li>
                  <li className="prodpage-sizes__item">
                    <GxTooltip
                      className="prodpage-sizes__size-tooltip"
                      content="Не менее 3-х единиц размера ONESIZE (безразмерные модели)”"
                      placement="top"
                    >
                      <GxButton className="prodpage-sizes__size-button">M</GxButton>
                    </GxTooltip>
                  </li>
                  <li className="prodpage-sizes__item">
                    <GxTooltip
                      className="prodpage-sizes__size-tooltip"
                      content="Не менее 3-х единиц размера ONESIZE (безразмерные модели)”"
                      placement="top"
                    >
                      <GxButton className="prodpage-sizes__size-button">L</GxButton>
                    </GxTooltip>
                  </li>
                  <li className="prodpage-sizes__item">
                    <GxTooltip
                      className="prodpage-sizes__size-tooltip"
                      content="Не менее 3-х единиц размера ONESIZE (безразмерные модели)”"
                      placement="top"
                    >
                      <GxButton className="prodpage-sizes__size-button">XL</GxButton>
                    </GxTooltip>
                  </li>
                  <li className="prodpage-sizes__item">
                    <GxTooltip
                      className="prodpage-sizes__size-tooltip"
                      content="Не менее 3-х единиц размера ONESIZE (безразмерные модели)”"
                      placement="top"
                    >
                      <GxButton className="prodpage-sizes__size-button">2XL</GxButton>
                    </GxTooltip>
                  </li>
                  <li className="prodpage-sizes__item">
                    <GxTooltip
                      className="prodpage-sizes__size-tooltip"
                      content="Не менее 3-х единиц размера ONESIZE (безразмерные модели)”"
                      placement="top"
                    ></GxTooltip>
                    <GxButton className="prodpage-sizes__size-button disabled">3XL</GxButton>
                  </li>
                  <li className="prodpage-sizes__item">
                    <GxTooltip
                      className="prodpage-sizes__size-tooltip"
                      content="Не менее 3-х единиц размера ONESIZE (безразмерные модели)”"
                      placement="top"
                    >
                      <GxButton className="prodpage-sizes__size-button">4XL</GxButton>
                    </GxTooltip>
                  </li>
                </ul>
                <p className="prodpage-sizes__remainder">
                  <GxIcon className="prodpage-sizes__remainder-btn" src={fire}></GxIcon> Осталось: 3
                  ед.
                </p>
              </div>
              <div className="prodpage-control-buttons">
                
                <div className="prodpage-control-buttons__add">
                  <GxButton className="prodpage-control-buttons__add-to-cart">
                    <GxIcon slot="icon-left" src={shoppingIcon}></GxIcon>
                    добавить в корзину
                  </GxButton>
                </div>

                <div className="prodpage-control-buttons__counter">
                  <GxButton className="prodpage-control-buttons__add-button">-</GxButton>
                  <p className="prodpage-control-buttons__indicator">
                    <span> в корзине: 1 шт.</span>
                  </p>
                  <GxButton className="prodpage-control-buttons__down-button">+</GxButton>
                </div>
              </div>
              
              <div className="prodpage__delivery-info">
                <p className="prodpage__delivery-info-title">
                  <GxIcon src={deliveryIcon} className="prodpage__delivery-info-icon"></GxIcon>{' '}
                  <span>Варианты доставки</span>
                </p>
                <p className="prodpage__delivery-info-description">
                  Для розничного покупателя: РФ, Украина, Беларусь: 300 р., от 2-х ед. - бесплатно.
                  Казахстан: 800 р., от 3-х ед. - бесплатно
                </p>
              </div>
            </div>
          </div>
          <div className="prodpage__borderbottom"></div>
        </div>
      </section>
      <section className="productdescription">
        <div className="container">
          <h2 className="productdescription__title">О товаре</h2>
          <div className="productdescription__row">
            <div>
              <p className="productdescription__text">
                Женский свитер с оленями полуприлегающего силуэта с высоким воротником. Этот
                жаккардовый рисунок - также в детских и подросковых моделях. Сделан из
                высококачественной пряжи: 60% мериносовая шерсть; 40% высокообъемный полиакрил -
                максимально комфортной как в использовании, так и в уходе. Все иделия ТМ Scandica
                подлежат ручной или машинной стирке при температуре 30 градусов C в режиме стирки
                изделий из шерсти с использованием средства для стирки шерстяных изделий.
              </p>
            </div>
            <div>
              <ul className="productdescription__list">
                <li className="productdescription__item">
                  Сезон — <span>На любой сезон</span>
                </li>
                <li className="productdescription__item">
                  Материал — <span>Шерсть</span>
                </li>
                <li className="productdescription__item">
                  Состав материала — <span>60% мериносовая шерсть, 40% полиакрил</span>
                </li>
                <li className="productdescription__item">
                  Тип — <span>Свитер</span>
                </li>
                <li className="productdescription__item">
                  Бренд — <span className="productdescription__namebrand">NAME BRAND</span>
                </li>
                <li className="productdescription__item">
                  Российский размер — <span>50-176</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="productdescription__borderbottom"></div>
        </div>
      </section>
      <section className="productreviews">
        <div className="container">
          <div className="productreviews__row">
            <div className="productreviews__left-side-wrapper">
              <h2 className="productreviews__title">Отзывы (15)</h2>
              <GxButton className="productreviews__btn">Добавить отзыв</GxButton>
              <ul className="productreviews__reviews-list">
                <li className="productreviews__item">
                  <ReviewsCard key={1} setLike={5} {...reviewsParams} />
                </li>
                <li className="productreviews__item">
                  <ReviewsCard key={1} setLike={5} {...reviewsParams} />
                </li>
                <li className="productreviews__item">
                  <ReviewsCard key={1} setLike={5} {...reviewsParams} />
                </li>
              </ul>
              <div className="productreviews__btn-show-more">
                <MoreLink url={'#'}>
                  <Text text={'show_all'} />
                </MoreLink>
                <span>показано 10 из 20</span>
              </div>
              <div className="productreviews__form">
                <h3 className="productreviews__form-title">Оставьте отзыв</h3>
                <textarea
                  className="productreviews__form-textarea"
                  placeholder="Текст отзыва"
                ></textarea>
                <div className="productreviews__form-upload">
                  <p className="productreviews__form-upload-desc">Фото или видео:</p>
                  <ul className="productreviews__form-upload-list">
                    <li className="productreviews__form-upload-item">
                      <img className="productreviews__form-upload-image" src={productCard1} />
                    </li>
                    <li className="productreviews__form-upload-item">
                      <img className="productreviews__form-upload-image" src={productCard2} />
                    </li>
                    <li className="productreviews__form-upload-item">
                      <img className="productreviews__form-upload-image" src={productCard3} />
                    </li>
                  </ul>
                  <GxButton className="productreviews__form-upload-button">Прикрепить</GxButton>
                </div>
                <p className="productreviews__form-raiting">
                  <span>Оценка: </span>
                  <GxRating
                    className="productreviews__form-rating-indicator"
                    precision=".5"
                    value="2.5"
                  ></GxRating>
                </p>
                <div className="productreviews__form-submit-wrap">
                  <CheckBox
                    // checked={values.in_stock}
                    // onGx-change={(e) => handleChangeFilters(FILTER_PARAMS.in_stock, e)}
                    variant="input"
                    label={'Соглашаюсь на обработку данных'}
                  />
                  {/* <GxCheckbox>Checkbox</GxCheckbox> */}
                  <div>
                    <GxButton className="productreviews__form-submit-btndark">отправить</GxButton>
                    <GxButton className="productreviews__form-submit-btn">отмена</GxButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="productreviews__right-side-wrapper">
              <div className="productreviews__right-side-container">
                <div className="productreviews__indicator-star-wrapper">
                  <GxRating
                    readonly
                    className="productreviews__rating-indicator"
                    precision=".5"
                    value="3.5"
                  ></GxRating>
                  <span>4,65 / 5</span>
                </div>
                <ul className="productreviews__indicator-line-list">
                  <li className="productreviews__indicator-line-item">
                    <p className="productreviews__indicator-description ">5 звезд</p>
                    <div className="productreviews__indicator-line-container">
                      <div className="productreviews__indicator-line-gray"></div>
                      <div className="productreviews__indicator-line-yelow productreviews__indicator-line-yelow--five-stars"></div>
                    </div>
                    <p className="productreviews__indicator-counter"> 2 </p>
                  </li>
                  <li className="productreviews__indicator-line-item">
                    <p className="productreviews__indicator-description ">4 звезды</p>
                    <div className="productreviews__indicator-line-container">
                      <div className="productreviews__indicator-line-gray"></div>
                      <div className="productreviews__indicator-line-yelow productreviews__indicator-line-yelow--four-stars"></div>
                    </div>
                    <p className="productreviews__indicator-counter"> 1 </p>
                  </li>
                  <li className="productreviews__indicator-line-item">
                    <p className="productreviews__indicator-description ">3 звезды</p>
                    <div className="productreviews__indicator-line-container">
                      <div className="productreviews__indicator-line-gray"></div>
                      <div className="productreviews__indicator-line-yelow productreviews__indicator-line-yelow--three-stars"></div>
                    </div>
                    <p className="productreviews__indicator-counter"> 0 </p>
                  </li>
                  <li className="productreviews__indicator-line-item">
                    <p className="productreviews__indicator-description ">2 звезды</p>
                    <div className="productreviews__indicator-line-container">
                      <div className="productreviews__indicator-line-gray"></div>
                      <div className="productreviews__indicator-line-yelow productreviews__indicator-line-yelow--two-stars"></div>
                    </div>
                    <p className="productreviews__indicator-counter"> 0 </p>
                  </li>
                  <li className="productreviews__indicator-line-item">
                    <p className="productreviews__indicator-description ">1 звездa</p>
                    <div className="productreviews__indicator-line-container">
                      <div className="productreviews__indicator-line-gray"></div>
                      <div className="productreviews__indicator-line-yelow productreviews__indicator-line-yelow--one-star"></div>
                    </div>
                    <p className="productreviews__indicator-counter"> 0 </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="viewedproducts">
        <div className="container">
          {/* <h2 className="viewedproducts__title">Вы уже смотрели</h2> */}
        </div>
        {/* <AsyncSlider
          {...sliderViewedproducts}
          product_rc={''}
          sizes={[]}
          images={defaultImageSet}
        /> */}
        <div className="viewedproducts__slider-wrapper">
          <div className="viewedproducts-slider-wrap">
            <Slider>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
                return (
                  <div className="viewedproducts__slide-wrapper">
                    <ProductCard
                      swapperDisabled
                      profile={profile}
                      disabledHover
                      url={'#'}
                      title={'el.title'}
                      id={'1'}
                      brand={[]}
                      favorite={true}
                      prices={true}
                      stock={true}
                      colors={[]}
                      images={defaultImageSet}
                      isSales={true}
                      isNew={true}
                      isHit={true}
                      // setModalStates={setModalStates}
                      // setLikeProductCard={setLikeProductCard}
                      sizes={[]}
                      product_rc={''}
                      currenssies={currenssies}
                    />
                  </div>
                );
              })}
            </Slider>
            {/* <AsyncSlider {...sliderViewedproducts} className="viewedproducts__swiper">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
                return (
                  <div className="viewedproducts__slide-wrapper">
                    <ProductCard
                      swapperDisabled
                      disabledHover
                      url={'#'}
                      title={'el.title'}
                      id={'1'}
                      brand={[]}
                      favorite={true}
                      prices={true}
                      stock={true}
                      colors={[]}
                      images={defaultImageSet}
                      isSales={true}
                      isNew={true}
                      isHit={true}
                      // setModalStates={setModalStates}
                      // setLikeProductCard={setLikeProductCard}
                      sizes={[]}
                      product_rc={''}
                      currenssies={currenssies}
                    />
                  </div>
                );
              })}
            </AsyncSlider> */}
          </div>
        </div>
      </section>
      <section className="recommendedproducts">
        <div className="container">
          <h2 className="recommendedproducts__title">Рекомендации</h2>
        </div>
        <div className="recommendedproducts__slider-wrapper">
          <div className="recommendedproducts-slider-wrap">
            <Swiper {...sliderViewedproducts} className="recommendedproducts__swiper">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
                return (
                  <SwiperSlide>
                    <div className="recommendedproducts__slide-wrapper">
                      <ProductCard
                        profile={profile}
                        swapperDisabled
                        disabledHover
                        url={'#'}
                        title={'el.title'}
                        id={'1'}
                        brand={[]}
                        favorite={true}
                        prices={true}
                        stock={true}
                        colors={[]}
                        images={defaultImageSet}
                        isSales={true}
                        isNew={true}
                        isHit={true}
                        // setModalStates={setModalStates}
                        // setLikeProductCard={setLikeProductCard}
                        sizes={[]}
                        product_rc={''}
                        currenssies={currenssies}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
      <section className="maybelikeit">
        <div className="container">
          <h2 className="maybelikeit__title">Вам может понравиться</h2>
        </div>
        <div className="maybelikeit__slider-wrapper">
          <div className="maybelikeit-slider-wrap">
            <Swiper {...sliderViewedproducts} className="maybelikeit__swiper">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
                return (
                  <SwiperSlide>
                    <div className="maybelikeit__slide-wrapper">
                      <ProductCard
                        swapperDisabled
                        disabledHover
                        url={'#'}
                        title={'el.title'}
                        id={'1'}
                        brand={[]}
                        favorite={true}
                        prices={true}
                        stock={true}
                        colors={[]}
                        images={defaultImageSet}
                        isSales={true}
                        isNew={true}
                        isHit={true}
                        // setModalStates={setModalStates}
                        // setLikeProductCard={setLikeProductCard}
                        sizes={[]}
                        product_rc={''}
                        currenssies={currenssies}
                        profile={profile}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
      <div className="container">
        <GxButton className="go-back-btn">
          <GxIcon></GxIcon> Назад
        </GxButton>
      </div>
    </div>
  );
};

export default React.memo(ProductPreview);
