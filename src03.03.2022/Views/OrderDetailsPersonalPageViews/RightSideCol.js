import React from 'react';
import style from './styles/index.module.scss';

const RightSideCol = ({ children }) => {
  return <div className={style['cabinet_orders_details__listright']}>{children}</div>;
};

export default React.memo(RightSideCol);
