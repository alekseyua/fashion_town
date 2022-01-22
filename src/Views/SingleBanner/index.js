import React from 'react';


const SingleBanner = ({ className, ...props }) => {
  const { image, url } = props;
  return (
    <div className={`single-banner zoom ${className}`}>
      <a href={url}>
        <img src={image} alt="slider-banner" />
      </a>
    </div>
  )
}

export default React.memo(SingleBanner);