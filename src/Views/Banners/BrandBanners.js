import React from 'react';
import Slider from "react-slick";
import ContainerFull from '../ContainerFull';


const BrandBanners = ({ data=[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  return (
    <div className="brand-area pb-60">
      <ContainerFull>
        <Slider {...settings}>
          {data.map((item, index) => {
            const { image } = item;
            return (
              <div key={index}>
                <div className="single-brand">
                  <a href="#">
                    <img className="img" src={image} alt="brand-image" />
                  </a>
                </div>
              </div>
            )
          })}
        </Slider>
      </ContainerFull>
    </div>
  )
}

export default React.memo(BrandBanners);