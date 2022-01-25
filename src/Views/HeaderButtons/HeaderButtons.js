import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { GxButton, GxDropdown, GxIcon, GxInput } from '@garpix/garpix-web-components-react';
import LangAndCurrencies from './LangAndCurrencies';
import DropDownMenuAccount from './DropDownMenuAccount';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import style from './headerButtons.module.scss';
import dropDownAccountMenu from './dropDownAccountMenu.module.scss';
import Input from '../../Views/Input';
import Wish from './Heart/Wish';
import Logo from '../Logo';
import { searchIcon, userIcon, favoriteIcon, cartIcon, catalogIcon } from '../../images/index';
import {
  LANG_DATA,
  CURRENCIES_DATA, 
  COOKIE_KEYS,
  ONE_YEARS,
  DEFAULT_CURRENCIES,
} from '../../const';
import { getCookie, setCookie } from '../../utils';
import Text from '../../components/Text';
import SearchPageViews from '../SearchPageViews';
import { useStoreon } from 'storeon/react';
import styleWish from './style/styleWish.module.scss';
//-------------------------------------------------------
import api from '../../api';
// import chalk from 'chalk';

//-------------------------------------------------------
const HeaderButtons = ({
  lang,
  navigation,
  isScrolled = false,
  cabinet_data,
  profile,
  cabinet_menu,
  site_configuration,
  openDropDown,
  onChangeSearchInput,
  onClickSearchBtn,
  onClickSearchRoot,
  searchResults,
  searchValue,
  currencies,
}) => {
  
  


  const {
    page_type_cart,
    page_type_account,
    page_type_auth,
    page_type_reg,
    page_type_wishlist,
    page_type_catalog,
    page_type_search,
    page_home,
  } = site_configuration;
  // const err = chalk.bold.red;
  // const war = chalk.hex('#FFA500'); // Orange color

  const intl = useIntl();
  const getMenuAccount = () => { };
  const getSearcheField = () => { };
  const defaultLangData = {
    isOpen: false,
    active: intl.locale,
    options: LANG_DATA,
  };
  const getCurrencies = () => {
    console.log('currenciescurrenciescurrencies',currencies);
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
  const { userPage } = useStoreon('userPage');
  const { dataBalance } = useStoreon('dataBalance');
  const [currencyNow, setCurrencyNow] = useState(dataBalance.currency);
  const [langData, seLangData] = useState(defaultLangData);
  const [currenciesData, setCurrencies] = useState(defaultCurrenciesData);
  const [searchInputShow, setSearchInputShow] = useState(false);
  // ___________________________________________________________________________
  const { stateCountWish } = useStoreon('stateCountWish');
  const { stateCountCart } = useStoreon('stateCountCart');
  const [ countInCar, setCountInCar] = useState();

  const searchBgRef = React.createRef(null);
  const role = userPage.profile;



  useEffect(()=>{
    setCountInCar(stateCountCart.in_cart)
  },[stateCountCart.in_cart])

  useEffect(() => {
    setCurrencyNow(dataBalance.currency)
  }, [dataBalance.currency])

  /**
   * *************************************************************************
   */

  const setCurrenciesData = (data) => {
    console.log('setCurrenciesData')
    setCookie(COOKIE_KEYS.CURRENCIES, data.active, ONE_YEARS);
    setCurrencies(data);
  };
  const hideLangDropDown = (e) => {
    console.log('hideLangDropDown')
    seLangData({
      ...langData,
      isOpen: false,
    });
  };
  const hideCurrenciesDropDown = (e) => {
    console.log('hideCurrenciesDropDown')
    setCurrenciesData({
      ...currenciesData,
      isOpen: false,
    });
  };
  const handleClickSearchBtn = () => {
    console.log('handleClickSearchBtn')
    setSearchInputShow((prevState) => !prevState);
  };
  const handleClickSearchRoot = (e) => {
    console.log('handleClickSearchRoot')
    if (searchBgRef.current === e.target) {
      setSearchInputShow(false);
      onClickSearchRoot();
    }
  };

  const handleKeyPress = (e) => {
    console.log('handleKeyPress')
    if (e.key === 'Escape') {
      setSearchInputShow(false);
    }
  };

  useEffect(() => {
    console.log('work handleKeyPress header button');
    document.addEventListener('keydown', handleKeyPress, false);
    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  }, []);

  // =======================================================================================================

        //впосля нужно протестить сколько раз вызывается 36
 // console.log('stateCountWish.mywishCount', stateCountWish.mywishCount, '-----------');
  //  console.log('stateCountCart.countCart',stateCountCart.countCart,'-----------');

  // =======================================================================================================
  return (
    <div
      className={classNames({
        [style['header-buttons']]: true,
        [style['scrolled']]: isScrolled,
      })}
    >
      {lang ? (
        <div className={style['header-buttons-dropdowns']}>
          <LangAndCurrencies
            langData={langData}
            currenciesData={currenciesData}
            hideLangDropDown={hideLangDropDown}
            isScrolled={isScrolled}
            hideCurrenciesDropDown={hideCurrenciesDropDown}
            setCurrenciesData={setCurrenciesData}
            seLangData={seLangData}
            currencyNow={currencyNow}
          />
        </div>
      ) : null}

      {navigation ? (
        <>
          {isScrolled ? <Logo isLight={!isScrolled} /> : null}
          {/* //!button */}

          <SearchPageViews.SearchWrapper
            openSearchInput={searchInputShow}
            onClickSearchRoot={handleClickSearchRoot}
            bgRef={searchBgRef}
          >
            <SearchPageViews.SearchInput
              searchInputShow={searchInputShow}
              onChangeSearchInput={onChangeSearchInput}
              search={searchValue}
              onClickSearchBtn={onClickSearchBtn}
            />
            <SearchPageViews.SearchResultsDropdown
              open={openDropDown && searchInputShow}
              results={searchResults}
              search={searchValue}
              role={role}
              site_configuration={site_configuration}
            />
          </SearchPageViews.SearchWrapper>

          <div className={style['header-buttons-icons']}>
            <GxButton
              onClick={() => handleClickSearchBtn()}
              variant="text"
              className={classNames({
                [style['header-buttons__icon']]: true,
                [style['hide']]: searchInputShow,
                [style['dark']]: true,
              })}
              data-cy={'header_searche'}
            >
              <GxIcon src={searchIcon} label={Text({ text: 'search' })} />
            </GxButton>
            {/* //!catalog */}
            <NavLink
              to={page_type_catalog}
              className={classNames({
                [style['header-buttons__icon']]: true,
                [style['header-buttons__icon-catalog']]: true,
                [style['light']]: false,
              })}
              data-cy={'header_wishlist'}
            >
              <GxIcon src={catalogIcon} label={Text({ text: 'wishlist' })} />
            </NavLink>
            {/* //!account */}
            <DropDownMenuAccount
              page_type_account={page_type_account}
              page_type_auth={page_type_auth}
              page_type_reg={page_type_reg}
              page_home={page_home}
              profile={profile}
              cabinet_menu={cabinet_menu}
              cabinet_data={cabinet_data}
              isScrolled={isScrolled}
              data-cy={'header_DropDownMenuAccount'}
            />
            {/* //!wishlist */}
            <NavLink
              to={page_type_wishlist}
              className={classNames({
                [style['header-buttons__icon']]: true,
                [style['light']]: false,
                [styleWish['heart-wish']]: true,
              })}
              data-cy={'header_wishlist'}
            >
              {/* <Wish countP={countP}> </Wish> */}
              <GxIcon
                src={favoriteIcon}
                label={Text({ text: 'wishlist' })}
              />
              {stateCountWish.count ? <div className={styleWish['count-wish']}>{stateCountWish.count}</div> : null}
            </NavLink>

            {/* //!cart */}
            <NavLink
              to={page_type_cart}
              className={classNames({
                [style['header-buttons__icon']]: true,
                [style['light']]: false,
              })}
              data-cy={'header_cart'}
            >
              <GxIcon src={cartIcon} label={Text({ text: 'cart' })} />
              {countInCar !==0 ? (
                <div
                  className={classNames({
                    [style['header-buttons__badge']]: true,
                    [style['empty']]: !`${countInCar}`,
                  })}
                >
                  {countInCar}
                </div>
              ) : null}
            </NavLink>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default React.memo(HeaderButtons);
