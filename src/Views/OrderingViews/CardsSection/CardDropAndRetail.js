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
const [stateChecked, setStateChecked] = useState(true)

      
      const changeAgreement = (e) => {
        const checked = e.target.checked;
        setStateChecked(checked)
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
    

  console.log('el', el)
  return (

    (role !== ROLE.WHOLESALE)
      ?(
        <div className={style['ordering_main-card']}>
          <div className={style['ordering_card']}>

            <div className={style['ordering_card-left']}>   
                <Link 
                  to={el.url}
                  >
                <img src={el.product.image} className={style['ordering_card__image']} />
                </Link>
            
                  <div className={style['product__base_info']}>
                    <div className={style['ordering_card__desc']}>
                        <div className="product__base_info__size">
                          <Text text={'size'} />:&nbsp;<span className="product__base_info-black">{el.size}</span>
                        </div>
                        <div className={style['product__base_info__color']}>
                          <Text text={'color'} />:
                          <span className={style['product__base_info-black']}>{el.color}</span>
                        </div>

                    </div>
                    <div className={style['ordering_card__change']}>
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
            </div>

              <div className={style['product__base_info__size']}>
                <Text text="count" />:
                <span className={style['product__base_info-black']}>{el.qty} шт.</span>
              </div>
              <div className={style['product__base_info__price']}>
                  <Text text="price" />:
                  <span className={style['product__base_info-red']}>
                    {el.price} {currenssies}
                  </span>
                  {el.old_price ? (
                    <span className={style['product__base_info-black_lt']}>
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
                <div className={style["order-card__img"]} style={{ 'background-image': `url(${el.image})`}}></div>
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
                <div className={style["content-card__price"]}><span> <Text text="price" />:&nbsp;</span>{el.price}&nbsp;{currenssies}</div>

					</div>


				</div>

			</div>

			<div className={style["content-card__inner-price"]}>
            <div className={style["content-card__amount-mob"]}><span><Text text="count" />:&nbsp;</span>{el.qty}&nbsp;шт.</div>
            <div className={style["content-card__price-mob"]}> <span> <Text text="price" />:&nbsp;</span>{el.price}&nbsp;{currenssies}</div>
			</div>
		</div>

    )

    
  );
};

export default React.memo(CardDropAndRetail);

{/* <div className={style['ordering_main-card']}>
  <div className={style['ordering_card']}>

    <div className={style['ordering_card-left']}>
      

      <div className={style['product__base_info']}>
        <div className={style['product__base_info__brand']}></div>
        <div className={style['product__base_info__title']}></div>
        <div className={style['ordering_card__desc']}>
          <div className="product__base_info__size">
            <Text text={'size'} />:&nbsp;<span className="product__base_info-black">{el.size}</span>
          </div>
          <div className={style['product__base_info__color']}>
            <Text text={'color'} />:
            <span className={style['product__base_info-black']}>{el.color}</span>
          </div>

        </div>
        <div className={style['ordering_card__change']}>
          
        </div>
      </div>
    </div>

    <div className={style['product__base_info__size']}>
      <Text text="count" />:
      <span className={style['product__base_info-black']}>{el.qty} шт.</span>


    </div>
    <div className={style['product__base_info__price']}>
      <Text text="price" />:
      <span className={style['product__base_info-red']}>
        {el.price} {currenssies}
      </span>
      {el.old_price ? (
        <span className={style['product__base_info-black_lt']}>
          {el.old_price} {currenssies}
        </span>
      ) : null}


    </div>



  </div>




</div> */}
        // /////////////**** */