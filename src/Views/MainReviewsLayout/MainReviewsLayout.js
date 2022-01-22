import React, { useState } from 'react';
import style from './mainReviews.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, Virtual } from 'swiper/core';
import 'swiper/swiper-bundle.css';
import ReviewsCard from '../../components/ReviewsCard';
import MoreLink from '../MoreLink';
import Text from '../../components/Text';
import FiltersReviewsHome from '../FiltersReviewsHome';
import Title from '../Title';
import { v4 } from 'uuid';

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

const MainReviewsLayout = ({ reviews, reviews_url, setModalStates, setLike }) => {
  const initialFilters = [
    {
      id: v4(),
      title: 'О товаре',
      active: true,
    },
    {
      id: v4(),
      title: 'О сервисе',
      active: false,
    },
  ];
  const [slides, setSlides] = useState(reviews.product_reviews);
  const [filters, setFilters] = useState(initialFilters);
  const setFiltersDec = (data) => {
    setFilters(data);
    if (data[0].active) {
      setSlides(reviews.product_reviews);
    } else {
      setSlides(reviews.service_reviews);
    }
  };
  const sliderParams = {
    slidesPerView: 1,
    speed: 400,
    observer: true,
    observeParents: true,
    pagination: true,
    navigation: true,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    centeredSlides: true,
    watchSlidesProgress: true,
  };

  return (
    <div className={style['main-reviews']}>
      <div className={'container'}>
        <div className={style['main-reviews-wrap']}>
          <Title type={'h2'} variant={'reviews-title'}>
            <Text text={'reviews'} />
          </Title>
          <div className={style['main-reviews-filters']}>
            <FiltersReviewsHome setFilters={setFiltersDec} filters={filters} />
          </div>
          <div className={style['main-reviews-slider']}>
            <div className={style['main-reviews-slider-wrap']}>
              {slides.length ? (
                <Swiper {...sliderParams}>
                  {slides.map((el, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <ReviewsCard key={i} {...el} homePage setModalStates={setModalStates} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : null}
            </div>
          </div>
          <MoreLink url={reviews_url}>
            <Text text={'show_all'} />
          </MoreLink>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainReviewsLayout);
