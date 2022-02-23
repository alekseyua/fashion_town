import React, { useEffect, useRef, useState } from 'react';
import { GxMenu, GxMenuItem, GxIcon, GxDropdown } from '@garpix/garpix-web-components-react';
import { dropdownIcon } from '../../images/index';
import classNames from 'classnames';
import style from './headerButtons.module.scss';
import { useStoreon } from 'storeon/react';
import { motion } from 'framer-motion';
import { initial } from 'lodash';
import { doc } from 'prettier';

const LangAndCurrencies = ({
  currenciesData,
  isScrolled,
  setCurrenciesData,
}) => {

  const { currenssies, dispatch } = useStoreon('currenssies');
  const [clickActiveCurrencies, setClickActiveCurrencies] = useState(false);
  const clickOutRef = useRef();
  const { updateCurrenssies } = useStoreon('updateCurrenssies');

  useEffect((e) => {
  const onClick = e => clickOutRef.current.contains(e.target) || setClickActiveCurrencies(false)
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click',onClick)
    }, [])

    return (
    <>
      <GxDropdown
        // onGx-hide={hideCurrenciesDropDown}
        className={classNames({
          [style['header-buttons-curr']]: true,
          // [style['open']]: currenciesData.isOpen,
        })}
      >
        <div
          ref={clickOutRef}
          slot="trigger"
          className={classNames({
            [style['header-buttons-curr__top']]: true,
            [style['scrolled']]: isScrolled,
            [style['open']]: clickActiveCurrencies,
          })}
          onClick={() => {
            setCurrenciesData(()=>({
              ...currenciesData,
              isOpen: !currenciesData.isOpen,
            }));
            setClickActiveCurrencies(!clickActiveCurrencies)
          }}
        >

          {currenssies}
          <GxIcon
            src={dropdownIcon}
            className={classNames({
              [style['header-buttons-curr__arrow']]: true,
              [style['scrolled']]: isScrolled,
              [style['open']]: clickActiveCurrencies,
            })}
          />
        </div>
        {clickActiveCurrencies ?
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          transition={{
            duration: 1.1
          }}
          >
            <GxMenu
              className={style['header-buttons-curr__list']}
            >
              {currenciesData.options.map((el, i) => {
                if (el.active !== currenssies)
                  return (
                    <GxMenuItem
                      key={i}
                      className={style['header-buttons-curr__list-item']}
                      value={el.value}
                      onClick={(e) => {
                        setCurrenciesData({
                          ...currenciesData,
                          active: e.target.value,
                          isOpen: !currenciesData.isOpen,
                        });
                        setClickActiveCurrencies(!clickActiveCurrencies)
                        dispatch('updateCurrenssies/update', !updateCurrenssies )
                      }}
                    >
                      {el.name}
                    </GxMenuItem>
                  );
              })}
            </GxMenu>
          </motion.div>
          : null
        }
      </GxDropdown>
    </>
  );
};
export default React.memo(LangAndCurrencies);

