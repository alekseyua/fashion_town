import React from 'react';
import style from './styles/index.module.scss';

const SubTitlePromocode = ({}) => {

//console.log('ModalContentViews -> SubTitlePromocode--!!!!  ')
  
  return (
    <div className={style["promocode-subtitle"]}>
      <p>задайте данные промокода</p>
    </div>
  );
};

export default React.memo(SubTitlePromocode);
