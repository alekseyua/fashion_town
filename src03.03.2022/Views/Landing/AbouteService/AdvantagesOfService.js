import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import style from '../styles/index.module.scss';

const AdvantagesOfService = ({ id, content, image, title }) => {
  return (
    <div className={style['landing_about__card']} key={id}>
      <GxIcon src={image} className={style['landing_about__card_icon']} />
      <h3 className={style['landing_about__card_head']}>{title}</h3>
      <p className={style['landing_about__card_text']} dangerouslySetInnerHTML={{ __html: content }}></p>
    </div>
  );
};
export default React.memo(AdvantagesOfService);
