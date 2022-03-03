import React from 'react';
import style from '../index.module.scss';
import { GxButton } from '@garpix/garpix-web-components-react';

const Header = ({ onClick }) => {
  return (
    <div className={style['cabinet-formblock__top']}>
      <div className={style['cabinet-formblock__heading']}>Управление промокодами</div>

      <GxButton
        onClick={onClick}
        variant="text"
        size="sm"
        className={style['cabinet-promocode__delete']}
      >
        Удалить все
      </GxButton>
    </div>
  );
};

export default React.memo(Header);
