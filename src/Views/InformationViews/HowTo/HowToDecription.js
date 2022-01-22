import React from 'react';
import style from '../styles/index.module.scss';
import classNames from 'classnames';

const HowToDecription = ({ modificatorClass = 'small', children, content }) => {
  const customClassName = classNames({
    [style['information-howto__desc-desc']]: true,
    [style[`information-howto__desc-${modificatorClass}`]]: modificatorClass,
  });

  if (content) {
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
  } else {
    return <p className={customClassName}>{children}</p>;
  }
};

export default React.memo(HowToDecription);
