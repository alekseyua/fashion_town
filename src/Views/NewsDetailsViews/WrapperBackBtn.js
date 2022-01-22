import React from 'react';
import classnames from 'classnames';
import style from './styles/index.module.scss';

const WrapperBackBtn = ({ children }) => {
  const mainClassName = classnames({
    [style['news-details__wrapper']]: true,
  });

  return (
    <section className={mainClassName}>
      <div className={style['news-details__wrapper-btn']}>{children}</div>
    </section>
  );
};

export default React.memo(WrapperBackBtn);
