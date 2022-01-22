import React from 'react';
import style from './styles/rightSide.module.scss';
import { NavLink } from 'react-router-dom';
import { ROLE } from '../../const';

//todo: доделать ссылки в низу
const RightSide = ({ children, role }) => {
  return (
    <div className={style['right__side']}>
      <div className={style['wrapper']}>{children}</div>
      {ROLE.UNREGISTRED === role ? (
        <div className={style['links']}>
          <NavLink to={'#'}>Политика конфиденциальности</NavLink>
          <NavLink to={'#'}>Пользовательское соглашение</NavLink>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(RightSide);
