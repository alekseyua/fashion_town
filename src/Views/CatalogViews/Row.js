import React from 'react';
import style from './styles/index.module.scss';
import classNames from 'classnames';

const Row = ({ children, variant }) => {
  return (
    <div
      className={classNames({
        [style['catalog-row']]: true,
        [style[`catalog-row--${variant}`]]: variant,
      })}
    >
      {children}
    </div>
  );
};

export default React.memo(Row);
