import React from 'react';
import classNames from 'classnames'
import style from '../styles/index.module.scss';

const Section = ({ children, modalView }) => {
  return <section className={classNames(style['prodpage'], {
    [style['prodpage-modal']]:modalView
  })}>{children}</section>;
};

export default React.memo(Section);
