import React from 'react';
import Slider from "react-slick";
import { GxGrid } from '@garpix/garpix-web-components-react';
import Text from '../.././components/Text';
import { Link } from 'react-router-dom';

const MainCarousels = ({ data = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      {data.map((item, index) => {
        const { image, url, title, content } = item;
        return (
          <div key={index}>
            <div className="slider-item slider-image" style={{ backgroundImage: `url(${image})` }}>
              <div id="slider-1-caption1" className="nivo-html-caption nivo-caption">
                <div className="text-content-wrapper">
                  <GxGrid>
                    <div className="text-content">
                      <h4 className="title2 wow bounceInLeft mb-5">{title}</h4>
                      <div className="title1 wow bounceInRight mb-5" dangerouslySetInnerHTML={{ __html: content }} />
                      <div className="banner-readmore wow bounceInUp mt-3">
                        <Link className="btn slider-btn" to={url}><Text text={'shop_now'}/></Link>
                      </div>
                    </div>
                  </GxGrid>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </Slider>
  )
}

export default React.memo(MainCarousels);