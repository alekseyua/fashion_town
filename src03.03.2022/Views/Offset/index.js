import React from 'react';
import style from './styles/index.module.scss';
import classNames from 'classnames';

const Offset = ({ offset = 0 }) => {
  return (
    <div
      className={classNames({
        [style['offset']]: true,
        [style[`offset--${offset}`]]: offset,
      })}
    ></div>
  );
};

export default React.memo(Offset);
