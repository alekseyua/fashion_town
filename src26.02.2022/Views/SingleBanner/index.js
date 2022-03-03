import React from 'react';
import { Link } from 'react-router-dom';


const SingleBanner = ({ className, ...props }) => {
  const { image, url } = props;
  return (
    <div className={`single-banner zoom ${className}`}>
      <Link to={url}>
        <img src={image} alt="slider-banner" />
      </Link>
    </div>
  )
}

export default React.memo(SingleBanner);