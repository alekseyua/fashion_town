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
  const { stateValuePoly } = useStoreon('stateValuePoly');
  const { stateCountCart } = useStoreon('stateCountCart');
  const { stateCountRestart } = useStoreon('stateCountRestart');

  // ******************************
  const [goodsStateDropAndRetail, setGoodsStateDropAndRetail] = useState({});
  const [goodsStateOpt, setGoodsStateOpt] = useState({});
  const [in_cart, setIn_cart] = useState();
  const [is_performed, setIs_performed] = useState();
  const [total_price, setTotal_price] = useState();
  const [delivery_price, setDelivery_price] = useState();
  const [total_discount, setTotal_discount] = useState();
  const [selected, setSelected] = useState();
  const [getCart, setGetCart] = useState(stateCountCart);
  const [oneClick, setOneClick] = useState(false);
  // const [] = useState();
  // const [] = useState();
  // const [] = useState();
  // const [] = useState();
  // const [] = useState();

  const [fullItemCartChecked, setFullItemCartChecked] = useState(false);
  const [fullItemCartCheckedState, setFullItemCartCheckedState] = useState(false);
  const [agreeWitheRegulations, setAgreeWitheRegulations] = useState(true);
  const [cartData, setCartData] = useState(initialCartData);
  // const [selectElementInCartFromWhosale, setSelectElementInCartFromWhosale] = useState(initialCartData);
  const [values, setValue] = useState({});//количество в горизонтальной карточке товара между + и -
  const [tooltipNoSelectedProductsOpen, setTooltipNoSelectedProductsOpen] = useState(false);
  const [modalStates, setmodalStates] = useState({
    show: false,
    callback: null,
  });
  const currentCurrcensies = String(currenssies).toUpperCase();
  const rightSideWrapper = useRef(null);
  const [stateClickBtn, setStateClickBtn] = useState(false)

  // *****************************

  useEffect(() => {
    setIn_cart(stateCountCart.in_cart)
  }, [stateCountCart.in_cart])
  useEffect(() => {
    // console.log('status is_performed', stateCountCart.is_performed);
    setIs_performed(stateCountCart.is_performed)
  }, [stateCountCart.is_performed])
  useEffect(() => {
    setTotal_price(stateCountCart.total_price)
  }, [stateCountCart.total_price])
  useEffect(() => {
    setDelivery_price(stateCountCart.delivery_price)
  }, [stateCountCart.delivery_price])
  useEffect(() => {
    setTotal_discount(stateCountCart.total_discount)
  }, [stateCountCart.total_discount])
  useEffect(() => {
    setSelected(stateCountCart.selected)
  }, [stateCountCart.selected])
  useEffect(() => {
    console.log('запрос при старте или при изминениях состояния stateCountCart');
    setGetCart(stateCountCart)
    setIs_performed(stateCountCart.is_performed)
  }, [stateCountCart])

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

  useEffect(() => {
    // if (getCart.in_cart > 0) {
      console.log('--------------фильтрация карточек если доступна карзина--------------')
      if (role === ROLE.WHOLESALE) {//если опт
        setIs_performed(getCart.is_performed)
        let goods = {
          collectiion: [],
          is_pack: [],
          in_stock: [],
          other_goods: []
        }
        // **********cartitem_set -> is_pack
        let resultsIs_pack = [];
        let finishResultIs_pack = [];
        Object.keys(getCart.cartitem_set).length ?
          (resultsIs_pack = getCart.cartitem_set.map(items => {
            let result = items.items.map(res => res.is_pack);// if res.is_pack то получаем pack

            // if !res.is_pack то получаем все остальные значение
            if (result[0]) return items
          })
          ) : "null";

        Object.keys(resultsIs_pack).length ?
          finishResultIs_pack = resultsIs_pack.filter(el => el ? el.items : null)
          : null
        //длелаем чтобы выделяло элементы нужно сделать условие GOOD!!!
        Object.keys(finishResultIs_pack).length && fullItemCartCheckedState ?
          finishResultIs_pack = finishResultIs_pack.map(res => {
            let items = res.items.map(el => ({ ...el, selected: fullItemCartChecked }))
            setFullItemCartCheckedState(false)
            return { ...res, items }
          }) : null
        // -----------------------------------------------

        // **********cartitem_set -> Nois_pack

        let resultsNoIs_pack = [];
        let finishResultNoIs_pack = [];
        Object.keys(getCart.cartitem_set).length ?
          (resultsNoIs_pack = getCart.cartitem_set.map(items => {
            let result = items.items.map(res => !res.is_pack);// if res.is_pack то получаем pack
            // if !res.is_pack то получаем все остальные значение
            if (result[0]) return items
          })
          ) : "null";

        // ???????????? под вопросом может не работать как надо нужно проследить
        Object.keys(resultsNoIs_pack).length ?
          finishResultNoIs_pack = resultsNoIs_pack.filter(el => el ? el : null)
          : null

        //длелаем чтобы выделяло элементы нужно сделать условие GOOD!!!
        Object.keys(resultsNoIs_pack).length && fullItemCartCheckedState ?
          finishResultNoIs_pack = finishResultNoIs_pack.map(res => {
            let items = res.items.map(el => ({ ...el, selected: fullItemCartChecked }))
            setFullItemCartCheckedState(false)
            return { ...res, items }
          }) : null
        // ----------------------------------------------
        // **********in_stock -> is_pack
        let resultsIn_stock = [];
        Object.keys(getCart.in_stock).length ?
          resultsIn_stock = getCart.in_stock.filter(items => items.is_pack)
          : null

        //длелаем чтобы выделяло элементы нужно сделать условие GOOD!!!
        Object.keys(getCart.in_stock).length && fullItemCartCheckedState ?
          resultsIn_stock = resultsIn_stock.map(el => ({ ...el, selected: fullItemCartChecked }))
          : null
        // ----------------------------------------------

        // **********result is_pack
        let goodsInPack = [];
        if (Object.keys(finishResultIs_pack).length && Object.keys(resultsIn_stock).length) {
          goodsInPack = [...finishResultIs_pack[0].items, ...resultsIn_stock]
        } else if (Object.keys(finishResultIs_pack).length) {
          goodsInPack = [...finishResultIs_pack[0].items]
        } else {
          (Object.keys(resultsIn_stock).length) ?
            goodsInPack = [...resultsIn_stock]
            : null;
        }

        // **********in_stock -> no_is_pack
        let inStockNoInpack = [];
        Object.keys(getCart.in_stock).length ?
          inStockNoInpack = getCart.in_stock.filter(el => !el.is_pack)
          : null
        //длелаем чтобы выделяло элементы нужно сделать условие GOOD!!!

        Object.keys(getCart.in_stock).length && fullItemCartCheckedState ?
          inStockNoInpack = inStockNoInpack.map(el => ({ ...el, selected: fullItemCartChecked }))
          : null
        // ----------------------------------------------
        // console.log('inStockNoInpack',inStockNoInpack);

        // **********collection ????????
        let collectionGoods = [];
        goods = {
          collectiion: collectionGoods,
          is_pack: goodsInPack,
          in_stock: inStockNoInpack,
          other_goods: finishResultNoIs_pack //res.cartitem_set
        }

        setGoodsStateOpt(goods)
        // проверяем наличее чеков у всех карточек, создаём новый массив и отправляем запрос на бэк
        if (fullItemCartCheckedState) {
          let updateProduct = []
          let updateProduct1 = []
          let updateProduct2 = []
          let updateProduct3 = []
          let allArr1 = []
          let allArr2 = []
          let allArr3 = []
          let allArr4 = []

          //собираем в массив все элементы cartitem_set NoIs_pack
          updateProduct = finishResultNoIs_pack.map(items => {
            let res = items.items.filter(el => el)
            return res
          })
          updateProduct1 = updateProduct.filter(el => el.length)
          for (let i = 0; i < updateProduct1.length; i++) {
            allArr1 = [...allArr1, ...updateProduct1[i]]
          }
          //собираем в массив все элементы cartitem_set Is_pack
          finishResultIs_pack
          updateProduct2 = finishResultIs_pack.map(items => {
            let res = items.items.filter(el => el)
            return res
          })
          updateProduct3 = updateProduct2.filter(el => el.length)
          for (let i = 0; i < updateProduct3.length; i++) {
            allArr2 = [...allArr2, ...updateProduct3[i]]
          }

          //собираем в массив все элементы in_stock -> is_pack
          allArr3 = resultsIn_stock.filter(el => el)

          //собираем в массив все элементы in_stock -> no_is_pack
          allArr4 = inStockNoInpack.filter(el => el)


          // console.log('updateProduct',updateProduct4);


          let updateProductAllArr = [...allArr1, ...allArr2, ...allArr3, ...allArr4]
          updateProductAllArr = updateProductAllArr.map(el=>({ id: el.id, selected : el.selected }))
          updateProductFromCart(updateProductAllArr)
        }


      } else {//если дроп/розница
        let goods = {
          other_goods: [],
          in_stock: [],
        }
        let goodsInStock = [];
        let goodsOther = []
        getCart.in_stock.length > 0
          ? goodsInStock.push(getCart.in_stock)
          : getCart.cartitem_set
            ? goodsOther = getCart.cartitem_set.filter(item => item)
            : null

        fullItemCartCheckedState ?
          console.log('делаем для дропа и розницы выделение checkbox')
          : null
        goods = {
          other_goods: goodsOther,
          in_stock: goodsInStock,
        }
        setGoodsStateDropAndRetail(goods);
      }
      /**================================================================================================================= */
      setCartData(getCart);
      newMassiveProducts(getCart)
    // }
  }, [getCart, fullItemCartChecked])

  const [massiveCart, setMassiveCart] = useState(initialMassiveCart);

  // ******************************************************************************************************
  // функция создания нового массива с товарами в карзине 
  /**
   * нужно проверить во всех возможных ролях
   * нужно проверить со всеми условиями выкупа
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
  // **********готово*********************************************************************************
  const deleteProductFromCart = (id) => {
    apiCart
      .deleteCartData({
        item_id: id,
      })
      .then((res) => {
     dispatch('stateCountRestart/add', !stateCountRestart) ///???????????????
       // updateProductFromCart() нельзя циклится
      })
      .catch((err) => {
        console.log("err deleteProductFromCart", err);
      });
  };

  // создание нового массива с єлементами которые выбраны для удаления
  // ***********`работает `*****************************/
  const getAllCartItemsFromWhoasale = (cartitem_set = [], in_stock = []) => {
    let results = [...in_stock];
    for (let i = 0; i < cartitem_set.length; i++) {
      const element = cartitem_set[i];
      results.push(...element.items);
    }
    return results;
  };
  const getEnabledCartItems = (items) => {
    let result = [];
    items.forEach((el) => {
      if (el.selected) result.push(el);
    });
    return result;
  };
  const multipleDeleteFromCart = () => {
    setOneClick(!oneClick)
    setTimeout(() => {
      setOneClick(false)
    }, 3000);
    let selectedCartItem;
    // условие для мульти удаления
    if (role === ROLE.WHOLESALE) {
      const allCartItems = getAllCartItemsFromWhoasale(getCart.cartitem_set, getCart.in_stock);
      selectedCartItem = getEnabledCartItems(allCartItems);
    } else {
      selectedCartItem = getEnabledCartItems(getCart.cartitem_set);
    }
    if (!selectedCartItem.length) {
      return setTooltipNoSelectedProductsOpen(true);
    }
    confirmDeleteCartItem(() => {
      apiCart
        .multipleDeleteFromCart({ items: selectedCartItem })
        .then((res) => {
          dispatch('stateCountRestart/add', !stateCountRestart)
          closeModal();
            setOneClick(false)
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
  // **********************************************************/

  // при нажатии + или - в корзине происходит добавление или удаление товара
  // ДОДЕЛАТЬ << is_performed >>
  const updateProductFromCart = (data = []) => {
    console.log('data=====', data);
    //заганяем данные локальное хранилище
    data[0].qty ? (
      dispatch('stateCountCart/add', {
        ...stateCountCart,
        in_cart: (stateCountCart.in_cart - data[0].oldQty + data[0].qty)
      })
    ) : null
    // обнавляем состояние карзины на сервере и в хранилище если обшибка допилить выдать попап и обновлять карзину
    apiCart
      .updateCartData([...data])
      .then((res) => {
        console.log('gggg', res);
    setIs_performed(res.is_performed)

        dispatch('stateCountCart/add', {
          ...stateCountCart,
          ...res
        })
      })
      .catch((err) => {
        console.error('ERROR обнавляем состояние карзины на сервере и в хранилище');
      });
  };

  //фунция обновления количества товараа " вкорзине -> карточке тоавара"
  const contextUpdateProductFromCard = (data) => {
    updateProductFromCart([data]);
    setTooltipNoSelectedProductsOpen(false);
  };

  const setFullValuesCheсked = (data, isChecked) => {
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

  if (!massiveCart.cartitem_set.length && !massiveCart.is_pack.length && !massiveCart.in_stock.length) {
    return <DefaultCartPreview page_type_catalog={page_type_catalog} />;
  }

  /********************************************************************** */

  let testArr = massiveCart.cartitem_set.find(el => el.title === "Lara")
  // console.log('massiveCart.cartitem_set',testArr);
  // console.log('is_performed', is_performed);
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
          <ModalContentViews.HeaderBlock mb={'5px'} title={'Удаление товаров'} />
          <ModalContentViews.Line />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.ContentBlock>
              <ModalContentViews.SubText>
                Вы точно хотите удалить выбранные товары? Отменить действие будет невозможно
              </ModalContentViews.SubText>
            </ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <Button onClick={modalStates.callback} variant={'cabinet_default'}>
                Удалить
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
              // здесь необходимо просчитать и показать общее количество товара
              // cartData.cartitem_set.length || cartData.in_stock.length
              // ?cartData.cartitem_set.length + cartData.in_stock.length
              // :0})
              in_cart})
          </Title>
          <CartViews.SelectedFilter
            multipleDeleteFromCart={multipleDeleteFromCart}
            tooltipOpen={tooltipNoSelectedProductsOpen}
            setFullItemCartChecked={setFullItemCartChecked}
            setFullItemCartCheckedState={setFullItemCartCheckedState}
            oneClick={oneClick}
          />
          <CartViews.WrapperCards>


            {/* ************************************************************************************************ */}


            {/* карточка товара в корзине для опта */}

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

              : (role === ROLE.DROPSHIPPER || role === ROLE.RETAIL) ?//если дроп
                // карточка товара в корзине для дропа и розницы
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
                {selected} <Text text={'product.s'} />
              </CartViews.Text>
            </CartViews.BlockRightSide>
            <CartViews.BlockRightSide>
              <CartViews.Text type={'text-default'}>
                <Text text={'order.cost'} />
              </CartViews.Text>
              <CartViews.Text type={'text-default_currency'}>
                {total_price ?? 0} {currentCurrcensies}
              </CartViews.Text>
            </CartViews.BlockRightSide>
            {ROLE.RETAIL === role ? (
              <div>
                <CartViews.BlockRightSide>
                  <CartViews.Text type={'text-default'}>
                    <Text text={'sale'} />
                  </CartViews.Text>

                  <CartViews.Text type={'text-red'}>
                    {total_discount} {currentCurrcensies}
                  </CartViews.Text>
                </CartViews.BlockRightSide>

                <CartViews.BlockRightSide>
                  <CartViews.Text type={'text-default'}>
                    <Text text={'shipping'} />
                  </CartViews.Text>
                  <CartViews.Text type={'text-default_currency'}>
                    {delivery_price} {currentCurrcensies}
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
                {total_price ?? 0} {currentCurrcensies}
              </CartViews.Text>
            </CartViews.BlockRightSide>

            <CartViews.LinkToFirmalization
              enabled={agreeWitheRegulations && is_performed}
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
                    Согласен с{' '}
                    <a target="_blank" href={site_configuration.order_condition}>
                      условиями оформления заказа{' '}
                    </a>
                    на торговой бизнес-платформе и с{' '}
                    <a target="_blank" href={site_configuration.return_rules}>
                      правилами возврата
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

