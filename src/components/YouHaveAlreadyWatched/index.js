import React, { useEffect, useState } from 'react';
import YouHaveAlreadyWatchedViews from '../../Views/YouHaveAlreadyWatchedViews';
import ProductCard from '../ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useStoreon } from 'storeon/react';
import api from '../../api';

const apiProfile = api.profileApi;
const YouHaveAlreadyWatched = ({}) => {
  const { stateValuePoly,dispatch } = useStoreon('stateValuePoly');

  const [listAlreadySaw, setlistAlreadySaw] = useState([]);
  const { currenssies } = useStoreon('currenssies'); //currenssies
  const sliderParams = {
    slidesPerView: 6,
    speed: 400,
    direction: 'horizontal',
    allowTouchMove: false,
  };

  useEffect(() => {    
    apiProfile
      .getAlreadySaw()
      .then((res) => {
        setlistAlreadySaw(res.results);
      })
      .catch((err)=>{
        console.log(`ERROR YouHaveAlreadyWatched ${err}`);
      });
  }, [stateValuePoly.stateWish, stateValuePoly.stateCurrency])

  if (!listAlreadySaw.length) return null;
  return (
    <YouHaveAlreadyWatchedViews.Wrapper title={'Вы уже смотрели'}>
      <Swiper {...sliderParams} navigation={listAlreadySaw.length > 6} noSwiping slidesPerView={'auto'}>
        {listAlreadySaw.map((el, i) => {
          const data = el.product;
          return (
            <SwiperSlide key={el.id}>
              <ProductCard
                disabledHover
                url={data.url}
                title={data.title}
                id={data.id}
                brand={data.brand}
                favorite={data.is_liked}
                prices={data.prices}
                stock={data.stock}
                colors={data.colors}
                images={data.images}
                isSales={data.is_closeout}
                isNew={data.is_new}
                isHit={data.is_bestseller}
                sizes={data.sizes}
                product_rc={data.product_rc}
                currenssies={currenssies}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </YouHaveAlreadyWatchedViews.Wrapper>
  );
};

export default React.memo(YouHaveAlreadyWatched);
