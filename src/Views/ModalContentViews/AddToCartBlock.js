import React from 'react';
import HeaderBlock from './HeaderBlock';
import { categoryCard1 } from '../../images';
import { useStoreon } from 'storeon/react';
import Button from '../Button';
import style from './styles/index.module.scss';
import { useHistory } from 'react-router';
import { ROLE } from '../../const';

const AddToCartBlock = ({
  title = 'Свитер такой-то',
  image = categoryCard1,
  size = 'Размер: S',
  priceOneProduct = false,
  allPrice = false,
  currentPrice = false,
  sale = false,
  handleClose,
  product_rcHook,
  sizes
}) => {

  const { dispatch, currenssies, stateCountRestart } = useStoreon('currenssies', 'stateCountRestart'); //currenssies
  const { userPage }    = useStoreon('userPage');

  const history         = useHistory();

  const { role }        = userPage.profile;
  console.log(`sizes`, currentPrice * sizes.length)
  return (
    <div className={style['add_to_cart-wrapper']}>
      <HeaderBlock title={'Добавлено в корзину'} mb={20} />
      <div className={style['add_to_cart-wrapper-content']}>
        <div className={style['add_to_cart-wrapper-content-wrapper']}>
          <img
            className={style['add_to_cart-wrapper-content--image']}
            width="120px"
            height="120px"
            src={image}
            alt="review"
          />
          <div className={style['add_to_cart-wrapper-content--description']}>
            <span>{title}</span>
            {
            role === ROLE.RETAIL || role === ROLE.DROPSHIPPER?
            <span>{size}</span>
                :(
                <>
                <span>{product_rcHook}</span>                  
                </>
                )
            }
          </div>
        </div>
        <div className={style['add_to_cart-wrapper-content--currency_desc']}>
          {/* {priceOneProduct ? (
            <span>
              {priceOneProduct} {currenssies}
            </span>
          ) : null} */}

          {allPrice ? (
            <div className={style['add_to_cart-wrapper-content--price-sell']}>
              {allPrice} {currenssies}
            </div>
            ) : null
          }
          
          {currentPrice ? (
            <span className={style['add_to_cart-wrapper-content--price']}>
              {currentPrice} {currenssies}
            </span>
          ) : null
          }
          {role === ROLE.WHOLESALE ?
            <div className={style['add_to_cart-wrapper-content--price']}>{(currentPrice * sizes.length).toFixed()} {currenssies}</div>
            : null
          }
         
        </div>
      </div>
      
        <div className={style['add_to_cart-wrapper-buttons']}>
          <Button variant="catalog-link-transparent-min" onClick={handleClose}>
            продолжить покупки
          </Button>
          <Button variant="cancel-black-min" onClick={()=>{
            dispatch('stateCountRestart/add',!stateCountRestart)
            history.push('cart')
            }}>
            перейти в корзину
          </Button> 
        </div>
    </div>
  );
};

export default React.memo(AddToCartBlock);
