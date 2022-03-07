import React from 'react';
import { defaultImageCard } from '../../images';
import { NavLink } from 'react-router-dom';
import style from './newsCard.module.scss';

const NewsCard = (props) => {
  const { img, title, date, url = '#', description = '' } = props;
  
  return (
    <div className={style['news-card']}>
      <div className={style['news-card-wrap']}>
        <NavLink to={url} className={style['news-card__image']}>
          <img src={img && img !== '#' ? img : defaultImageCard} alt={description} />
        </NavLink>
        <div className={style['news-card__info']}>
          <NavLink to={url} className={style['news-card__title']}>
            {title}
          </NavLink>
          <span className={style['news-card__date']}>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NewsCard);
