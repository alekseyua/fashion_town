import React from 'react';
import style from '../index.module.scss';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { Link } from 'react-router-dom';

const Cards = ({ name, count, arrowRightBlack, page }) => {
  return (
    <div className={style['cabinet_myshop__section_countblock']}>
      <Link to={page}>
        <div className={style['cabinet_myshop__section_counthead']}>{name}</div>
        <div className={style['cabinet_myshop__section_countbottom']}>
          <GxIcon src={arrowRightBlack} className={style['cabinet_myshop__section_counticon']} />
          <div className={style['cabinet_myshop__section_counter']}>{count}</div>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(Cards);
