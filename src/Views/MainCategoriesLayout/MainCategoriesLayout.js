import React from 'react';
import { NavLink } from 'react-router-dom';
import Text from '../../components/Text';
import style from './mainCategories.module.scss';
import { categoryCard1 } from '../../images/index';
import classNames from 'classnames';
import { isTargetBlank } from '../../utils';

const MainCategoriesLayout = ({ banners }) => {
  //todo: вынести карточку в компонент вместо миксина
  return (
    <div className={style['main-categories']}>
      <div className={'container'}>
        <div className={style['main-categories-wrap']}>
          {banners.map((el, i) => {
            return (
              <div
                key={i}
                className={classNames({
                  [style['main-categories-card']]: true,
                  [el.css_class]: true,
                })}
                data-type={el.banner_type}
              >
                <NavLink to={el.url ? el.url : '#'} target={isTargetBlank(el.target_blank)}>
                  <div className={style['category-card']}>
                    <div className={style['category-card__image']}>
                      <img
                        className={style['category-card__img']}
                        src={el.image ? el.image : categoryCard1}
                        alt={Text({ text: 'newItems' })}
                      />
                    </div>
                    <h2 className={classNames({
                      [style['category-card__title']]: true,
                      [style['main-categories__title']]: true,
                      [style['main-categories__title-strong']]: true
                    })}>{el.title}</h2>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainCategoriesLayout);
