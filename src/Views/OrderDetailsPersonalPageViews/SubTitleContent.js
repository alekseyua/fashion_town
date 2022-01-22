import React from 'react';
import style from './styles/index.module.scss';

const SubTitleContent = ({ children }) => {
  return <span className={style['cabinet_orders_details__date']}>{children}</span>;
};

export default React.memo(SubTitleContent);
