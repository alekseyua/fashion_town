import React from 'react';
import style from './styles/index.module.scss';

const WrapperHistory = ({ children }) => {
  return (
    <section className={style['cabinet_history']}>
      <h2 className={style['cabinet__heading']}>Мои отзывы</h2>
      {children}
    </section>
  );
};

export default React.memo(WrapperHistory);
