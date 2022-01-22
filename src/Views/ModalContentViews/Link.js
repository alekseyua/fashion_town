import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import style from './styles/index.module.scss';

const Link = ({ children, to = '#' }) => {

//console.log('ModalContentViews -> Link--!!!!  ')
  
  return (
    <RouterLink to={to} className={style['link-default']}>
      {children}
    </RouterLink>
  );
};

export default React.memo(Link);
