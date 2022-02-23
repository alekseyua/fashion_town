import React from 'react';
import style from '../index.module.scss';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { Link } from 'react-router-dom';

const Content = ({ name, arrowRightBlack, url }) => {
  return (
    // <div className={style['cabinet_myshop__section_content_block']}>
    //   <Link to={url}>
    //     <div className={style['cabinet_myshop__section_counthead']}>{name}</div>
    //     <GxIcon src={arrowRightBlack} className={style['cabinet_myshop__section_content_icon']} />
    //   </Link>
    // </div>

    <Link to={url} className={style['cabinet_myshop__section_content_block']}>
      <div className={style['cabinet_myshop__section_counthead']}>{name}</div>
      <GxIcon src={arrowRightBlack} className={style['cabinet_myshop__section_content_icon']} />
    </Link>
    //
  );
};

export default React.memo(Content);
