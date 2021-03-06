import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStoreon } from 'storeon/react';
import { GxCol, GxRow, GxModal } from '@garpix/garpix-web-components-react';
import CartViews from '../../Views/CartViews';
import CheckBox from '../../Views/CheckBox';
import DefaultCartPreview from './DefaultCartPreview';
import Container from '../../Views/Container';
import ProductHorizontalCard from '../../Views/ProductHorizontalCard';
import ModalContentViews from '../../Views/ModalContentViews';
import ProductWhosaleHorizontalCard from '../../Views/ProductWhosaleHorizontalCard';
import ProductWhosaleIsPackHorizontalCard from '../../Views/ProductWhosaleHorizontalCard/ProductWhosaleIsPackHorizontalCard';
import ProductWhosaleInStockHorizontalCard from '../../Views/ProductWhosaleHorizontalCard/ProductWhosaleInStockHorizontalCard';
import classNames from 'classnames';
import api from '../../api';
import Text from '../../components/Text';
import Title from '../../Views/Title';
import { ROLE } from '../../const';
import styleModal from '../../Views/ModalCreator/modalCreator.module.scss';
import Button from '../../Views/Button';
import { cart } from '../../store';
import { initial } from 'lodash';

const apiCart = api.cartApi;
const initialCartData = {
  cartitem_set: [],
  delivery_price: 300,
  id: 14,
  in_cart: 4,
  in_stock: [],
  is_performed: true,
  selected: 4,
  total_discount: 692.45,
  total_price: '0',
};

const initialMassiveCart = {
  cartitem_set: [],
  is_pack: [],
  in_stock: [],
};

