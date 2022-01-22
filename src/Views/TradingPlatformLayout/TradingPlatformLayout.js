import React from 'react';
import { NavLink } from 'react-router-dom';
import { GxIcon } from '@garpix/garpix-web-components-react';
import style from './tradingPlatform.module.scss';
import { tradingPlatformImg, cartIcon } from '../../images';
import Button from '../Button';
import Text from '../../components/Text';
import { useHistory } from "react-router-dom";


const TradingPlatformLayout = ({ first_screen, page_type_catalog }) => {
  const { title, overtitle, undertitle, filters = [], image } = first_screen;
  const history = useHistory();
   const goToCatalog = (event) => {
        event.preventDefault();
        history.push(page_type_catalog)
  }

  return (
    <div className={style['trading-platform']}>
      <div className={style['trading-platform__image']}>
        <img src={image ? image : tradingPlatformImg} alt="trading platform image" />
      </div>
      <div className={'container'}>
        <div className={style['trading-platform-wrap']}>
          <div className={style['trading-platform__content']}>
            <div className={style['trading-platform__info']}>
              <h6 className={style['trading-platform__subtitle']}>{overtitle}</h6>
              <h1 className={style['trading-platform__title']}>{title}</h1>
              <p className={style['trading-platform__text']}>{undertitle}</p>
              <div className={style['trading-platform__buttons']}>
                <NavLink to="/about" className={style['trading-platform__link']}>
                  <Text text={'about_company'} />
                </NavLink>
                <Button onClick={goToCatalog} variant={'accent'}>
                  <GxIcon
                    slot={'icon-left'}
                    src={cartIcon}
                    className={style['trading-platform__btn-icon']}
                  />
                  <span>
                    <Text text={'collect_order'} />
                  </span>
                </Button>
              </div>
            </div>
            <div className={style['trading-platform__filters']}>
              {filters.map((el) => {
                return (
                  <NavLink
                    key={el.id}
                    to={el.url ? `${page_type_catalog}?category=${el.id}` : '#'}
                    className={style['trading-platform__filter']}
                  >
                    {el.title}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TradingPlatformLayout);
