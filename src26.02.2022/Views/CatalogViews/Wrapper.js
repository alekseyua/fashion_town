import React from 'react';
import classNames from 'classnames';
import style from './styles/index.module.scss';

const Wrapper = ({ children, mobBtns, catfilter, isShowMobileFilters = false }) => {
  return (
    <div
      className={classNames({
        [style['catfilter']]: catfilter,
        [style['catfilter__mob']]: true,
        [style['catfilter__mob-visible']]: isShowMobileFilters,
        [style['buttons_wrapper']]: mobBtns,
      })}
    >
      {children}
    </div>
  );
};

export default React.memo(Wrapper);
