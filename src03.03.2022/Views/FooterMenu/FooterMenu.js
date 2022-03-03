import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './footerMenu.module.scss';

const FooterMenu = (props) => {
  const { menu, title } = props;
  return (
    <div className={style['footer-menu']}>
      <div className={'container'}>
        <nav>
          <ul className={style['footer-menu__list']}>
              {menu.map((el, key) => {
                return (
                  <li key={`${el.id}-${key}`} className={style['footer-menu__list-item']}>
                    <NavLink to={el.url}>{el.name}</NavLink>
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default React.memo(FooterMenu);
