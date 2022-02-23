import React from 'react';
import style from './styles/wrapper.module.scss'
import { GxIcon } from '@garpix/garpix-web-components-react'
import { Link } from 'react-router-dom';

const WarningHelpText = ({ icon, wraningText = 'text', linkText = 'link', to = '#' }) => {
  return (
    <div className={style["cabinet-warning"]}>
      <div className={style["cabinet-warning__icon"]}>
        <GxIcon src={icon} alt="" />
      </div>
      <div className={style["cabinet-warning__desc"]}>
        <div className={style["cabinet-warning__text"]}>{wraningText}</div>
        <Link to={to}>{linkText}</Link>
      </div>
    </div>
  );
};
export default React.memo(WarningHelpText);
