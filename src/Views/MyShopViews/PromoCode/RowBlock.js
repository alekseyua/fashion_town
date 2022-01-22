import React from 'react';
import style from '../index.module.scss';

const RowBlock = ({nameOfStyle, parameter, value, lastParameter=''}) => {
  return (
    <div className={style['cabinet-promocode-block__middle']}>
      {parameter}<span className={style[nameOfStyle]}>{value}</span>{lastParameter}
    </div>
  );
};
export default React.memo(RowBlock);
