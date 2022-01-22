import React, { useState } from 'react';
import { GxHamburger } from '@garpix/garpix-web-components-react';
import TopHeaderMenu from '../TopHeaderMenu';
import style from './bottomHeader.module.scss';

const RelativeBurgerBtn = ({ header_menu }) => {
  const [classModificator, setClassModificator] = useState('hidden');
  const handlerDropDown = (e) => {
    setClassModificator(e.detail.isActive ? 'visible' : 'hidden');
  };
  return (
    <div className={style['bottom-header__burger-wrapper']}>
      <GxHamburger onGxShow={handlerDropDown} className={style['bottom-header__burger-button']}>
        Кнопка
      </GxHamburger>
      {classModificator === 'visible' ? (
        <TopHeaderMenu
          classModificator={classModificator}
          handlerActiveDropDownMenuItem={() => {}}
          header_menu={header_menu}
        />
      ) : null}
    </div>
  );
};

export default React.memo(RelativeBurgerBtn);
