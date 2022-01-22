import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import style from './styles/index.module.scss';

const ExpItem = ({ desc, icon }) => {

  return (
    <div className={style['about_page_exp__item']}>
      <div className={style['about_page_exp__item_circle']}>
        <GxIcon crossOrigin="anonymous" src={icon} className={style['about_page_exp__item_img']} />
      </div>
      <div className={style['about_page_exp__item_wrapper']}>
        <div dangerouslySetInnerHTML={{ __html: desc }}></div>
      </div>
    </div>
  );
};

export default React.memo(ExpItem);
