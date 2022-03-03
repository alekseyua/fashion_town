import React from 'react';
import classNames from 'classnames';
import style from '../styles/index.module.scss';

const PaymentsDescription = ({ content, small = false, children }) => {
  const customClassName = classNames({
    [style['information-payments__wrapper-desc']]: true,
    [style['information-delivery__wrapper-desc-small']]: small,
  });
  return (
    <p className={customClassName}>
      {children}
      {content ? <div dangerouslySetInnerHTML={{ __html: content }}></div> : null}
    </p>
  );
};
export default React.memo(PaymentsDescription);
