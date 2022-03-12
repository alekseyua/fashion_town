import React from 'react';
import style from './title.module.scss';

const Title = ({ children, variant, type }) => {
  switch (type) {
    case 'h1':
      return <h1 className={style[variant]}>{children}</h1>;
    case 'h2':
      return <h2 className={style[variant]}>{children}</h2>;
    case 'h3':
      return <h2 className={style[variant]}>{children}</h2>;
    case 'h4':
      return <h4 className={style[variant]}>{children}</h4>;
    case 'h5':
      return <h5 className={style[variant]}>{children}</h5>;
    default:
      return <h1 className={style[variant]}>{children}</h1>;
  }
};
export default React.memo(Title);

