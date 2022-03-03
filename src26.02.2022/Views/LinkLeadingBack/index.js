import React from 'react';
import style from './styles/index.module.scss';
import { Link } from 'react-router-dom';

const LinkLeadingBack = ({to = '#'}) => {
  return (
    <div className={style['back']}>
      <span className={style['back__arrow']}>{'<'}</span>
      <Link className={style['back__link']} to={to}>
        Назад
      </Link>
    </div>
  );
};

export default React.memo(LinkLeadingBack);
