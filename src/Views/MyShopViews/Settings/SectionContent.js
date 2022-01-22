import React from 'react';
import style from '../index.module.scss';

const SectionContent = ({ children }) => {
  return <div className={style['cabinet_myshop__section_content']}>{children}</div>;
};

export default React.memo(SectionContent);
