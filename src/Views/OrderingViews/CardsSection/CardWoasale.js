import React from 'react';
import { GxTooltip } from '@garpix/garpix-web-components-react';
import Text from '../../../components/Text';
import CheckBox from '../../../Views/CheckBox';
import CartViews from '../../../Views/CartViews';
import api from '../../../api';
import style from '../styles/index.module.scss';
import { Link } from 'react-router-dom';

const apiCart = api.cartApi;

const CardWoasale = ({ 
  currenssies, 
  title, 
  is_performed, 
  condition, 
  items, 
  isVisibleLine }) => {
  
  const changeAgreement = (e, id) => {
    const checked = e.target.checked;
    apiCart
    .updateCartData([
      {
          id: id,
          change_agreement: checked,
        },
      ]) 
      .then(res=>{
        console.log(`RESAULT updateCartData "changeAgreement" CardWoasale ${res}`);
      })
      .catch(err=>{
        console.error(`ERROR updateCartData CardWoasale`,err);
      });
  };


  return (
    <div className={style['wrapper-woosale']}>
     
      {/* <Link>
          <CartViews.Text type={'text-brand'}>{title}</CartViews.Text>
        <div>
          Кличества товара :  
          :{items.length}
        </div>
      </Link> */}
      <CartViews.SuccesMinOrder success={is_performed} messenge={condition} />
      {items.map((el) => {
        
        const {
          brand,
          change_agreement,
          color,
          comment,
          discount,
          id,
          image,
          is_pack,
          old_price,
          price,
          qty,
          size,
          title,
          total_price,
          url,
        } = el;
        return (
          <div className={style['ordering_card']} key={id}>
            <div className={style['ordering_card-left']}>
              <Link
                to={url}
              >
              <img src={image} alt={'order cart image'} className={style['ordering_card__image']} />
              </Link>
              <div className={style['product__base_info']}>
                <div className={style['product__base_info__brand']}>{brand}</div>
                <div className={style['product__base_info__title']}>{title}</div>
                <div className={style['ordering_card__desc']}>
                  <div className={style['ordering_card__wrapper']}>
                    <div className={style['product__base_info__size']}>
                      <Text text={'size'} />:
                      <span className={style['product__base_info-black']}>{size}</span>
                    </div>
                    <div className={style['product__base_info__color']}>
                      <Text text={'color'} />:
                      <span className={style['product__base_info-black']}>{color}</span>
                    </div>
                  </div>
                  <div className={style['ordering_card__wrapper']}>
                    <div className={style['product__base_info__size']}>
                      <Text text="count" />:
                      <span className={style['product__base_info-black']}>{qty} шт.</span>
                    </div>
                    <div className={style['product__base_info__color']}>
                      <Text text="price" />:
                      <span className={style['product__base_info-red']}>
                        {total_price} {currenssies}
                      </span>
                      {old_price ? (
                        <span className={style['product__base_info-black_lt']}>
                          {old_price} {currenssies}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>{' '}
                <div className={style['ordering_card__change']}>
                  <GxTooltip
                    content="Заменить товар можно только на такой же, но в другом цвете и/или размере с соблюдением условия выкупа. Не забудьте в комментарии к товару указать свой выбор."
                    placement="top"
                    className={style['ordering_card__tooltip']}
                  >
                    <CheckBox
                      checked={change_agreement}
                      onGx-change={(e) => {
                        changeAgreement(e, id);
                      }}
                      label={
                        <span className={style['ordering_card__change_text']}>
                          Согласие на замену
                        </span>
                      }
                    />
                  </GxTooltip>
                </div>
              </div>
            </div>

          </div>
        );
      })}
      {isVisibleLine && <CartViews.Line />}
    </div>
  );
};

export default React.memo(CardWoasale);




  
  // dispatch('stateValuePoly/change',{
  //   stateCart : true,
  // });

