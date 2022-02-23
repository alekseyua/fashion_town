import React, { createRef, useEffect, useRef, useState } from 'react';
import Text from '../../components/Text';
import { Link } from 'react-router-dom';
import AsyncComponent from '../../components/AsyncComponent';
import classNames from 'classnames';
import {
  productDiscount,
  productNew,
  productHit,
  favoriteIcon,
  favoriteIconNew,
  favoriteFilledIcon,
  defaultImageCard,
} from '../../images';
import { GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import style from './productCard.module.scss';
import { motion } from 'framer-motion';
import { useStoreon } from 'storeon/react';


const AsyncSlider = AsyncComponent(() => {
  return import('./Slider');
});
const ProductCard = (props) => {
  const {
    swapperDisabled,
    disabledHover,
    title,
    id,
    url,
    brand,
    favorite,
    prices,
    stock,
    colors,
    images = [],
    isSales,
    isNew,
    isHit,
    setModalStates,
    setLikeProductCard,
    sizes,
    product_rc,
    currenssies,
    profile,
    setCardIdproductFromSlider,
  } = props;

  const [isFavorite, setIsFavorite] = useState();
  const { stateInPreveiwGoods } = useStoreon('stateInPreveiwGoods')
  useEffect(()=>{
    stateInPreveiwGoods.id === id? setIsFavorite(stateInPreveiwGoods.is_liked) : setIsFavorite(favorite)
  },[favorite,stateInPreveiwGoods])
  //modificator class
  const customClassGridModificator = classNames({
    [style['product-card']]: true,
  });
  const customClassNameWrapper = classNames({
    [style['product-card-wrap']]: !disabledHover,
    [style['product-card-not-grid']]: disabledHover,
  });

// -------------------------------------------------------------------------
  const [addHeart1, setAddHeart1] = useState({})
  const [addHeart2, setAddHeart2] = useState({})
  const [addHeart3, setAddHeart3] = useState({})
  const [addHeart4, setAddHeart4] = useState({})
  const [addHeart5, setAddHeart5] = useState({})
  


// ---------------------------------------------------------------------------------------------------------------------------


  return (
    <motion.div 
 
      
      className={customClassGridModificator}

    >
        <div className={customClassNameWrapper}>
        <div className={style['product-card__top']}>
          <div className={'product_card-hide_hydrate'}>
            <div className={style['product-card__tags']}>
              {isSales ? (
                <div className={style['product-card__tag']}>
                  <img
                    width={'20px'}
                    height={'20px'}
                    src={productDiscount}
                    alt={Text({ text: 'sale' })}
                  />
                </div>
              ) : null}
              {isNew ? (
                <div className={style['product-card__tag']}>
                  <img
                    width={'20px'}
                    height={'20px'}
                    src={productNew}
                    alt={Text({ text: 'new' })}
                  />
                </div>
              ) : null}
              {isHit ? (
                <div className={style['product-card__tag']}>
                  <img
                    width={'20px'}
                    height={'20px'}
                    src={productHit}
                    alt={Text({ text: 'hit' })}
                  />
                </div>
              ) : null}
            </div>
          </div>

          {stock ? (
            <div className={style['product-card__stock']}>{Text({ text: 'inStock' })}</div>
          ) : (
            ''
          )}
          {swapperDisabled ? (
            <img src={images[0]} alt={'default image'} />
          ) : (
            <AsyncSlider 
              url={url} 
              product_rc={product_rc} 
              sizes={sizes} 
              images={images} 
              profile={profile}
              id={id}
              setCardIdproductFromSlider={setCardIdproductFromSlider}
             />
          )}
          <div className={style['product-card__head']}>
            <h6 className={style['product-card__brand']}>{brand}</h6>
            <GxButton
              variant="text"
              className={classNames({
                [style['product-card__favorite']]: true,
              })}
              onClick={() => {
                setIsFavorite(!isFavorite);
                setLikeProductCard(id);
              }}
            >
              <motion.div
              >
                <GxIcon src={isFavorite ? favoriteFilledIcon : favoriteIcon} />
              </motion.div>
             
            </GxButton>
          </div>
          <h5 className={style['product-card__name']}>
            <Link to={url}>{title}</Link>
          </h5>
          <div className={style['product-card__prices']}>
            <div
              className={classNames({
                [style['product-card__price']]: true,
                [style['product-card__price_new']]: prices.old_price,
              })}
            >
              {prices.price} {currenssies}
            </div>
            {prices.old_price ? (
              <div className={style['product-card__price_old']}>
                {prices.old_price} {currenssies}
              </div>
            ) : null}
          </div>
        </div>
        <div className={style['product-card__bottom']}>
          <ul className={style['product-card__colors']}>
            {colors.map((el, i) => {
              return (
                <li
                  key={i}
                  className={style['product-card__colors-item']}
                  style={{ backgroundColor: el.color }}
                ></li>
              );
            })}
          </ul>
          <span onClick={setModalStates} className={style['product-card__link']}>
            <Text text={'quickView'} />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProductCard);
