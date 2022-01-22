import React from 'react';
import classnames from 'classnames';
import style from './styles/index.module.scss';

const Wrapper = ({ children }) => {
  const mainClassName = classnames({
    [style['news-details']]: true,
  });

  return (
    <section className={mainClassName}>
      <div className={style['news-details-page__container']}>{children}</div>
    </section>
  );
};

export default React.memo(Wrapper);