const serializeCardDataToFormValue = (data) => {
  let results = {};
  data.map((el) => {
    results[el.id] = {
      selected: el.selected,
      qty: el.qty,
      id: el.id,
    };
  });
  return results;
};
const serializeCardDataToFormValueWoosale = (data) => {
  let results = {};
  data.map((el) => {
    results[el.id] = {
      id: el.id,
      items: el.items,
      title: el.title,
    };
  });
  return results;
};
const Cart = ({ role, checkout_slug, page_type_catalog, site_configuration }) => {

  const { currenssies, dispatch } = useStoreon('currenssies'); //currenssies
  const { valueStock } = useStoreon('valueStock');
  const { cartAl } = useStoreon('cartAl');
  const { stateValuePoly } = useStoreon('stateValuePoly');
  // ******************************
  const [goodsStateDropAndRetail, setGoodsStateDropAndRetail] = useState({});
  const [goodsStateOpt, setGoodsStateOpt] = useState({});



  const [fullItemCartChecked, setFullItemCartChecked] = useState(false);
  const [agreeWitheRegulations, setAgreeWitheRegulations] = useState(true);
  const [cartData, setCartData] = useState(initialCartData);
  // const [selectElementInCartFromWhosale, setSelectElementInCartFromWhosale] = useState(initialCartData);
  const [values, setValue] = useState({});//???????????????????? ?? ???????????????????????????? ???????????????? ???????????? ?????????? + ?? -
  const [tooltipNoSelectedProductsOpen, setTooltipNoSelectedProductsOpen] = useState(false);
  const [modalStates, setmodalStates] = useState({
    show: false,
    callback: null,
  });
  // *****************************
  const currentCurrcensies = String(currenssies).toUpperCase();
  const rightSideWrapper = useRef(null);

  const setValuesDecoration = (res) => {
    if (role === ROLE.WHOLESALE) {
      setValue(serializeCardDataToFormValueWoosale(res.cartitem_set));
    } else {
      setValue(serializeCardDataToFormValue(res.cartitem_set));
    }
  };


  const closeModal = () => {
    setmodalStates({
      ...modalStates,
      callback: null,
      show: false,
    });
  };

  //***************************************************************** */
  const [stateClickBtn, setStateClickBtn] = useState(false)
  const getCartData = () => {
    dispatch('stateValuePoly', { stateCurrency: true })
    !stateClickBtn ? setStateClickBtn(true) : setStateClickBtn(false);
  };

  useEffect(() => {
    apiCart
      .getCartData()
      .then((res) => {
        /**================================================================================================================= */



        if (role === ROLE.WHOLESALE) {//???????? ??????
          //  console.log('work new massive opt', res)
          let goods = {
            collectiion: [],
            is_pack: [],
            in_stock: [],
            other_goods: []
          }
          // **********cartitem_set -> is_pack
          let resultsIs_pack = [];
          let finishResultIs_pack = [];


          Object.keys(res.cartitem_set).length ?
            (
              resultsIs_pack = res.cartitem_set.map(items => {
                let result = items.items.map(res => res.is_pack);// if res.is_pack ???? ???????????????? pack
                                                                 // if !res.is_pack ???? ???????????????? ?????? ?????????????????? ????????????????
                if (result[0])return items  
              })
              )
              : "null";
              
              Object.keys(resultsIs_pack).length ?
              finishResultIs_pack = resultsIs_pack.filter(el => el ? el.items : null)
              : null
              // **********cartitem_set -> Nois_pack

              let resultsNoIs_pack = [];
              let finishResultNoIs_pack = [];

              Object.keys(res.cartitem_set).length ?
                (
                  resultsNoIs_pack = res.cartitem_set.map(items => {
                    let result = items.items.map(res => !res.is_pack);// if res.is_pack ???? ???????????????? pack
                                                                    // if !res.is_pack ???? ???????????????? ?????? ?????????????????? ????????????????
                    if (result[0])return items  
                  })
                  )
                  : "null";
                  
                  Object.keys(resultsNoIs_pack).length ?
                  finishResultNoIs_pack = resultsNoIs_pack.filter(el => el ? el : null)
                  : null

                 // console.log('hhhhhhhhhhhhh' , finishResultNoIs_pack);
          // **********in_stock -> is_pack
          let resultsIn_stock = [];
          Object.keys(res.in_stock).length ?
            resultsIn_stock = res.in_stock.filter(items => items.is_pack)
            : null
          // **********result is_pack
          let goodsInPack = [];
          if(Object.keys(finishResultIs_pack).length && Object.keys(resultsIn_stock).length){
            goodsInPack = [...finishResultIs_pack[0].items, ...resultsIn_stock]
          }else if(Object.keys(finishResultIs_pack).length){
            goodsInPack = [...finishResultIs_pack[0].items]
          }else{
            (Object.keys(resultsIn_stock).length)?
            goodsInPack = [...resultsIn_stock]
            : null;
            }


            // goodsInPack=[]
          // **********in_stock
          let inStockNoInpack = [];
          Object.keys(res.in_stock).length ?
            inStockNoInpack = res.in_stock.filter(el => !el.is_pack)
            : null
          // **********
          // **********collection ????????
          let collectionGoods = [];


          goods = {
            collectiion: collectionGoods,
            is_pack: goodsInPack,
            in_stock: inStockNoInpack,
            other_goods: finishResultNoIs_pack //res.cartitem_set
          }
          setGoodsStateOpt(goods)

        } else {//???????? ????????/??????????????
          let goods = {
            other_goods: [],
            in_stock: [],
          }
          let goodsInStock = [];
          let goodsOther = []
          res.in_stock.length > 0
            ? goodsInStock.push(res.in_stock)
            : res.cartitem_set
              ? goodsOther = res.cartitem_set.filter(item => item)
              : null
          goods = {
            other_goods: goodsOther,
            in_stock: goodsInStock,
          }
          setGoodsStateDropAndRetail(goods);

        }





        /**================================================================================================================= */




        setCartData(res);
        newMassiveProducts(res)
        setValuesDecoration(res);
        dispatch('stateValuePoly', { stateCurrency: false })
        dispatch('cartAl/add', res);
      });
  }, [stateValuePoly.stateCurrency, stateClickBtn])


























  const [massiveCart, setMassiveCart] = useState(initialMassiveCart);

  // ******************************************************************************************************
  // ?????????????? ???????????????? ???????????? ?????????????? ?? ???????????????? ?? ?????????????? 
  /**
   * ?????????? ?????????????????? ???? ???????? ?????????????????? ??????????
   * ?????????? ?????????????????? ???? ?????????? ?????????????????? ????????????
   */
  const newMassiveProducts = (produc) => {
    //console.log('product',produc)
    const newCartDataCartitem_set = [];
    const newCartDataIn_stock = [];
    let newIs_pack = [];
    produc.cartitem_set.filter(items => {

      items.is_pack ? newIs_pack.push(items.items) : newCartDataCartitem_set.push(items);

    })

    produc.in_stock.filter(items => {
      newCartDataIn_stock.push(items)
    })

    return setMassiveCart({
      cartitem_set: newCartDataCartitem_set,
      is_pack: newIs_pack,
      in_stock: newCartDataIn_stock,
    });
  };
  // ******************************************************************************************************
  const deleteProductFromCart = (id) => {
    apiCart
      .deleteCartData({
        item_id: id,
      })
      .then((res) => {
        // getCartData();
        updateProductFromCart()
      })
      .catch((err) => {
        console.log("err deleteProductFromCart", err);
      });
  };

  const getEnabledCartItems = (items) => {
    let result = [];
    items.forEach((el) => {
      if (el.selected) result.push(el);
    });
    return result;
  };

  const multipleDeleteFromCart = () => {
    let selectedCartItem;
    // ?????????????? ?????? ???????????? ????????????????
    if (role === ROLE.WHOLESALE) {
      const allCartItems = getAllCartItemsFromWhoasale(cartData.cartitem_set, cartData.in_stock);
      selectedCartItem = getEnabledCartItems(allCartItems);
    } else {
      selectedCartItem = getEnabledCartItems(cartData.cartitem_set);
    }
    if (!selectedCartItem.length) {
      return setTooltipNoSelectedProductsOpen(true);
    }
    confirmDeleteCartItem(() => {
      console.log('selectedCartItem',selectedCartItem)
      apiCart
        .multipleDeleteFromCart({ items: selectedCartItem })
        .then((res) => {
          //viewCartCountOrder('desc', selectedCartItem)
          getCartData();
          closeModal();
        })
        .catch((err) => {
          closeModal();
          console.log('reject error', err);
        });
    });
  };

  const confirmDeleteCartItem = (callback) => {
    setmodalStates({
      ...modalStates,
      show: true,
      callback: callback,
    });
  };

  // ?????? ?????????????? + ?????? - ?? ?????????????? ???????????????????? ???????????????????? ?????? ???????????????? ????????????
  const updateProductFromCart = (data = []) => {
    //?????????????????? ?????????????????? ?????????????? ???? ?????????????? ?? ?? ?????????????????? 
    apiCart
      .updateCartData([...data])
      .then((res) => {
        getCartData();
      })
      .catch((err) => {
        console.error('ERROR ?????????????????? ?????????????????? ?????????????? ???? ?????????????? ?? ?? ??????????????????');
      });
  };

  //???????????? ???????????????????? ???????????????????? ?????????????? " ???????????????? -> ???????????????? ??????????????"
  const contextUpdateProductFromCard = (data) => {
    updateProductFromCart([data]);
    setTooltipNoSelectedProductsOpen(false);
  };

  const setFullValuesChe??ked = (data, isChecked) => {
    const result = [];
    if (Array.isArray(data)) {
      for (const key in data) {
        const element = data[key];
        result.push({
          selected: isChecked,
          qty: element.qty,
          id: element.id,
        });
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        result.push({
          selected: isChecked,
          qty: element.qty,
          id: element.id,
        });
      }
    }

    return result;
  };

  const checkFullSelectedElements = (data) => {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (!element.selected) return false;
      }
    } else {
      for (const key in data) {
        const element = data[key];
        if (!element.selected) return false;
      }
    }
    return true;
  };

  const getAllCartItemsFromWhoasale = (cartitem_set = [], in_stock = []) => {
    let results = [...in_stock];
    for (let i = 0; i < cartitem_set.length; i++) {
      const element = cartitem_set[i];
      results.push(...element.items);
    }
    return results;
  };

  //!onCange for select all checkbox
  const changeSelectedFilter = useCallback((e) => {
    let checked;
    if (ROLE.WHOLESALE === role) {
      
      const allCartItems = getAllCartItemsFromWhoasale(cartData.cartitem_set, cartData.in_stock);
      checked = checkFullSelectedElements(allCartItems);
    } else {
      checked = checkFullSelectedElements(values);
    }
    console.log('useCallback',checked);
    apiCart
      .selectOrUnSelectAllItemCart(!checked)
      .then((res) => {
        setFullItemCartChecked(!checked);
        getCartData();
        setTooltipNoSelectedProductsOpen(false);
      });
  },[checkout_slug]);

  useEffect(() => {
    getCartData();

  }, [checkout_slug]);//checkout_slug=order

  if (!massiveCart.cartitem_set.length && !massiveCart.is_pack.length && !massiveCart.in_stock.length) {
    return <DefaultCartPreview page_type_catalog={page_type_catalog} />;
  }

  /********************************************************************** */

  let testArr = massiveCart.cartitem_set.find(el => el.title === "Lara")
  // console.log('massiveCart.cartitem_set',testArr);



  return (
    <Container>
      <GxModal
        onGx-after-hide={closeModal}
        open={modalStates.show}
        className={classNames({
          [styleModal['modal_creator']]: true,
          [styleModal['modal-confirm_delete']]: true,
        })}
      >
        <ModalContentViews.ModalWrapper customClassName={'modal-midle_wrap'}>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.HeaderBlock mb={'5px'} title={'???????????????? ??????????????'} />
          <ModalContentViews.Line />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.ContentBlock>
              <ModalContentViews.SubText>
                ???? ?????????? ???????????? ?????????????? ?????????????????? ????????????? ???????????????? ???????????????? ?????????? ????????????????????
              </ModalContentViews.SubText>
            </ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <Button onClick={modalStates.callback} variant={'cabinet_default'}>
                ??????????????
              </Button>
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      </GxModal>

      <GxRow>
        <GxCol sizeLg={12} sizeMd={12} sizeSm={12} sizeXl={9} sizeXs={12} className="cart__left">
          <Title variant={'cart'} type={'h1'}>
            <Text text={'shopping.cart'} />: ({
              //****************************************************************************** */
              // ?????????? ???????????????????? ???????????????????? ?? ???????????????? ?????????? ???????????????????? ????????????
              // cartData.cartitem_set.length || cartData.in_stock.length
              // ?cartData.cartitem_set.length + cartData.in_stock.length
              // :0})
              cartData.in_cart})
          </Title>
          <CartViews.SelectedFilter
            checked={fullItemCartChecked}
            changeSelectedFilter={changeSelectedFilter}
            multipleDeleteFromCart={multipleDeleteFromCart}
            tooltipOpen={tooltipNoSelectedProductsOpen}
          />
          <CartViews.WrapperCards>


            {/* ************************************************************************************************ */}


            {/* massiveCart.cartitem_set.map((el, i) => {
                    ???????????????? ???????????? ?? ?????????????? ?????? ???????? */}

            {(role === ROLE.WHOLESALE) ?

              (<>
                {Object.keys(goodsStateOpt.other_goods).length ?
                  goodsStateOpt.other_goods.map((el, i) => {
                    const isVisibleLine = goodsStateOpt.other_goods.length - 1 !== i;
                    // console.log('cart role user WHOLESALE: 3=', role);     
                    return (
                      <ProductWhosaleHorizontalCard
                        key={el.id}
                        {...el}
                        currentCurrcensies={currentCurrcensies}
                        isVisibleLine={isVisibleLine}
                        deleteProductFromCart={deleteProductFromCart}
                        updateProductFromCart={contextUpdateProductFromCard}
                      />
                    );
                  })
                  : null}

                {Object.keys(goodsStateOpt.is_pack).length ?
                  <ProductWhosaleIsPackHorizontalCard
                    currentCurrcensies={currentCurrcensies}
                    deleteProductFromCart={deleteProductFromCart}
                    updateProductFromCart={contextUpdateProductFromCard}
                    items={goodsStateOpt.is_pack}
                    is_pack={true}
                  />
                  : null}

                {Object.keys(goodsStateOpt.in_stock).length ?
                  <ProductWhosaleInStockHorizontalCard
                    currentCurrcensies={currentCurrcensies}
                    deleteProductFromCart={deleteProductFromCart}
                    updateProductFromCart={contextUpdateProductFromCard}
                    items={goodsStateOpt.in_stock}
                  />
                  : null}
              </>)

              : (role === ROLE.DROPSHIPPER || role === ROLE.RETAIL) ?//???????? ????????
                // ???????????????? ???????????? ?? ?????????????? ?????? ?????????? ?? ??????????????
                goodsStateDropAndRetail.other_goods ?
                  goodsStateDropAndRetail.other_goods.map(el => {
                    return (
                      <ProductHorizontalCard
                        key={el.id}
                        {...el}
                        role={role}
                        currentCurrcensies={currentCurrcensies}
                        values={values[el.id]}
                        deleteProductFromCart={deleteProductFromCart}
                        updateProductFromCart={contextUpdateProductFromCard}
                      />
                    )
                  })
                  : goodsStateDropAndRetail.in_stock ?
                    goodsStateDropAndRetail.in_stock.map(el => {
                      return (
                        <ProductHorizontalCard
                          key={el.id}
                          {...el}
                          role={role}
                          currentCurrcensies={currentCurrcensies}
                          values={values[el.id]}
                          deleteProductFromCart={deleteProductFromCart}
                          updateProductFromCart={contextUpdateProductFromCard}
                        />
                      )
                    })
                    : null
                : null
            }

          </CartViews.WrapperCards>
        </GxCol>

        <GxCol
          ref={rightSideWrapper}
          sizeLg={12}
          sizeMd={12}
          sizeSm={12}
          sizeXl={3}
          sizeXs={12}
          className="cart__right"
        >
          <CartViews.WrapperRightSide>
            <CartViews.BlockRightSide mb={20}>
              <CartViews.Text type={'text-title'}>
                <Text text={'you.order'} />
              </CartViews.Text>
              <CartViews.Text type={'text-sub'}>
                {cartData.selected} <Text text={'product.s'} />
              </CartViews.Text>
            </CartViews.BlockRightSide>
            <CartViews.BlockRightSide>
              <CartViews.Text type={'text-default'}>
                <Text text={'order.cost'} />
              </CartViews.Text>
              <CartViews.Text type={'text-default_currency'}>
                {cartData.total_price ?? 0} {currentCurrcensies}
              </CartViews.Text>
            </CartViews.BlockRightSide>
            {ROLE.RETAIL === role ? (
              <div>
                <CartViews.BlockRightSide>
                  <CartViews.Text type={'text-default'}>
                    <Text text={'sale'} />
                  </CartViews.Text>

                  <CartViews.Text type={'text-red'}>
                    {cartData.total_discount} {currentCurrcensies}
                  </CartViews.Text>
                </CartViews.BlockRightSide>

                <CartViews.BlockRightSide>
                  <CartViews.Text type={'text-default'}>
                    <Text text={'shipping'} />
                  </CartViews.Text>
                  <CartViews.Text type={'text-default_currency'}>
                    {cartData.delivery_price} {currentCurrcensies}
                  </CartViews.Text>
                </CartViews.BlockRightSide>
              </div>


            ) : null}

            <CartViews.Line />
            <CartViews.BlockRightSide mb={20}>
              <CartViews.Text type={'text-title'}>
                <Text text={'total.payable'} />:
              </CartViews.Text>
              <CartViews.Text type={'text-title'}>
                {cartData.total_price ?? 0} {currentCurrcensies}
              </CartViews.Text>
            </CartViews.BlockRightSide>

            <CartViews.LinkToFirmalization
              enabled={agreeWitheRegulations && cartData.is_performed}
              to={checkout_slug}
            >
              <Text text={'go.to.registration'} />
            </CartViews.LinkToFirmalization>

            <CartViews.BlockRightSide mt={20} mb={20} fd={'column'}>
              <CheckBox
                variant={'informations_block'}
                checked={agreeWitheRegulations}
                onGx-change={(e) => {
                  const checked = e.target.checked;
                  if (checked === null) return;
                  setAgreeWitheRegulations(checked);
                }}
                label={
                  <CartViews.Text type={'text-label'}>
                    ???????????????? ??{' '}
                    <a target="_blank" href={site_configuration.order_condition}>
                      ?????????????????? ???????????????????? ????????????{' '}
                    </a>
                    ???? ???????????????? ????????????-?????????????????? ?? ??{' '}
                    <a target="_blank" href={site_configuration.return_rules}>
                      ?????????????????? ????????????????
                    </a>
                  </CartViews.Text>
                }
              />
            </CartViews.BlockRightSide>

          </CartViews.WrapperRightSide>
        </GxCol>
      </GxRow>
    </Container>
  );
};

