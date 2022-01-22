import React from 'react';
import style from '../styles/index.module.scss'

const DataProductRigth = ({ children }) => {
  return <div className={style['prodpage__right']}>{children}</div>;
};
export default React.memo(DataProductRigth);
