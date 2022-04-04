import React from 'react';
import style from './styles/index.module.scss';

const CommentOrder = ({ name, handleChange, value='', placeholder }) => {
  return (
    <>
    <textarea
      name={name}
      value={value}
      onChange={handleChange}
      className={style['comment-block']}
      placeholder={placeholder}
    ></textarea>
    </>
  );
};

export default React.memo(CommentOrder);
