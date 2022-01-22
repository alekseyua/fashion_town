import React, { useState } from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import Slider from "react-slick";
import Product from '../../components/Product';

const ProductCarousels = ({
  title = '',
  data = [],
  settingsSlider = {},
  sizeProduct
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  let sliderRef = null;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    ...settingsSlider,
    afterChange: () => setUpdateCount(updateCount + 1),
    beforeChange: (current, next) => setSlideIndex(next),
  };

  const handleNext = () => {
    sliderRef.slickGoTo(slideIndex + 1)
  }

  const handlePrev = () => {
    sliderRef.slickGoTo(slideIndex - 1)
  }

  return (
    <div className="best-seller-product pb-30">
      <div className="group-title">
        <h2>{title}</h2>
        <div>
          <GxButton onClick={handlePrev} variant="outline-secondary"></GxButton>
          {' '}
          <GxButton onClick={handleNext} variant="outline-secondary"></GxButton>
        </div>
      </div>
      <Slider ref={slider => (sliderRef = slider)} {...settings}>
        {data.map((item, index) => {
          return (
            <div className="slider-spacer" key={index}>
              <Product product={item} size={sizeProduct} />
            </div>
          )
        })}
      </Slider>
    </div>

  )
}

export default React.memo(ProductCarousels);