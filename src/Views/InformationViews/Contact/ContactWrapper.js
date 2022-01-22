import React from 'react';
import style from '../styles/index.module.scss'

const ContactWrapper = ({ children }) => {
  return <div className={style["information-contacts"]}>{children}</div>;
};

export default React.memo(ContactWrapper);
