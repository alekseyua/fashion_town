import React from 'react';
import style from './styles/wrapper.module.scss'
import { GxIcon } from '@garpix/garpix-web-components-react'

const WarningHelpText = ({ icon, wraningText = 'text', linkText = 'link', to = '#' }) => {
  return (
    <div className={style["cabinet-warning"]}>
      <div className={style["cabinet-warning__icon"]}>
        <GxIcon src={icon} alt="" />
      </div>
      <div className={style["cabinet-warning__desc"]}>
        <div className={style["cabinet-warning__text"]}>{wraningText}</div>
        <a href={to}>{linkText}</a>
      </div>
    </div>
  );
};
export default React.memo(WarningHelpText);
