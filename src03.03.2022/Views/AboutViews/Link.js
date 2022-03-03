import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import style from './styles/index.module.scss';

const Link = ({ children, to = '#', className = '' }) => {

  //console.log(children)
  return (
    <ReactLink className={style[className]} to={to}>
      {children}
    </ReactLink>
  );
};

export default React.memo(Link);
