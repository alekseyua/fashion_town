import React, { useEffect, useState } from 'react';
import CheckBox from '../CheckBox';
import Button from '../Button';
import style from './styles/index.module.scss';
import { GxTooltip } from '@garpix/garpix-web-components-react';

const SelectedFilter = ({ setFullItemCartChecked, setFullItemCartCheckedState, multipleDeleteFromCart, tooltipOpen, oneClick, setEnab, enab,countInCart, countSelected }) => {
  return (
    <div className={style['selected-filters']}>
      <CheckBox
        checked={(countInCart===countSelected) === enab?enab:countInCart===countSelected}
        onGx-change={(e) => {
          setEnab((c) => !c)
          setFullItemCartCheckedState(true)
          setFullItemCartChecked(!enab)
        }}
        variant="input"
        label={!enab ? 'Выделить все' : 'Снять выделение'}
      />

      <GxTooltip
        trigger={'manual'}
        content="Вы не выбрали ни одного товара"
        placement="top"
        open={tooltipOpen}
      >
        <Button
          onClick={multipleDeleteFromCart}
          variant={'delete'}
          disabled={oneClick}
        >
          Удалить выбранные
        </Button>
      </GxTooltip>
    </div>
  );
};

export default React.memo(SelectedFilter);
