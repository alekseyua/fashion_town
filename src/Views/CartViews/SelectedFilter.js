import React, { useEffect, useState } from 'react';
import CheckBox from '../CheckBox';
import Button from '../Button';
import style from './styles/index.module.scss';
import { GxTooltip } from '@garpix/garpix-web-components-react';

const SelectedFilter = ({ checked, changeSelectedFilter, multipleDeleteFromCart, tooltipOpen }) => {
  return (
    <div className={style['selected-filters']}>
      <CheckBox
        checked={checked}
        onClick={changeSelectedFilter}
        variant="input"
        label={!checked ? 'Выделить все' : 'Снять выделение'}
      />

      <GxTooltip
        trigger={'manual'}
        content="Вы не выбрали ни одного товара"
        placement="top"
        open={tooltipOpen}
      >
        <Button onClick={multipleDeleteFromCart} variant={'delete'}>
          Удалить выбранные
        </Button>
      </GxTooltip>
    </div>
  );
};

export default React.memo(SelectedFilter);
