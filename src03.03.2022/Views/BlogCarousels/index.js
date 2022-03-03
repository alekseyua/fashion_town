import React, { useState } from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import Slider from "react-slick";
import Post from '../../Views/Blog';
import Text from '../../components/Text';

const BlogCarousels = ({
  title = <Text text ={'from_the_blog'}/>,
  data = [],
  settingsSlider = {},
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  let sliderRef = null;
  const settings = {
    dots: false,
    infinite: data.length > 4,
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
              <Post {...item} />
            </div>
          )
        })}
      </Slider>
    </div>

  )
}

export default React.memo(BlogCarousels);