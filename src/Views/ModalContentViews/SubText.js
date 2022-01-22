import React from 'react';
import style from './styles/index.module.scss';

const SubText = ({ children }) => {

//console.log('ModalContentViews -> SubText--!!!!  ')
  
  return <div className={style['sub_text']}>{children}</div>;
};

export default React.memo(SubText);
