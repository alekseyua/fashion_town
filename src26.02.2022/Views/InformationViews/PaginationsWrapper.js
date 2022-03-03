import React from 'react';
import classNames from 'classnames';
import style from './styles/index.module.scss';

const PaginationsWrapper = ({ children, center }) => {
  return (
    <div
      className={classNames({
        [style['wrapper-pagination']]: true,
        [style['wrapper-pagination-center']]: center
      })}
    >
      {children}
    </div>
  );
};

export default React.memo(PaginationsWrapper);