export default React.memo(Cart);




// {massiveCart.cartitem_set.map((el, i) => {
//   // ???????????????? ???????????? ?? ?????????????? ?????? ????????
//   if (role === ROLE.WHOLESALE) {
//     const isVisibleLine = massiveCart.cartitem_set.length - 1 !== i;
//         // console.log('cart role user WHOLESALE: 3=', role);     
//         return (
//           <ProductWhosaleHorizontalCard
//             key={el.id}
//             {...el}
//             currentCurrcensies={currentCurrcensies}
//              isVisibleLine={isVisibleLine}
//             deleteProductFromCart={deleteProductFromCart}
//             updateProductFromCart={contextUpdateProductFromCard}
//           />
//         );
//   } else {
//             // 
//         // console.log('cart role user RETAIL: 1,DROPSHIPPER: 2 =', role);
//         // console.log(`amount cart product ${i}`);
//           return (
//           // ???????????????? ???????????? ?? ?????????????? ?????? ?????????? ?? ??????????????
//             <ProductHorizontalCard
//               key={el.id}
//               {...el}
//               role={role}
//               currentCurrcensies={currentCurrcensies}
//               values={values[el.id]}
//               deleteProductFromCart={deleteProductFromCart}
//               updateProductFromCart={contextUpdateProductFromCard}

