import React from 'react';
import style from './styles/wrapper.module.scss';

const WrapperPage = ({ rightChildComponent = null, leftChildComponent = null }) => {
  return (
    <div className={style['cabinet']}>
      <div className={'container'}>
        <div className={style['cabinet-row']}>
          <div className={style['cabinet-leftcol']}>{leftChildComponent}</div>
          <div className={style['cabinet-rightcol']}>{rightChildComponent}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(WrapperPage);
