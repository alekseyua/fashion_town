import React from 'react';
import style from '../index.module.scss';
import { GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import { Link } from 'react-router-dom';

const Bottom = ({ storeIcon, toolTipIcon, domain }) => {
  return (
    <>
     {/* временно делаем кнопку не активной в стилях */}
      <Link 
      to={domain} 
      target="_blank" 
      className={style['cabinet-sidebar__newstorebtn']}
      >
        <img src={storeIcon} alt="store" />
        <span>мой магазин</span>
      </Link>
      <GxButton variant="text" size="sm" className={style['cabinet_myshop__section_btn_del']}>
        Удалить интернет-магазин
        <GxIcon slot="icon-right" src={toolTipIcon} />
      </GxButton>
    </>
  );
};

export default React.memo(Bottom);
