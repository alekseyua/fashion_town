import React from 'react';
import style from './styles/index.module.scss';
import { statusCancel } from '../../images';
import { GxIcon } from '@garpix/garpix-web-components-react';

const WarningBlock = ({ textWarning = 'warning', variant = "wrapper" }) => {
  return (
    <div className={style[variant]}>
      <GxIcon className={style['wrapper__icon']} src={statusCancel} alt={'cansel'} />
      <span className={style['wrapper__text']}>{textWarning}</span>
    </div>
  );
};

export default React.memo(WarningBlock);
