import React from 'react';
import style from './styles/index.module.scss';

const Tag = ({ title = 'title', filterType = 'filterType:', isLabel = true, onClick }) => {

    return (
    <div onClick={onClick} className={style['catalog-tag']}>
      <div className={style['catalog-tag__label']}>{filterType}:</div>
      <div className={style['catalog-tag__value']}>{title}</div>
    </div>
  );
};
export default React.memo(Tag);
