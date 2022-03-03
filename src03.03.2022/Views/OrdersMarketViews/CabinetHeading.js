import React from 'react';
import './styles/style.module.scss';

const CabinetHeading = () => {
  return <div className={style['cabinet-heading']}>Управление заказами</div>;
};

export default React.memo(CabinetHeading);
