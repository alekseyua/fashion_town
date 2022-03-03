import React from 'react';
import style from '../styles/index.module.scss';

const ContactItem = ({ title, content }) => {
  return (
    <div className={style['information-contacts__item']}>
      <h3 className={style['information-contacts__heading']}>{title}</h3>
      <div className={style['information-contacts__desc']}>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  );
};

export default React.memo(ContactItem);
