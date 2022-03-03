import React from 'react';
import style from '../styles/index.module.scss';

const Advice = ({ id, content, image, title }) => {
  return (
    <figure className={style['landing_sett__block']} key={id}>
      <figcaption className={style['landing_sett__block_desc']}>
        <h3 className={style['landing_sett__block_head']}>{title}</h3>
        <p className={style['landing_sett__block_text']} dangerouslySetInnerHTML={{ __html: content }}></p>
      </figcaption>
      <img src={image} alt="Image" className={style['landing_sett__block_img']} />
    </figure>
  );
};
export default React.memo(Advice);
