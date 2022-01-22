import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './cooperationCard.module.scss';
import Text from '../../components/Text';

const CooperationCard = (props) => {
  const { img, title, url = "#", footnote, children } = props;
  return (
    <div className={style['cooperation-card']}>
      <div className={style['cooperation-card-wrap']}>
        <div className={style['cooperation-card__image']}>
          <img src={img} alt={title} />
        </div>
        <div className={style['cooperation-card__info']}>
          <h3 className={style['cooperation-card__title']}>{title}</h3>
          <div className={style['cooperation-card__text']}>{children}</div>
          <span className={style['cooperation-card__text-bottom']}>
            <div dangerouslySetInnerHTML={{ __html: footnote }}></div>
          </span>
          <NavLink to={url} className={style['cooperation-card__link']}>
            <Text text={'moreDetails'} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CooperationCard);
