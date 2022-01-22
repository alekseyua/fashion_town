import React from 'react';
import { GxTextarea } from '@garpix/garpix-web-components-react';
import style from './styles/index.module.scss';

const CommentOrder = ({ name, handleChange, value, placeholder }) => {
  return (
    <>
    <GxTextarea
      name={name}
      value={value}
      onGx-change={handleChange}
      className={style['comment-block']}
      placeholder={placeholder}
    ></GxTextarea>
    </>
  );
};

export default React.memo(CommentOrder);
