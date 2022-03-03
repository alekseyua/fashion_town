import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import style from '../styles/index.module.scss';

const Step = ({ id, content, item, title, nameForStyle }) => {
  return (
    <li className={style['landing_create__list_item']} key={id}>
      <GxIcon src={item} className={style['landing_create__list_icon']} />
      <div className={style['landing_create__list_desc']}>
        <div className={style['landing_create__list_step']}>{`Шаг ${id - 38}`}</div>
        <div className={nameForStyle}>{title}</div>
        <p className={style['landing_create__list_text']} dangerouslySetInnerHTML={{ __html: content }}></p>
      </div>
    </li>
  );
};
export default React.memo(Step);