//             />
//           );

//     }


//     { massiveCart.is_pack.map((el, i) => {
//     const isVisibleLine = massiveCart.is_pack.length - 1 !== i;

//       if (ROLE.WHOLESALE === role && massiveCart.is_pack.length){ 
//         // console.log('massiveCart.is_pack-1');
//       return (
//       <ProductWhosaleIsPackHorizontalCard
//         currentCurrcensies={currentCurrcensies}
//         deleteProductFromCart={deleteProductFromCart}
//         updateProductFromCart={contextUpdateProductFromCard}
//         items={massiveCart.is_pack}
//         is_pack={true}
//       />
//       )
//       } 
//       // else {
//       //   console.log('massiveCart.is_pack-2');
//       //   return (
//       //     // ???????????????? ???????????? ?? ?????????????? ?????? ?????????? ?? ??????????????
//       //       <ProductHorizontalCard
//       //         key={el.id}
//       //         {...el}
//       //         role={role}
//       //         currentCurrcensies={currentCurrcensies}
//       //         values={values[el.id]}
//       //         deleteProductFromCart={deleteProductFromCart}
//       //         updateProductFromCart={contextUpdateProductFromCard}
//       //       />
//       //     );

//       //   }

//       })}

//     })}

//     {/* ???????????? ???????????????? ???????????? ???????? ?????? ?? ?? ?????????????? */}
//     {(ROLE.WHOLESALE === role && massiveCart.in_stock.length)?
//           <>
//           <CartViews.Line />
//           <CartViews.Text type={'text-brand'}>???????????? ?? ??????????????</CartViews.Text>
//           </>
//     :null
//     }
//     {
//     (ROLE.WHOLESALE === role && massiveCart.in_stock.length)?

//     massiveCart.in_stock.map((el, i) => {
//       const isVisibleLine = massiveCart.in_stock.length - 1 !== i;
//       // console.log('massiveCart.in_stock',massiveCart.in_stock)
//       return (
//           <ProductWhosaleInStockHorizontalCard
//             currentCurrcensies={currentCurrcensies}
//             deleteProductFromCart={deleteProductFromCart}
//             updateProductFromCart={contextUpdateProductFromCard}
//             el={el}
//           />
//       )
//     })
//     :null

// }