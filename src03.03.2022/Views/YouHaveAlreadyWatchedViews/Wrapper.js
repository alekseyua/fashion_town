import React from 'react';

const Wrapper = ({ children, title }) => {
  return (
    <section className="viewedproducts">
      <div className="container">
        <h2 className="viewedproducts__title">{title}</h2>
      </div>
      <div className="viewedproducts__slider-wrapper">
        <div className="viewedproducts-slider-wrap">{children}</div>
      </div>
    </section>
  );
};

export default React.memo(Wrapper);
