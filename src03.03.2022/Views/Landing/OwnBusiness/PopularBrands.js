import React from 'react';
import style from '../styles/index.module.scss';

const PopularBrands = ({ id, content }) => {
  return (
    <div
      key={id}
      className={style['landing_offer__brands_item']}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};
export default React.memo(PopularBrands);
