import React, { useState, useEffect } from 'react';
import { categoryCard1, paperclip, send } from '../../../images';
import { GxButton, GxIcon, GxInput, GxTooltip } from '@garpix/garpix-web-components-react';
import Text from '../../../components/Text';
import CheckBox from '../../../Views/CheckBox';
import api from '../../../api';
import ImageUpload from '../../../components/ImageUpload';
import style from '../styles/index.module.scss';
import { Link } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import { ROLE } from '../../../const';


const apiCart = api.cartApi;
const CardDropAndRetail = ({currenssies,el, count}) => {
 
const id = el.id;
const fileInputRef = React.useRef(null);
const [ amountFile, setAmountFile ] = useState(null);
const { userPage } = useStoreon('userPage');
const { role } = userPage.profile;
const [stateChecked, setStateChecked] = useState(false)

      
      const changeAgreement = (e) => {
        const checked = e.target.checked;
        setStateChecked(checked)
        apiCart
        .updateCartData([
          {
              id: id,
              change_agreement: checked,
              qty: el.qty
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

    (role !== ROLE.WHOLESALE)
      ?(
        <div className={style["order-card-wrapper"]}>
          <div className={style["order-card"]}>

            <div className={style["order-card__imgage"]}>

              <div className={style["order-card__imgage-inner"]}>
                <Link 
                  to={el.url}
                >
                  <div className={style["order-card__img"]} style={{backgroundImage: `url(${el.product.image})` }}></div>
                </Link>
              </div>
            </div>

            <div className={style["content-card"]}>
              <Link     
                to={el.url}
              >
                <div className={style["content-card__title"]}>{el.product.title}</div>
              </Link>
              <div className={style["content-card__brand"]}>{el.product.brand}</div>

              <div className={style["content-card__info"]}>
                <div className={style["content-card__info-inner"]}>
                  <div className={style["content-card__info-size"]}><span><Text text={'size'} />:&nbsp;</span> {el.product.size}</div>
                  <div className={style["content-card__info-color"]}><span><Text text={'color'} />:&nbsp;</span> {el.product.color}</div>
                  <div className={style["content-card__info-agree"]}>
                    <GxTooltip
                      content="Заменить товар можно только на такой же, но в другом цвете и/или размере с соблюдением условия выкупа. Не забудьте в комментарии к товару указать свой выбор."
                      placement="top"
                      className={style['ordering_card__tooltip']}
                    >
                      <CheckBox
                        checked={stateChecked}
                        onGx-change={changeAgreement}
                        label={
                          <span className={style['ordering_card__change_text']}>Согласие на замену</span>
                        }
                      />
                    </GxTooltip>
                  </div>
                </div>

                <div className={style["content-card__amount"]}><span><Text text="count" />:&nbsp;</span>{el.qty}&nbsp;шт.</div>
                <div className={style["content-card__price"]}><span> <Text text="price" />:&nbsp;</span><span><span className={style["content-card__price--color"]}>{el.price}</span>&nbsp;{currenssies}</span>
                  {el.old_price ? (
                    <span className={style['content-card__price--old']}>

                      {el.old_price} {currenssies}
                    </span>
                  ) : null}
                </div>
              </div>


            </div>

          </div>

          <div className={style["content-card__inner-price"]}>
            <div className={style["content-card__amount-mob"]}><span><Text text="count" />:&nbsp;</span>{el.qty}&nbsp;шт.</div>
            <div className={style["content-card__price-mob"]}> <span> <Text text="price" />:&nbsp;</span><span><span className={style["content-card__price--color"]}>{el.price}</span>&nbsp;{currenssies}</span>
              {el.old_price ? (
                <span className={style['content-card__price--old']}>

                  {el.old_price} {currenssies}
                </span>
              ) : null}
            </div>
          </div>
        </div>


      ):(

        <div className={style["order-card-wrapper"]}>
          <div className={style["order-card"]}>

            <div className={style["order-card__imgage"]}>

              <div className={style["order-card__imgage-inner"]}>
                <Link
                  to={el.url}
                >
                  <div className={style["order-card__img"]} style={{backgroundImage: `url(${el.image})` }}></div>
                </Link>
              </div>
            </div>

            <div className={style["content-card"]}>
              <div className={style["content-card__title"]}>{el.title}</div>
              <div className={style["content-card__brand"]}>{el.brand}</div>

              <div className={style["content-card__info"]}>
                <div className={style["content-card__info-inner"]}>
                  <div className={style["content-card__info-size"]}><span><Text text={'size'} />:&nbsp;</span> {el.size}</div>
                  <div className={style["content-card__info-color"]}><span><Text text={'color'} />:&nbsp;</span> {el.color}</div>
                  <div className={style["content-card__info-agree"]}>
                    <GxTooltip
                      content="Заменить товар можно только на такой же, но в другом цвете и/или размере с соблюдением условия выкупа. Не забудьте в комментарии к товару указать свой выбор."
                      placement="top"
                      className={style['ordering_card__tooltip']}
                    >
                      <CheckBox
                        checked={stateChecked}
                        onGx-change={changeAgreement}
                        label={
                          <span className={style['ordering_card__change_text']}>Согласие на замену</span>
                        }
                      />
                    </GxTooltip>
                  </div>
                </div>

                <div className={style["content-card__amount"]}><span><Text text="count" />:&nbsp;</span>{el.qty}&nbsp;шт.</div>
                <div className={style["content-card__price"]}><span> <Text text="price" />:&nbsp;</span><span><span className={style["content-card__price--color"]}>{el.price}</span>&nbsp;{currenssies}</span>
                  {el.old_price ? (
                    <span className={style['content-card__price--old']}>

                      {el.old_price} {currenssies}
                    </span>
                  ) : null}
                </div>
              </div>


            </div>

          </div>

          <div className={style["content-card__inner-price"]}>
            <div className={style["content-card__amount-mob"]}><span><Text text="count" />:&nbsp;</span>{el.qty}&nbsp;шт.</div>
            <div className={style["content-card__price-mob"]}> <span> <Text text="price" />:&nbsp;</span><span><span className={style["content-card__price--color"]}>{el.price}</span>&nbsp;{currenssies}</span>
              {el.old_price ? (
                <span className={style['content-card__price--old']}>

                  {el.old_price} {currenssies}
                </span>
              ) : null}
            </div>
          </div>
        </div>

    )

    
  );
};

export default React.memo(CardDropAndRetail);
