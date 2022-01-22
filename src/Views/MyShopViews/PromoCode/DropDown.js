import React from 'react';
import style from '../index.module.scss';
import { GxButton, GxDropdown, GxMenu, GxMenuItem } from '@garpix/garpix-web-components-react';

const Dropdown = ({ is_active, deactivateHandleClick, changeHandleClick, deleteHandleClick }) => {
  return (
    <GxDropdown placement="bottom-end" className={style['cabinet-promocode-block__dropdown']}>
      <GxButton
        slot="trigger"
        caret
        size="sm"
        className={style['cabinet-promocode-block__dropdown_btn']}
      >
        • • •
      </GxButton>
      <GxMenu>
        <GxMenuItem
          onClick={deactivateHandleClick}
          className={style['cabinet-promocode-block__dropdown_item']}
        >
          {is_active ? 'Деактивировать' : 'Активировать'}
        </GxMenuItem>
        <GxMenuItem
          onClick={changeHandleClick}
          className={style['cabinet-promocode-block__dropdown_item']}
        >
          Редактировать
        </GxMenuItem>
        <GxMenuItem
          onClick={deleteHandleClick}
          className={style['cabinet-promocode-block__dropdown_item']}
        >
          Удалить
        </GxMenuItem>
      </GxMenu>
    </GxDropdown>
  );
};
export default React.memo(Dropdown);
