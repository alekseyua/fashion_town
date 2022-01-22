import React from 'react';
import classNames from 'classnames';
import style from './styles/index.module.scss';

const Block = ({ className, children }) => {

  //console.log(children)
  return (
    <div
      className={classNames({
        [style[className]]: className,
        [style['about_page-box']]: true,
      })}
    >
      {children}
    </div>
  );
};

export default React.memo(Block);
