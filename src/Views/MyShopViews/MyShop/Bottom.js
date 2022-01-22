import React from 'react';
import style from '../index.module.scss';
import { GxButton, GxIcon } from '@garpix/garpix-web-components-react';

const Bottom = ({ storeIcon, toolTipIcon, domain }) => {
  return (
    <>
      <a href={domain} target="_blank" className={style['cabinet-sidebar__newstorebtn']}>
        <img src={storeIcon} alt="store" />
        <span>мой магазин</span>
      </a>
      <GxButton variant="text" size="sm" className={style['cabinet_myshop__section_btn_del']}>
        Удалить интернет-магазин
        <GxIcon slot="icon-right" src={toolTipIcon} />
      </GxButton>
    </>
  );
};

export default React.memo(Bottom);
