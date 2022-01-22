import React from 'react';
import style from './bottomHeaderMenu.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const BottomHeaderMenu = ({ main_menu = [], isScrolled }) => {
  return (
    <div
      className={classNames({
        [style['bottom-header-menu']]: true,
        [style['scrolled']]: isScrolled,
      })}
    >
      <div className={style['container']}>
        <ul className={style['bottom-header-menu__list']}>
          {main_menu.map((el, i) => {
            return (
              <li key={i} className={style['bottom-header-menu__li']}>
                <div
                  className={classNames({
                    [style['bottom-header-menu__li-item']]: true,
                    [el.css_class]: !!el.css_class,
                  })}
                >
                  <Link to={el.url}>{el.title}</Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(BottomHeaderMenu);
