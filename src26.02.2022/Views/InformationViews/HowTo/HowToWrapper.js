import React from 'react';
import style from '../styles/index.module.scss';

const HowToWrapper = ({ children }) => {


  return <div className={style['information-howto']}>{children}</div>;
};

export default React.memo(HowToWrapper);