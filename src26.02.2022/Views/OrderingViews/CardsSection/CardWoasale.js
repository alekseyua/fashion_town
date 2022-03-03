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

            <div className={style["order-card-wrapper"]} key={id}>
              <div className={style["order-card"]}>

                <div className={style["order-card__imgage"]}>

                  <div className={style["order-card__imgage-inner"]}>
                    <Link
                      to={url}
                    >
                      <div className={style["order-card__img"]} style={{backgroundImage: `url(${image})` }}></div>
                    </Link>
                  </div>
                </div>

                <div className={style["content-card"]}>
                  <div className={style["content-card__title"]}>{title}</div>
                  <div className={style["content-card__brand"]}>{brand}</div>

                  <div className={style["content-card__info"]}>
                    <div className={style["content-card__info-inner"]}>
                      <div className={style["content-card__info-size"]}><span><Text text={'size'} />:&nbsp;</span> {size}</div>
                      <div className={style["content-card__info-color"]}><span><Text text={'color'} />:&nbsp;</span> {color}</div>
                      <div className={style["content-card__info-agree"]}>
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
                              <span className={style['ordering_card__change_text']}>Согласие на замену</span>
                            }
                          />
                        </GxTooltip>
                      </div>
                    </div>

                    <div className={style["content-card__amount"]}><span><Text text="count" />:&nbsp;</span>{qty}&nbsp;шт.</div>
                    <div className={style["content-card__price"]}><span> <Text text="price" />:&nbsp;</span><span><span className={style["content-card__price--color"]}>{price}</span>&nbsp;{currenssies}</span>
                      {old_price ? (
                        <span className={style['content-card__price--old']}>

                          {old_price} {currenssies}
                        </span>
                      ) : null}
                    </div>
                  </div>


                </div>

              </div>

              <div className={style["content-card__inner-price"]}>
                <div className={style["content-card__amount-mob"]}><span><Text text="count" />:&nbsp;</span>{qty}&nbsp;шт.</div>
                <div className={style["content-card__price-mob"]}> <span> <Text text="price" />:&nbsp;</span><span><span className={style["content-card__price--color"]}>{price}</span>&nbsp;{currenssies}</span>
                  {old_price ? (
                    <span className={style['content-card__price--old']}>

                      {old_price} {currenssies}
                    </span>
                  ) : null}
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

