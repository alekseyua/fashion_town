import React from 'react';
import classNames from 'classnames';
import style from '../styles/index.module.scss';

const DataProductRow = ({ children, modalView }) => {
  return (
    <div
      className={classNames({
        [style['prodpage__row']]:true,
        [style['prodpage__row-modal']]: modalView,
      })}
    >
      {children}
    </div>
  );
};

export default React.memo(DataProductRow);
