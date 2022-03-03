import React from 'react';
import classNames from 'classnames';
import style from '../index.module.scss';

const TabWrapper = ({ children, scroll = false }) => {
  return (
    <div
      className={classNames({
        [style['cabinet_myshop__tab_wrapper']]: true,
        [style['cabinet_myshop__tab_wrapper-scroll']]: scroll,
      })}
    >
      {children}
    </div>
  );
};

export default React.memo(TabWrapper);
