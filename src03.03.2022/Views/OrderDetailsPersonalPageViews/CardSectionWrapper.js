import React from 'react';
import style from './styles/index.module.scss';

const CardSectionWrapper = ({ children }) => {
  return <div className={style['cabinet_orders_details__listwrapper']}>{children}</div>;
};

export default React.memo(CardSectionWrapper);
