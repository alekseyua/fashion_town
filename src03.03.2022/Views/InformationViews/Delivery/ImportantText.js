import React from 'react';
import style from '../styles/index.module.scss';

const ImportantText = ({ children }) => {
  return (
    <div className={style['information-delivery__wrapper-important']}>
      <p className={style['information-delivery__wrapper-important-text']}>{children}</p>
    </div>
  );
};

export default React.memo(ImportantText);
