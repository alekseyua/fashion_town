import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import style from './styles/index.module.scss';

const Link = ({ to, children, is_link = true, onClick }) => {
  if (is_link) {
    return (
      <RouterLink to={to} className={style['information-howto__link']}>
        {children}
      </RouterLink>
    );
  } else {
    return (
      <div onClick={onClick} className={style['information-howto__link']}>
        {children}
      </div>
    );
  }
};

export default React.memo(Link);
