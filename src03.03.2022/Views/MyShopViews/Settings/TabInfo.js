import React from 'react';
import style from '../index.module.scss';

const TabInfo = ({ children }) => {
  return (
    <div className={style['cabinet_myshop__tab_info']}>
      <div className={style['cabinet_myshop__tab_info_text']}>{children}</div>
    </div>
  );
};

export default React.memo(TabInfo);
