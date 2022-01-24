import React, { useState, useEffect } from 'react';
import { GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import { shoppingIcon } from '../../../images';
import style from '../styles/index.module.scss';
import Button from '../../Button';
import { useStoreon } from 'storeon/react';
import classnNames from 'classnames';
const ControlButtons = ({
  in_cart_count,
  addToCart,
  modalView,
  url,
  collections,
  changeColorBtn,
  setChangeColorBtn,
}) => {

  const { stateCountCart, dispatch } = useStoreon('stateCountCart');
  const [ countInBtn, setCountInBtn ] = useState()
  //******************************************************************************************************* */
  const addToCartProduct = (count, isRemoved = false) => {
    (count === 1) ? setChangeColorBtn({ red: false, green: true }) : null;
    (count === -1) ? setChangeColorBtn({ red: true, green: false }) : null;
    const openModalSucces = (countInBtn === 0) ? true : false;
    dispatch('stateCountCart/add', { ...stateCountCart, in_cart: stateCountCart.in_cart + count })

    count = countInBtn + count;
    setCountInBtn(count)
    addToCart({ count, openModalSucces });
  };

  useEffect(()=>{
    console.log('render',in_cart_count, "--", countInBtn);
    in_cart_count !== countInBtn ? setCountInBtn(in_cart_count) : null
  },[in_cart_count])


  //*******************меняем стиль на кнопке зелёный или красный*** проверено работает***************************************** */
  const [colorBtnClick, setColorBtnClick] = useState('prodpage-control-buttons__indicator');
  useEffect(() => {
    let styleColor = (classnNames({
      [style['prodpage-control-buttons__indicator--color__red']]: changeColorBtn.red,
      [style['prodpage-control-buttons__indicator--color__green']]: changeColorBtn.green,
    })
    )
    setColorBtnClick(styleColor)

  }, [changeColorBtn.red, changeColorBtn.green])

  //******************************************************************************************************* */


  const linkToProductPage = () => {
    if (!modalView) return null;
    return (
      <Button href={url} full variant={'catalog-link-transparent__modal'}>
        перейти на страницу товара
      </Button>
    );
  };

  if (in_cart_count && !collections.length) {
    return (
      <div className={style['prodpage-control-buttons']}>
        <div className={style['prodpage-control-buttons__counter']}>
          <GxButton
            onClick={() => {
              addToCartProduct(- 1, true);
            }}
            className={style['prodpage-control-buttons__add-button']}
          >
            -
          </GxButton>
          <p className={colorBtnClick}>
            <span> в корзине: {countInBtn} шт.</span>
          </p>
          <GxButton
            onClick={() => {
              addToCartProduct(+ 1);
            }}
            className={style['prodpage-control-buttons__down-button']}
          >
            +
          </GxButton>
        </div>
        {linkToProductPage()}
      </div>
    );
  }else{
    <div>
      если колекция необходимо дописать логику
    </div>
  }
  return (
    <div className={style['prodpage-control-buttons']}>
      <div className={style['prodpage-control-buttons__add']}>
        <GxButton
          onClick={() => {
            addToCartProduct(1);
          }}
          className={style['prodpage-control-buttons__add-to-cart']}
        >
          <GxIcon slot="icon-left" src={shoppingIcon}></GxIcon>
          добавить в корзину
        </GxButton>
      </div>
      {linkToProductPage()}
    </div>
  );
};

export default ControlButtons;
