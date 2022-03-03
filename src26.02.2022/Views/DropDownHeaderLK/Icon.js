import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import style from './personalInfo.module.scss';

const Icon = ({ src, slot }) => {
  return <GxIcon className={style['icon']} src={src} slot={slot} />;
};

export default React.memo(Icon);
