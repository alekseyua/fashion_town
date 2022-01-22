import React from 'react';
import style from '../index.module.scss';

const InfoText = ({ text, boldText, lastText = '', content }) => {
  if (content) {
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
  }
  return (
    <p className={style['cabinet_myshop__section_infotext']}>
      {text} <span className={style['cabinet_myshop__section_infotext-bold']}> {boldText}</span>
      {lastText != '' ? lastText : null}
    </p>
  );
};

export default React.memo(InfoText);
