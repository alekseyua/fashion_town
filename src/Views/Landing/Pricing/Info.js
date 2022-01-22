import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import style from '../styles/index.module.scss';

const Info = ({ id, content, title, nameForIcon }) => {
  return (
    <li className={style['landing_pricing__list_item']} key={id}>
      <GxIcon src={nameForIcon} className={style['landing_pricing__list_icon']} />
      <div className={style['landing_pricing__list_desc']}>
        <div className={style['landing_pricing__list_step']}>{title}</div>
        <div
          className={style['landing_pricing__list_head']}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </li>
  );
};
export default React.memo(Info);
