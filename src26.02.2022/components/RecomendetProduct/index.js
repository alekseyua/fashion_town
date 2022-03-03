import React, { useEffect, useState } from 'react';
import YouHaveAlreadyWatchedViews from '../../Views/YouHaveAlreadyWatchedViews';
import ProductCard from '../ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useStoreon } from 'storeon/react';
import api from '../../api';

const RecomendetProduct = ({ products = [], setCardIdproductFromSlider }) => {
  const [listRecomendetProduct, setlistRecomendetProduct] = useState([]);
  const { stateInPreveiwGoods } = useStoreon('stateInPreveiwGoods')
  
  const { currenssies } = useStoreon('currenssies'); //currenssies
  const sliderParams = {
    slidesPerView: 6,
    speed: 400,
    direction: 'horizontal',
    allowTouchMove: false,
  };

  useEffect(() => {
    setlistRecomendetProduct(products);
  }, [products]);

  if (!listRecomendetProduct.length) return null;

  return (
    <YouHaveAlreadyWatchedViews.Wrapper title={'Рекомендуемое'}>
      <Swiper
        {...sliderParams}
        navigation={listRecomendetProduct.length > 6}
        noSwiping
        slidesPerView={'auto'}
      >
        {listRecomendetProduct.map((el, i) => {
          const data = el;
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
                setCardIdproductFromSlider={setCardIdproductFromSlider}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </YouHaveAlreadyWatchedViews.Wrapper>
  );
};

export default React.memo(RecomendetProduct);
