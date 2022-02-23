import React, { useState, useEffect, createRef } from 'react';
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
  collections, //boolen
  changeColorBtn,
  setChangeColorBtn,
  listCollectionsHook, //
}) => {
  const { stateCountCart, dispatch } = useStoreon('stateCountCart');
  const [ countInBtn, setCountInBtn ] = useState()
  const cartRef = createRef();
  



  const test = () =>{
    const cloneIcon = cartRef.current.cloneNode(true)
    const cloneIconWidth = cartRef.current.offsetWidth;//ширина изображения
    const cloneIconHeight = cartRef.current.offsetHeight;// высота изображения
    const cloneIconTop = cartRef.current.getBoundingClientRect().top;// позиция изображения на странице от верха
    const cloneIconLeft = cartRef.current.getBoundingClientRect().left;//позиция изображения на странице от левого края
    //присваиваем стили нашей картинке
    cloneIcon.setAttribute('class', '_flyImage');
    cloneIcon.style.cssText = `
      left: ${cloneIconLeft}px;
      top:  ${cloneIconTop}px;
      width: ${cloneIconWidth}px;
      height: ${cloneIconHeight}px;
    `
    //добавляем клон на страницу
    document.body.append(cloneIcon)
    // получаем координаты карзины по id 'cart-id'
    const getCartId = document.querySelector('#cart-id')
    const getCartIdTop = getCartId.getBoundingClientRect().top;// позиция изображения на странице от верха
    const getCartIdLeft = getCartId.getBoundingClientRect().left;// позиция изображения на странице от левого края
   
    cloneIcon.style.cssText = `
      left: ${getCartIdLeft}px;
      top:  ${getCartIdTop}px;
      width: 0;
      height: 0;
      opacity: 0;
      transform: scale(.5)
    `
    const timer = setTimeout(()=>{
      cloneIcon.remove()
      return ()=>clearTimeout(timer)
    },4000)
  }

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
  if (in_cart_count) {
    return (
      <div className={style['prodpage-control-buttons']}>
        <div className={style['prodpage-control-buttons__counter']}>
          <GxButton
            onClick={(e) => {
              test(e)
              addToCartProduct(- 1, true);
            }}
            className={style['prodpage-control-buttons__add-button']}
          >
            -
          </GxButton>
          <p className={colorBtnClick}>
          <GxIcon 
          ref={cartRef}
          slot="icon-left" 
          src={shoppingIcon}></GxIcon>
            <span> в корзине: {countInBtn} шт.</span>
          </p>
          <GxButton
            onClick={(e) => {
              test(e)
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

    //когда дроп, когда есть колекция, когда добавлен один пустой или не закрытый сбор
    return (
    <div className={style['prodpage-control-buttons']}>
      <div className={style['prodpage-control-buttons__add']}>
        <GxButton
          onClick={(e) => {
            test(e)
            addToCartProduct(1);
          }}
          className={style['prodpage-control-buttons__add-to-cart']}
        >
          <GxIcon 
          ref={cartRef}
          slot="icon-left" 
          src={shoppingIcon}></GxIcon>
          добавить в корзину
        </GxButton>
      </div>
      {linkToProductPage()}
    </div>
    )
  }

};

export default ControlButtons;
