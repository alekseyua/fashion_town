import React, { useState, useEffect } from 'react';
import CheckBox from '../CheckBox';
import Text from '../../components/Text';
import Button from '../Button';
import { GxIcon, GxInput, GxForm } from '@garpix/garpix-web-components-react';
import { categoryCard1, change, closeJustIcon, closeRed } from '../../images';
import { ROLE } from '../../const';
import style from './styles/index.module.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const defaultProductData = {
  brand: 'brand',
  color: 'color',
  id: 'id',
  in_stock_count: 'in_stock_count',
  size: 'size',
  title: 'title',
};

const ProductHorizontalCard = ({
  deleteProductFromCart,
  updateProductFromCart,
  id,
  qty,
  product = defaultProductData,
  currentCurrcensies,
  old_price,
  total_price,
  price,
  condition,
  role,
  url,
  selected,
  ...props
}) => {

  const { brand, color, id: productId, in_stock_count, size, title, image } = product;

  const [countProducts, setCountProducts] = useState(qty);
  const [stateAction, setStateAction] = useState();
  const [select, setSelect] = useState(selected)
  useEffect(() => {
    qty !== countProducts?setCountProducts(qty):null
  }, [qty])

  useEffect(() => {
    setSelect(selected)
  }, [selected])


  const updateQty = (qty) => {

    updateProductFromCart({
      id: id,
      selected: selected,
      qty: qty,
      oldQty: countProducts,
      is_collection: true
    });
  };
  const decCounterProduct = () => {
    if (countProducts <= 1) return;
    setCountProducts(countProducts - 1);
    updateQty(countProducts - 1);
  };
  const incCounterProduct = () => {
    setCountProducts(countProducts + 1);
    updateQty(countProducts + 1);
  };

  if (!product.image || product.image === '#') product.image = categoryCard1;

  // ***************************************************
  const changeValueCounterProduct = (e) => {
    let value = Number(e.target.value);
    (value === 0) ? value = 1 : null;
    isNaN(value) ? value = countProducts : value;
    setCountProducts(value)
    updateQty(value);

  }

  // ***************************************************
  return (
    <motion.div
      initial={{
        x: 0,
        opacity: 1
      }}
      transition={{
        duration: .8
      }}
      animate={stateAction}
      className={style['wrapper']}

    >
      <div className={style['product__wrapper-block']}>
        <CheckBox
          checked={select}
          className={'product__selected_checkbox'}
          onClick={(e) => {
            const value = e.target.checked;
            select !== value ? setSelect(!select) : null
            if (value !== null && select !== value){
              setSelect(!select)
              updateProductFromCart({ 
                id: id,
                selected: value,
                qty: countProducts,
              });}
          }}
        />
        <Link
          to={url}
        >
          <img src={image} className={style['product__image_thumb']} />
        </Link>
        <div className={style['product__base_info']}>
          <div className={style['product__base_info__brand']}>{brand}</div>
          <div className={style['product__base_info__title']}>{title}</div>
          <div className={style['product__base_info__size']}>
            <Text text={'size'} />: {size}
          </div>
          <div className={style['product__base_info__color']}>
            <Text text={'color'} />: {color}
          </div>
          {condition && role !== ROLE.RETAIL ? (
            <div className={style['product__base_info__size']}>
              Условие покупки:
              <div className={style['product__base_info__size-black']}>
                {condition}
              </div>
            </div>
          ) : null}
        </div>
        <Button
          onClick={() => {

            setStateAction({
              x: [20, -200],
              opacity: 0
            })
            deleteProductFromCart(id)
          }}
          className={style['product__delete-mobile']}
          gxVariant={'text'}
          size="sm"
          circle
        >
          <GxIcon src={closeRed} className={style['product__delete-mobile_icon']} />
        </Button>
      </div>
      <div className={style['product__sales_info']}> 
        <div>
          {old_price !== '0.00' ? (
            <div className={style['product__sales_info-current_price-empty']}>{old_price}</div>
          ) : null}

          <div className={style['product__sales_info-current_price']}>
            {price} {currentCurrcensies}
          </div>
        </div>

        {/* {role === ROLE.RETAIL && old_price === '0.00' ? (    так было */}
        <div>
          {role === ROLE.RETAIL ? (
            <div className={style['product__sales_info-wrapper-column']}>
              <div className={style['product__sales_info-terms']}>
                При заказе от 3 ед.{' '}
                <span className={style['product__sales_info-new_price']}>5 %</span>
              </div>
              <div className={style['product__sales_info-terms']}>
                При заказе от 5 ед.{' '}
                <span className={style['product__sales_info-new_price']}>10 %</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className={style['product__count']}>
        <motion.div
          initial={{ backgroundColor: "#fff" }}
          transition={{ duration: .2 }}
          whileTap={{
            backgroundColor: "#000"
          }}
        >
          <Button onClick={decCounterProduct} variant={'counter-btn'} slot={'prefix'}>
            -
          </Button>
        </motion.div>
        <input type="text"
          autoFocus
          onFocus={e => e.currentTarget.select()}
          className={style['product__count-input']}
          value={countProducts}
          onChange={(e) => { changeValueCounterProduct(e) }} />
        <motion.div
          initial={{ backgroundColor: "#fff" }}
          transition={{ duration: .2 }}
          whileTap={{
            backgroundColor: "#000"
          }}
        >
          <Button onClick={incCounterProduct} variant={'counter-btn'} slot={'suffix'}>
            +
          </Button>
        </motion.div>
        {in_stock_count ? (
          <div className={style['product__count-text']}>Осталось: {in_stock_count} шт.</div>
        ) : null}
      </div>

      <div className={style['product__wrapper-block_right']}>
        <div className={style['product__current_currency']}>
          {total_price} {currentCurrcensies} <br />

        </div>
        <Button
          onClick={() => {
            setStateAction({
              x: [20, -200],
              opacity: [.8, .6, .4, .2, 0]
            })
            deleteProductFromCart(id)
          }
          }
          className={style['product__delete']}
          gxVariant={'text'}
        >
          <GxIcon slot={'icon-left'} src={closeJustIcon} />
        </Button>
      </div>
    </motion.div>
  );
};

export default React.memo(ProductHorizontalCard);

