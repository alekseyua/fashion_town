import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import style from './styles/index.module.scss';

const ListPlantformDesc = ({ items = [] }) => {

  return (
    <ul className={style['about_page_for__list']}>
      {items.map((el, i) => {
        return (
          <li className={style['about_page_for__list-li']} key={`${el.id} ${i}`}>
            <GxIcon src={el.icon} className={style['about_page_for__list_icon']} />
            <div dangerouslySetInnerHTML={{ __html: el.content }}></div>
          </li>
        );
      })}
    </ul>
  );
};
export default React.memo(ListPlantformDesc);
