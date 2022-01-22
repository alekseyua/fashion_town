import React from 'react';
import style from './styles/index.module.scss';

const WrapperTextBlock = ({ children }) => {

  return <div className={style['about_page_for__text']}>{children}</div>;
};

export default React.memo(WrapperTextBlock);
