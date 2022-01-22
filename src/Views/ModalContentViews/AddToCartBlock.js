import React from 'react';
import HeaderBlock from './HeaderBlock';
import { categoryCard1 } from '../../images';
import { useStoreon } from 'storeon/react';
import Button from '../Button';
import style from './styles/index.module.scss';
import { useHistory } from 'react-router';

const AddToCartBlock = ({
  title = 'Свитер такой-то',
  image = categoryCard1,
  size = 'Размер: S',
  priceOneProduct = false,
  allPrice = false,
  currentPrice = false,
  sale = false,
  handleClose,
}) => {

  const { currenssies } = useStoreon('currenssies'); //currenssies
  const { userPage }    = useStoreon('userPage');

  const history         = useHistory();

  const { role }        = userPage.profile;

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
            <span>{size}</span>
          </div>
        </div>
        <div className={style['add_to_cart-wrapper-content--currency_desc']}>
          {/* {priceOneProduct ? (
            <span>
              {priceOneProduct} {currenssies}
            </span>
          ) : null} */}

          {allPrice ? (
            <span>
              {allPrice} {currenssies}
            </span>
            ) : null
          }
          
          {currentPrice ? (
            <span className={style['add_to_cart-wrapper-content--price']}>
              {currentPrice} {currenssies}
            </span>
          ) : null
          }
         
        </div>
      </div>
      
        {(role === 1) ? (
              <div className={style['add_to_cart-wrapper-content--sale']}>
                <div>
                  <div
                    className={style['add_to_cart-wrapper-content--sale_promotion']}
                  >Cкидка!!! Cкидка!!! Cкидка!!!</div> 
                  <div
                    className={style['add_to_cart-wrapper-content--sale_promotion-add']}
                  >не пропустите</div>
                </div>
                <div>
                  При заказе от 3 и 5 шт. 
                </div>
              </div>
          ) : null
        }

        <div className={style['add_to_cart-wrapper-buttons']}>
          <Button variant="catalog-link-transparent-min" onClick={handleClose}>
            продолжить покупки
          </Button>
          <Button variant="cancel-black-min" onClick={()=>history.push('cart')}>
            перейти в корзину
          </Button>
        </div>
    </div>
  );
};

export default React.memo(AddToCartBlock);
