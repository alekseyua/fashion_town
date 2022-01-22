import React from 'react';
import style from '../index.module.scss';
import { GxIcon } from '@garpix/garpix-web-components-react';

const Content = ({ name, arrowRightBlack, url }) => {
  return (
    // <div className={style['cabinet_myshop__section_content_block']}>
    //   <a href={url}>
    //     <div className={style['cabinet_myshop__section_counthead']}>{name}</div>
    //     <GxIcon src={arrowRightBlack} className={style['cabinet_myshop__section_content_icon']} />
    //   </a>
    // </div>

    <a href={url} className={style['cabinet_myshop__section_content_block']}>
      <div className={style['cabinet_myshop__section_counthead']}>{name}</div>
      <GxIcon src={arrowRightBlack} className={style['cabinet_myshop__section_content_icon']} />
    </a>
    //
  );
};

export default React.memo(Content);
