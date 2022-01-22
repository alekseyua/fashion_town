import React from 'react';
import { GxMenu, GxMenuItem, GxIcon, GxDropdown } from '@garpix/garpix-web-components-react';
import { dropdownIcon } from '../../images/index';
import classNames from 'classnames';
import style from './headerButtons.module.scss';
import { useStoreon } from 'storeon/react';

const LangAndCurrencies = ({
  currenciesData,
  langData,
  hideLangDropDown,
  isScrolled,
  hideCurrenciesDropDown,
  setCurrenciesData,
  seLangData,
  currencyNow,
}) => {

  const { dispatch } = useStoreon();


  return (
    <>



      <GxDropdown
        onGx-hide={hideCurrenciesDropDown}
        className={classNames({
          [style['header-buttons-curr']]: true,
          [style['open']]: currenciesData.isOpen,
        })}
      >
        <div
          slot="trigger"
          className={classNames({
            [style['header-buttons-curr__top']]: true,
            [style['scrolled']]: isScrolled,
            [style['open']]: currenciesData.isOpen,
          })}
          onClick={() => {
            setCurrenciesData({
              ...currenciesData,
              isOpen: !currenciesData.isOpen,
            });
            seLangData({
              ...langData,
              isOpen: false,
            });
          }}
        >
          {/* {currenciesData.options.map((el, i) => {
            if (el.value === currenciesData.active) return e.nlame;
          })} */}
          {currencyNow}
          <GxIcon
            src={dropdownIcon}
            className={classNames({
              [style['header-buttons-curr__arrow']]: true,
              [style['scrolled']]: isScrolled,
              [style['open']]: currenciesData.isOpen,
            })}
          />
        </div>
        <GxMenu className={style['header-buttons-curr__list']}>
          {currenciesData.options.map((el, i) => {
            if (el.active !== currenciesData.active)
              return (
                <GxMenuItem
                  key={i}
                  className={style['header-buttons-curr__list-item']}
                  value={el.value}
                  onClick={(e) => {
                    setCurrenciesData({
                      ...currenciesData,
                      active: e.target.value,
                      isOpen: false,
                    });
                    // seLangData({
                    //   ...langData,
                    //   isOpen: false,
                    // });
                   // window.location.reload();
                   
                   dispatch('stateValuePoly/change',{stateCurrency : true})

                  }}
                >
                  {el.name}
                </GxMenuItem>
              );
          })}
        </GxMenu>
      </GxDropdown>
    </>
  );
};
export default React.memo(LangAndCurrencies);


    {/* Убрал по таску http://pm.garpix.com/browse/FASHTOWN-299 */}
      {/* <GxDropdown
        className={classNames({
          [style['header-buttons-lang']]: true,
          [style['open']]: langData.isOpen,
        })}
        onGx-after-hide={hideLangDropDown}
      >
        <div
          slot="trigger"
          className={classNames({
            [style['header-buttons-lang__top']]: true,
            [style['scrolled']]: isScrolled,
            [style['open']]: langData.isOpen,
          })}
          onClick={(e) => {
            setCurrenciesData({
              ...currenciesData,
              isOpen: false,
            });
            seLangData({
              ...langData,
              isOpen: !langData.isOpen,
            });
          }}
        >
          {langData.options.map((el, i) => {
            if (el.value == langData.active) return el.name;
          })}
          <GxIcon
            src={dropdownIcon}
            className={classNames({
              [style['header-buttons-lang__arrow']]: true,
              [style['scrolled']]: isScrolled,
              [style['open']]: langData.isOpen,
            })}
          />
        </div>
        <GxMenu className={style['header-buttons-lang__list']}>
          {langData.options.map((el, i) => {
            if (langData.active !== el.value)
              return (
                <GxMenuItem
                  key={i}
                  className={style['header-buttons-lang__list-item']}
                  value={el.value}
                  onClick={(e) => {
                    seLangData({
                      ...langData,
                      active: e.target.value,
                      isOpen: false,
                    });
                    setCurrenciesData({
                      ...currenciesData,
                      isOpen: false,
                    });
                    window.location.href = `/${e.target.value}/`;
                  }}
                >
                  {el.name}
                </GxMenuItem>
              );
          })}
        </GxMenu>
      </GxDropdown> */}