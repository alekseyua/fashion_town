import React from 'react';
import { NavLink } from 'react-router-dom';
import { livePhotosCard } from '../../images';
import style from './livePhotosCard.module.scss';

const LivePhotosCard = (props) => {
  let { brand, date, image, slug = '/' } = props;
  if (image === '#') image = false;
  return (
    <NavLink to={slug}>
      <div className={style['live-photos-card']}>
        <div className={style['live-photos-card__image']}>
          <img src={image ? image : livePhotosCard} alt={brand} />
        </div>
        <div className={style['live-photos-card__info']}>
          <div className={style['live-photos-card__content']}>
            <span className={style['live-photos-card__brand']}>{brand}</span>
            <span className={style['live-photos-card__date']}>{date}</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default React.memo(LivePhotosCard);
