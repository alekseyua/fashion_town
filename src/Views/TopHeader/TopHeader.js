import React, { useState, useEffect } from 'react';
import style from './topHeader.module.scss';
import classNames from 'classnames';
import TopHeaderMenu from '../TopHeaderMenu';
// import TopHeaderSubmenuBg from '../TopHeaderSubmenuBg';
import RelativeBurgerBtn from '../BottomHeader/RelativeBurgerBtn';
import HeaderButtons from '../HeaderButtons';
import Logo from '../Logo';
import { useStoreon } from 'storeon/react';
import LangAndCurrencies from '../HeaderButtons/LangAndCurrencies';
import { getCookie, setCookie } from '../../utils';
import {
  LANG_DATA,
  CURRENCIES_DATA,
  COOKIE_KEYS,
  ONE_YEARS,
  DEFAULT_CURRENCIES,
} from '../../const';


const TopHeader = ({
  header_menu,
  cabinet_data,
  setActiveSubmenuBg,
  profile,
  cabinet_menu,
  site_configuration,
  currencies,
  isScrolled = false,
}) => {
  const { promotionsAdds } = useStoreon('promotionsAdds');
  // todo: при сколле submenuBg не учитывается offsetTop
  const handlerActiveDropDownMenuItem = (status) => {
    setActiveSubmenuBg(!status); 
  };
  const getCurrencies = () => {
    if (currencies) {
      return currencies[0];
    } else {
      return DEFAULT_CURRENCIES;
    }
  };
  const defaultCurrenciesSingle = getCurrencies;
  const currencyDefault = getCookie(COOKIE_KEYS.CURRENCIES);
  const defaultCurrenciesData = {
    isOpen: false,
    active: currencyDefault ? currencyDefault : defaultCurrenciesSingle(),
    options: currencies
      ? currencies.map((el) => {
        return {
          name: el,
          value: el,
        };
      })
      : CURRENCIES_DATA,
  };
  const [currenciesData, setCurrencies] = useState(defaultCurrenciesData);
  
  const setCurrenciesData = (data) => {
    setCookie(COOKIE_KEYS.CURRENCIES, data.active, ONE_YEARS);
    setCurrencies(data);
  };

  return (
    <div
      className={classNames({
        [style['top-header']]: true,
        [style['top']]: !promotionsAdds.isOpen,
      })}
    >
      <div className={style['top-header-wrapper']}>
        <Logo 
          site_configuration={site_configuration}
          mobile isLight={false}
          siteLocation={'head'}
        />

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
          setCurrenciesData={setCurrenciesData}
          currenciesData={currenciesData}
        />


        <RelativeBurgerBtn header_menu={header_menu} />
      </div>
    </div>
  );
};

export default React.memo(TopHeader);
