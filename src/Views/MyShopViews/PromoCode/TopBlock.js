import React from 'react';
import style from '../index.module.scss';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { promocode } from '../../../images';
import DropDown from './DropDown';

const TopBlock = ({
  is_active,
  title,
  deactivateHandleClick,
  changeHandleClick,
  deleteHandleClick,
}) => {
  return (
    <div className={style['cabinet-promocode-block__top']}>
      <div className={style['cabinet-promocode-block__topwrap']}>
        <GxIcon src={promocode} className={style['cabinet-promocode-block__icon']} />
        <div className={style['cabinet-promocode-block__head']}>{title}</div>
      </div>
      <DropDown
        is_active={is_active}
        deactivateHandleClick={deactivateHandleClick}
        changeHandleClick={changeHandleClick}
        deleteHandleClick={deleteHandleClick}
      />
    </div>
  );
};
export default React.memo(TopBlock);
