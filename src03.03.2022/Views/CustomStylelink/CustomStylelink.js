import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './customStylelink.module.scss';

const CustomStylelink = ({ to = '#', children, variant }) => {
  return (
    <NavLink data-cy={'NavLink'} to={to} className={style[variant]}>
      {children}
    </NavLink>
  );
};

export default React.memo(CustomStylelink);
