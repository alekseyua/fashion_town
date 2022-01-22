import React from 'react';
import style from './styles/index.module.scss'

const Wrapper = ({ children }) => {
  return <div className="page-wrap">{children}</div>;
};

export default React.memo(Wrapper);
