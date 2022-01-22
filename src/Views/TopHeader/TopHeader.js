import React, { useState, useEffect } from 'react';
import style from './topHeader.module.scss';
import classNames from 'classnames';
import TopHeaderMenu from '../TopHeaderMenu';
// import TopHeaderSubmenuBg from '../TopHeaderSubmenuBg';
import RelativeBurgerBtn from '../BottomHeader/RelativeBurgerBtn';
import HeaderButtons from '../HeaderButtons';
import Logo from '../Logo';
import { useStoreon } from 'storeon/react';

const TopHeader = ({
  header_menu,
  cabinet_data,
  setActiveSubmenuBg,
  profile,
  cabinet_menu,
  site_configuration,
  currencies,
}) => {
  const { promotionsAdds } = useStoreon('promotionsAdds');
  // todo: при сколле submenuBg не учитывается offsetTop
  const handlerActiveDropDownMenuItem = (status) => {
    setActiveSubmenuBg(!status); 
  };
  return (
    <div
      className={classNames({
        [style['top-header']]: true,
        [style['top']]: !promotionsAdds.isOpen,
      })}
    >
      <div className={style['top-header-wrapper']}>
        <Logo site_configuration={site_configuration} mobile isLight={false} />

        <TopHeaderMenu
          handlerActiveDropDownMenuItem={handlerActiveDropDownMenuItem}
          header_menu={header_menu}
        />

        <HeaderButtons
          lang
          currencies={currencies}
          site_configuration={site_configuration}
          profile={profile}
          cabinet_menu={cabinet_menu}
          cabinet_data={cabinet_data}
        />
        <RelativeBurgerBtn header_menu={header_menu} />
      </div>
    </div>
  );
};

export default React.memo(TopHeader);
