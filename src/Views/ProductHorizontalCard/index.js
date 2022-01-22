import React, { useState, useEffect } from 'react';
import CheckBox from '../CheckBox';
import Text from '../../components/Text';
import Button from '../Button';
import { GxIcon, GxInput, GxForm } from '@garpix/garpix-web-components-react';
import { categoryCard1, change, closeJustIcon, closeRed } from '../../images';
import { ROLE } from '../../const';
import style from './styles/index.module.scss';
import { Link } from 'react-router-dom';

const defaultProductData = {
  brand: 'brand',
  color: 'color',
  id: 'id',
  in_stock_count: 'in_stock_count',
  size: 'size',
  title: 'title',
};

const ProductHorizontalCard = ({
  values = {},
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

  }) => {

  const { brand, color, id: productId, in_stock_count, size, title, image } = product;
  

  
  const [countProducts, setCountProducts]                     = useState(qty)
  const updateQty = (qty) => {
    updateProductFromCart({
      id: id,
      selected: values.selected,
      qty: qty,
      //oldQty: counterProduct,
      oldQty: countProducts,
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
  useEffect(() => {
    setCountProducts(values.qty);
  }, [values]);

  if (!product.image || product.image === '#') product.image = categoryCard1;
  
  // ***************************************************
  const changeValueCounterProduct = (e) => {
    let value = Number(e.target.value);
    (value===0)?value=1:null;
    isNaN(value)?value=countProducts:value;
    setCountProducts(value)
    updateQty(value);
  
}


// ***************************************************
  return (
    <div className={style['wrapper']}>
      <div className={style['product__wrapper-block']}>
        <CheckBox
          checked={values.selected}
          className={'product__selected_checkbox'}
          onClick={(e) => {
            const value = e.target.checked;
            if (value !== null && values.selected !== value)
              updateProductFromCart({
                id: id,
                selected: value,
                qty: values.qty,
                // oldQty: counterProduct,
              });
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
              <span className={style['product__base_info__size-black']}>
                &nbsp;
                {condition}
              </span>
            </div>
          ) : null}
        </div>
        <Button
          onClick={() => deleteProductFromCart(id)}
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
            <Button onClick={decCounterProduct} variant={'counter-btn'} slot={'prefix'}>
              -
            </Button>
          <input type="text" 
          autoFocus
          onFocus={e => e.currentTarget.select()}
          className={style['product__count-input']} 
          value={countProducts} 
          onChange={(e)=>{changeValueCounterProduct(e)}}/>
            <Button onClick={incCounterProduct} variant={'counter-btn'} slot={'suffix'}>
              +
            </Button>

        {in_stock_count ? (
          <div className={style['product__count-text']}>Осталось: {in_stock_count} шт.</div>
        ) : null}
      </div>

      <div className={style['product__wrapper-block_right']}>
        <div className={style['product__current_currency']}>
          {total_price} {currentCurrcensies} <br />
          
        </div>
        <Button
          onClick={() => deleteProductFromCart(id)}
          className={style['product__delete']}
          gxVariant={'text'}
        >
          <GxIcon slot={'icon-left'} src={closeJustIcon} />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ProductHorizontalCard);


// return (
//   <div className={style['wrapper']}>
//     <div className={style['product__wrapper-block']}>
//       <CheckBox
//         checked={values.selected}
//         className={'product__selected_checkbox'}
//         onClick={(e) => {
//           const value = e.target.checked;
//           if (value !== null && values.selected !== value)
//             updateProductFromCart({
//               id: id,
//               selected: value,
//               qty: values.qty,
//               oldQty: counterProduct,
//             });
//         }}
//       />
//       <img src={product.image} className={style['product__image_thumb']} />
//       <div className={style['product__base_info']}>
//         <div className={style['product__base_info__brand']}>{brand}</div>
//         <div className={style['product__base_info__title']}>{title}</div>
//         <div className={style['product__base_info__size']}>
//           <Text text={'size'} />: {size}
//         </div>
//         <div className={style['product__base_info__color']}>
//           <Text text={'color'} />: {color}
//         </div>
//         {condition && role !== ROLE.RETAIL ? (
//           <div className={style['product__base_info__size']}>
//             Условие покупки:
//             <span className={style['product__base_info__size-black']}>
//               &nbsp;
//               {condition}
//             </span>
//           </div>
//         ) : null}
//       </div>
//       <Button
//         onClick={() => deleteProductFromCart(id)}
//         className={style['product__delete-mobile']}
//         gxVariant={'text'}
//         size="sm"
//         circle
//       >
//         <GxIcon src={closeRed} className={style['product__delete-mobile_icon']} />
//       </Button>
//     </div>
//     <div className={style['product__sales_info']}>
//       <div className={style['product__sales_info-current_price']}>
//         {price} {currentCurrcensies}
//       </div>
//       {/* {role === ROLE.RETAIL && old_price === '0.00' ? (    так было */}
//         {role === ROLE.RETAIL ? (
//         <div className={style['product__sales_info-wrapper-column']}>
//           <div className={style['product__sales_info-terms']}>
//             При заказе от 3 ед.{' '}
//             <span className={style['product__sales_info-new_price']}>5 %</span>
//           </div>
//           <div className={style['product__sales_info-terms']}>
//             При заказе от 5 ед.{' '}
//             <span className={style['product__sales_info-new_price']}>10 %</span>
//           </div>
//         </div>
//       ) : null}
//     </div>
//     {/* <div>
//       <input }/>
//     </div> */}
//     <div className={style['product__count']}>
//           <Button onClick={decCounterProduct} variant={'counter-btn'} slot={'prefix'}>
//             -
//           </Button>
//         <input type="text" className={style['product__count-input']} value={countProducts} onChange={(e)=>{changeValueCounterProduct(e)}}/>
//           <Button onClick={incCounterProduct} variant={'counter-btn'} slot={'suffix'}>
//             +
//           </Button>
//         {/* </input> */}
//       {in_stock_count ? (
//         <div className={style['product__count-text']}>Осталось: {in_stock_count} шт.</div>
//       ) : null}
//     </div>
//     <div className={style['product__wrapper-block_right']}>
//       <div className={style['product__current_currency']}>
//         {total_price} {currentCurrcensies} <br />
//         {old_price !== '0.00' ? (
//           <div className={style['product__sales_info-current_price-empty']}>{old_price}</div>
//         ) : null}
//       </div>
//       <Button
//         onClick={() => deleteProductFromCart(id)}
//         className={style['product__delete']}
//         gxVariant={'text'}
//       >
//         <GxIcon slot={'icon-left'} src={closeJustIcon} />
//       </Button>
//     </div>
//   </div>
// );