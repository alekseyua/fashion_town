import React from 'react';
import style from '../index.module.scss';

const InfoText = ({ infoText }) => {
  return (
    <div className={style['cabinet_myshop__tab_info']}>
      <div className={style['cabinet_myshop__tab_info_text']}>{infoText}</div>
    </div>
  );
};

export default React.memo(InfoText);
