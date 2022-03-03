import React from 'react';
import Slider from "react-slick";
import SingleBanner from '../../Views/SingleBanner';
import Product from '../Product';
import Text from '../../components/Text';
import { Link } from 'react-router-dom';

const NewProProduct = ({ initProduct = [], banners }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
    <div className="new-pro-content">
      <div className="pro-tab-title border-line">
        <ul className="nav product-list product-tab-list mb-30">
          <li><Link className="active" data-toggle="tab" to="#new-arrival"><Text text={'new_arrivals'}/></Link></li>
          {/*<li><Link data-toggle="tab" href="#toprated"><Text text={'featured'}/></Link></li>*/}
          {/*<li><Link data-toggle="tab" href="#new-arrival"><Text text={'top_rated'}/></Link></li>*/}
        </ul>
      </div>
      <Slider {...settings}>
        {initProduct.map((item, index) => {
          return <Product key={index} product={item} />
        })}
      </Slider>
      {banners && banners.length > 0 ? (
        <SingleBanner className={'mt-3'} {...banners[0]} />
      ) : null}
    </div>
  )
}

export default React.memo(NewProProduct);