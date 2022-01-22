import React, { useState, useEffect } from 'react';
import Title from '../../Views/Title';
import Text from '../Text';
import CartViews from '../../Views/CartViews';
import CheckBox from '../../Views/CheckBox';
import { Link } from 'react-router-dom';
import { GxCol, GxModal, GxTooltip, GxButton } from '@garpix/garpix-web-components-react';
import OrderingCards from './OrderingCards';
import { Formik } from 'formik';
import OrderingPay from './OrderingPay';
import OrderingDelivery from './OrderingDelivery';
import OrderingAddress from './OrderingAddress';
import { orderCreatePasportAndDelivery } from '../../utils/schemesFormic';
import ModalContentViews from '../../Views/ModalContentViews';
import classNames from 'classnames';
import { useStoreon } from 'storeon/react';
import PayModalContent from '../BalanceComponent/PayModalContent';
import GoBackToCartModalContent from '../GoBackToCartModalContent';
import api from '../../api';
import dayjs from '../../utils/dayjs';
import { ROLE, STATUS_EQUARING } from '../../const';
import styleModal from '../../Views/ModalCreator/modalCreator.module.scss';
import OrderCar from '../../#lifehack/OrderCar/OrderCar';
import Item from '../../Views/NotificationsViews/Item';
import { useHistory } from 'react-router-dom';
import Select from '../../Views/Select';
import style from '../../Views/Select/select.module.scss'

const OrderComponent = ({
  payment_methods,
  delivery_methods,
  cart_content,
  profile,
  role_configuration,
  site_configuration,
}) => {

  const initialState = {
    isLoad: false,
  };
  // const initCartContentOrder = {
  //         cart_items: cart_content.cart_items,
  //         cartitem_set: cart_content.cartitem_set,
  //         delivery: {
  //           price : 0,
  //           description: ""
  //         },
  //         discount: cart_content.discount,
  //         in_stock: cart_content.in_stock,
  //         price: cart_content.price,
  //         total_price: cart_content.total_price,
  //       };

  // const initCartContentOrder = {
  //   cartitem_set: cart_content.cartitem_set,
  //   created_at: '',
  //   cart_items: cart_content.cart_items,
  //   delivery_price: 0,
  //   id: 0,
  //   in_cart: 0,
  //   in_stock: cart_content.in_stock,
  //   is_performed: false,
  //   selected: false,
  //   total_discount: 0,
  //   total_order_price: 0,
  //   updated_at: '',  
  //   delivery: {
  //     price : 0,
  //     description: ""
  //   },
  //   discount: cart_content.discount,
  //   price: cart_content.price,
  //   total_price: cart_content.total_price,
  //       };



  const initialValues = {
    payment_methods: null,
    variant: null,
    needPassport: false,
    lastname: null,
    firstname: null,
    patronomic: null,
    serias_and_number_passport: null,
    issued_passport: null,
    issued_date: null,
    comment: null,
    agree_personal_data: true,
    waitForCall: false,
    selectedAdress: null,
    comment_order: null,
  };

  //************************************** */
  const history = useHistory();
  const { cartAl, dispatch } = useStoreon('cartAl');
  const { stateValuePoly } = useStoreon('stateValuePoly');
  const { dataBalance } = useStoreon('dataBalance')
  const { orderCountryPayment } = useStoreon('orderCountryPayment');
  const { currenssies } = useStoreon('currenssies'); //currenssies
  const { userPage } = useStoreon('userPage');
  const { orderFunc } = useStoreon('orderFunc');
  const { orderCreate } = useStoreon('orderCreate');
  const [cart_contentOrder, setCart_contentOrder] = useState({});
  const [valueSetIdOrder, setValueSetIdOrder] = useState(null);
  const [priceNowDilevery, setPriceNowDilevery] = useState(0);
  const [agreeWitheRegulations, setAgreeWitheRegulations] = useState(true);
  const [fieldCountryOut, setFieldCountryOut] = useState('Украина')
  const [valueStatePay, setValueStatePay] = useState(3);
  const [modalStates, setmodalStates] = useState({
    show: false,
    content: null,
    cusstomClassNameModalResize: null,
  });
  const [statusFildValue, setStatusFildValue] = useState(null);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [listOrders, setlistOrders] = useState([
    {
      title: 'Не создан не один заказ',
      value: 1,
    },
  ]);


  //************************************** */
  const { cart_slug, page_type_cart } = site_configuration;
  const orderApi = api.orderApi;
  const profileApi = api.profileApi;
  const { role } = userPage.profile;
  //************************************** */   




  const errorsMessenge = {};

  const onSubmit = () => { };

  //************************************** */
  useEffect(() => {
    orderApi
      .listOrderItem()
      .then(res => setlistOrders(res.results))
      .catch(err => console.log('response list order ERROR', err));

  }, [stateValuePoly.stateCurrency])
  //console.log('listOrders',listOrders);
  const options = listOrders.map((el) => {
    return {
      title: `${el.order_number} (${el.total} ${currenssies})`,
      value: el.id,
    };
  });

  const focuseSelector = () => {
    setOpenTooltip(null)
    console.log('focuseSelector');
  }
  options.push({
    title: 'отменить выбор',
    value: null,
  });

  const changeStatusOrder = (e) => {
    setStatusFildValue(e.target.value);

    console.log('cдесь готовим  данные для добавление в существующий заказ', e.target.value);
  };



  const closeModal = () => {

    setmodalStates({
      show: false,
      content: null,
    });
  };

  // console.log('userPage',userPage);
  //const [nowCurrency, setNowCurrency] = useState('USD')
  //const [state, setState] = useState(initialState);
  // init состояния модального окна
  // init кнопки закрыть
  // inint данные заказа

  const openModalAddAddress = (content = null) => {
    setmodalStates({
      show: true,
      content: content,
    });
  };

  const openModalPay = (order_id, now_balance = null, total_price = null) => {
    orderApi
      .getRandomRequizites()
      .then((res) => {
        const callbackSubmit = () => {
          history.push('orders');
        };
        setmodalStates({
          content: (
            <PayModalContent
              closeModal={closeModal}
              requisites={res}
              callbackSubmit={callbackSubmit}
              order_id={order_id}
              now_balance={now_balance}
              total_price={total_price}
              currenssies={currenssies}
            />
          ),
          show: true,
          cusstomClassNameModalResize: 'modal-payments',
        });
      })
      .catch(err => {
        console.error(`ERROR "OrderComponent" openModalPay ${err}`)
        //history.push('cart')
      });
  };

  const openModalGoBackToCart = (e) => {
    e.preventDefault();
    const gotoCartFunc = () => {
      history.push('cart');
    }
    setmodalStates({
      content: <GoBackToCartModalContent
        closeModal={closeModal}
        page_type_cart={page_type_cart}
        gotoCartFunc={gotoCartFunc}
      />,
      show: true,
      cusstomClassNameModalResize: 'modal-payments',
    });
  };

  // **************************************************************************************************************************************
  const getNowCurrencyNowCountry = () => {
    if (fieldCountryOut !== 'country') {
      orderApi
        .getCountryDeliviry(
          { "country": fieldCountryOut, "currency": currenssies }
        )
        .then(res => {

          setPriceNowDilevery(res.price)
        })
        .catch(err => console.error(`ERROR!!!!! ${err}`))
    }
  }
  // **********создаём заказ с отправкой на сервер***************************************************************************************************************

  const creteOrder = (values) => {
    
    const date = dayjs(api.language, values.issued_date).format('DD.MM.YYYY');
    // const date = dayjs(Api.language, values.issued_date).format('DD.MM.YYYY');
    const params = {
      payment_method: values.payment_methods,
      delivery_method: values.variant,
      delivery_address: values.selectedAdress,
      first_name: values.first_name,
      middle_name: values.patronomic,
      last_name: values.last_name,
      passport_number: values.serias_and_number_passport,
      passport_issued: values.issued_passport,
      passport_issue_date: date && date !== 'Invalid Date' ? date : null,
      agree_personal_data: values.agree_personal_data,
      wait_call: values.waitForCall,
      comment_passport: values.comment,
      comment_order: values.comment_order,
      order_cost: cart_contentOrder.price,
      discount: cart_contentOrder.discount,
      delivery_cost: (cart_contentOrder.delivery.price) || null, //cart_content.delivery.price,
      total_cost: (cart_contentOrder.total_price + cart_contentOrder.delivery.price),
      currency: currenssies,
      add_goods_order_id: statusFildValue,
    };
    console.log('params', params);
    // ДЕЛАЕМ ПРОВЕРКУ НА ДРОПШИПЕРА И "ПРОВЕРКУ НА НАЛИЧЕЕ ДОСТАТОЧНО ЛИ СРЕДСТ ДЛЯ ВЫКУПА ТОВАРА"-доделать проверку

    if (role === ROLE.DROPSHIPPER) {
      //если дробшипер списание со счета при достаточном количестве денег на счету
      //*************************************************************************** */
      //online(1) или с баланса(3)
      if (valueStatePay === 1) {
        //создаём заказ
        orderApi
          .createOrder(params)
          .then((res) => {
            const order_id = res.id;
            //диалоговое окно оплаты по реквизитам
            openModalPay(order_id);
            //document.location.href = "/ru/orders";//http://localhost:3000/order
            dispatch('stateValuePoly/change', {
              stateCart: true,
              statePayment: true
            })

          })
          .catch((err) => {
            console.log(`ERROR creteOrder pay ONLINE, ${err}`);
            openModalRejectedOrdering('cart');

          });
      } else {
        if (params.total_cost < dataBalance.balance) {//если достаточно денег на счету
          orderApi
            //создаём заказ когда списуют деньги со счёта
            .createOrder(params)
            .then((res) => {
              dispatch('stateValuePoly/change', {
                stateCart: true,
                statePayment: true
              })
              history.push('orders');
              //document.location.href = "/ru/orders";//???????????????????????????????? с ru или без ru
            })
            .catch((err) => {
              console.log(`ERROR creteOrder pay BALANCE, ${err}`);
              openModalRejectedOrdering('cart');

            });
        } else {
          //создаём заказ когда нет деньг на счету
          orderApi
            .createOrder(params)
            .then((res) => {
              const order_id = res.id;
              //диалоговое окно оплаты по реквизитам
              openModalPay(order_id, dataBalance.balance, params.total_cost);
              dispatch('stateValuePoly/change', {
                stateCart: true,
                statePayment: true
              })
              //history.push('orders');
              //window.location.href = "/balance";//http://localhost:3000/order
            })
            .catch((err) => {
              console.log(`ERROR creteOrder pay ONLINE, ${err}`);
              openModalRejectedOrdering('cart');

            });
        }
      }
      //***************************************************************************** */
    } else if (ROLE.RETAIL === role) {
      //если розничный
      //если оплата с баланса
      if (params.total_cost < dataBalance.balance) {
        //если достаточно денег на счету оформляется заказ сразу
        //???????????????????????????????????????????????????????
        //создаём заказ когда списуют деньги со счёта
        orderApi
          .createOrder(params)
          .then(res => {
            dispatch('stateValuePoly/change', {
              stateCart: true,
              statePayment: true
            });
            history.push('orders');
          })
          .catch((err) => {
            console.log(`ERROR creteOrder pay BALANCE, ${err}`);
            openModalRejectedOrdering('cart');

          });
      } else {
        orderApi
          .createOrder(params)
          .then((res) => {
            const order_id = res.id;
            //диалоговое окно оплаты по реквизитам
            openModalPay(order_id, dataBalance.balance, params.total_cost);
            dispatch('stateValuePoly/change', {
              stateCart: true,
              statePayment: true
            })
            //document.location.href = "/ru/orders";//http://localhost:3000/order
            // history.push('orders');
          })
          .catch((err) => {
            console.log(`ERROR creteOrder pay BALANCE, ${err}`);
            openModalRejectedOrdering('cart');

          });
      }

    } else if (ROLE.WHOLESALE === role) {
      //если оптовик       
      if (valueStatePay === 1) {
        //создаём заказ
        orderApi
          .createOrder(params)
          .then((res) => {
            const order_id = res.id;
            //диалоговое окно оплаты по реквизитам
            openModalPay(order_id, dataBalance.balance, params.total_cost);
            dispatch('stateValuePoly/change', {
              stateCart: true,
              statePayment: true
            })
            // history.push('orders');
            //document.location.href = "/ru/orders";//http://localhost:3000/order
          })
          .catch((err) => {
            console.log(`ERROR creteOrder pay ONLINE, ${err}`);
            openModalRejectedOrdering('cart');

          });
      } else {
        if (params.total_cost < dataBalance.balance) {
          //если достаточно денег на счету оформляется заказ сразу
          //???????????????????????????????????????????????????????
          orderApi
            //создаём заказ когда списуют деньги со счёта
            .createOrder(params)
            .then((res) => {
              // openModalPay(order_id,dataBalance.balance, params.total_cost);
              dispatch('stateValuePoly/change', {
                stateCart: true,
                statePayment: true
              })
              history.push('orders');
              //document.location.href = "/ru/orders";//???????????????????????????????? с ru или без ru
            })
            .catch((err) => {
              console.log(`ERROR creteOrder pay BALANCE, ${err}`);
              openModalRejectedOrdering('cart');

            });
        } else {
          orderApi
            .createOrder(params)
            .then((res) => {
              const order_id = res.id;
              //диалоговое окно оплаты по реквизитам
              openModalPay(order_id, dataBalance.balance, params.total_cost);

              dispatch('stateValuePoly/change', {
                stateCart: true,
                statePayment: true
              })
              //   history.push('orders');
              //document.location.href = "/ru/orders";//http://localhost:3000/order
            })
            .catch((err) => {
              dispatch('stateValuePoly/change', {
                stateCart: true,
                statePayment: true
              })
              console.log(`ERROR creteOrder pay ONLINE, ${err}`);
              openModalRejectedOrdering('cart');
            });
        }
      }
    } else {
      alert('HZ proverit')
    }
  };

  // **************************************************************************************************************************************

  const getEnabledToPayments = (values, errors) => {
    //устанавливаем состояние как делать оплату online(1) или с баланса(3)
    if (!statusFildValue){

      (values.payment_methods === 1) ? setValueStatePay(1) : setValueStatePay(3)
      // currenssies?setNowCurrency(currenssies):console.log('`ERROR с валютой');;
      //?если выбран вариант доставки и оплаты пройдем к следущему шагу


      if (
        values.payment_methods &&
        values.variant &&
        values.selectedAdress &&
        agreeWitheRegulations
      ) {

        /**
         * необходимо исправить добавление и удаление стилей по React
         */

        if (document.querySelector('.orderCar').classList.contains('disable')) {
          document.querySelector('.orderCar').classList.remove('disable');
        }
        //?если нужен паспорт то проверим валидность введённых данных
        if (values.needPassport && !values.waitForCall) {
          if (Object.keys(errors).length == 0 && values.agree_personal_data) {
            return true;
          }
          //?В случае если выбрана опция дождаться звонка мы игнорируем проверку паспортных данных
        } else if (values.waitForCall) {
          return true;
        } else {
          // делает октивной кнопку перейти к оформлению
          return true;
        }
      } else {
        return false;
      }
    }else{
      if (document.querySelector('.orderCar').classList.contains('disable')) {
        document.querySelector('.orderCar').classList.remove('disable');
      }
      return true
    }
  };

  // **************************************************************************************************************************************


  const openModalRejectedOrdering = (funcGoTo) => {
    setmodalStates({
      show: true,
      cusstomClassNameModalResize: 'modal-success_error',
      content: (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <ModalContentViews.SuccessOrError
                closeModal={closeModal}
                success={false}
                funcGoTo={funcGoTo}
                content={
                  <>
                    <div>Упс...</div>
                    <div>Не удалось оформить заказ!</div>
                    <div>Попробуйте позже</div>
                  </>
                }
              />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      ),
    });
  };


  // ****************обновляем состояние доставки*****************************************************************************************

  useEffect(() => {
    if (orderCountryPayment.length > 0) {
      const delivery_priceCountry = orderCountryPayment.map(item => {
        if (item.title === fieldCountryOut) {
          return (setCart_contentOrder({
            cart_items: cart_content.cart_items,
            discount: cart_content.discount,
            in_stock: cart_content.in_stock,
            price: cart_content.price,
            total_price: cart_content.total_price,
            delivery: {
              description: cart_content.delivery.description || "",
              price: priceNowDilevery || 0,
            }
          })
          )
        }
      })
    }

  }, [priceNowDilevery, fieldCountryOut]);

  // создадим новый моссив с товарами для отрисовки



  useEffect(() => {

    if (cartAl !== 0) {
      let newCartAlPerfomed = {};
      if (cartAl.is_performed) {
        let res_cartitem_set = [];
        let res_in_stock = [];
        let cart_items = [];
        //********************************** */

        const createDataItemsOptDrop = (data) => {

          let res = [];
          data.items.map(el => {
            // условия сборки выброных позиций
            if (el.selected) {
              el = {
                brand: el.product.brand,
                change_agreement: el.change_agreement,
                color: el.color,
                comment: "",
                discount: 1,
                id: el.id,
                image: el.product.image,
                is_pack: el.is_pack,
                old_price: el.old_price,
                price: el.price,
                qty: el.qty,
                size: el.size,
                title: el.product.title,
                total_price: el.total_price,
                url: el.url,
              }
              res.push(el)
            }
          })
          return {
            id: data.id,
            is_performed: data.is_performed,
            items: res,
            title: data.title,
            condition: data.condition,
          };
        }

        const createDataItemsRetail = (data) => {
          console.log('createDataItemsRetail; --- ', data);

          let res = [];
          //   data.map(el=>{
          //   // условия сборки выброных позиций
          //   if (el.selected){
          //     el={
          //       brand: el.product.brand,
          //       change_agreement:el.change_agreement,
          //       color:el.color,
          //       comment: "",
          //       discount: 1,
          //       id: el.id,
          //       image: el.product.image,
          //       is_pack: el.is_pack,
          //       old_price: el.old_price,
          //       price: el.price,
          //       qty: el.qty,
          //       size: el.size,
          //       title: el.product.title,
          //       total_price: el.total_price,
          //       url : el.url,
          //     } 
          //     res.push(el)
          //   }
          // })
          return {
            id: data.id,
            is_performed: data.is_performed,
            items: res,
            title: data.title,
            condition: data.condition,
          };
        }


        // здесь мы перебираем все элементы в массиве которые имеют отметку и соответствуют условиям збора
        if (role === ROLE.WHOLESALE) {
          cartAl.cartitem_set.map(el => {
            el.is_performed
              ? res_cartitem_set.push(createDataItemsOptDrop(el))
              : null
          })
        } else {
          cartAl.cartitem_set.map(el => {
            el.selected
              ? res_cartitem_set.push(el)
              : null
          })
        }


        //************************************ */
        const creteDataInstock = (data) => {
          let res = [];
          return res = {
            color: data.color,
            discount: 1,
            id: data.product.id,
            old_price: data.old_price,
            price: data.price,
            brand: data.product.brand,
            qty: data.qty,
            image: data.product.image,
            size: data.size,
            title: data.product.title,
            change_agreement: data.change_agreement,
            total_price: data.total_price,
            currenssies: currenssies,
            url: data.url,
          }
        }
        //собираем данные по категории товар в наличии
        cartAl.in_stock.map(el => {
          el.selected ? res_in_stock.push(creteDataInstock(el)) : null;
        })
        //************************************ */
        /**
       * is_pack не предусмотрен пока в заказах если что добавить
       */
        //************************************ */
        newCartAlPerfomed = {
          cartitem_set: res_cartitem_set,
          created_at: cartAl.created_at,
          delivery_price: cartAl.delivery_price,
          id: cartAl.id,
          in_cart: cartAl.in_cart,
          in_stock: res_in_stock,
          is_performed: cartAl.is_performed,
          selected: cartAl.selected,
          total_discount: cartAl.total_discount,
          total_order_price: cartAl.total_order_price,
          total_price: cartAl.total_price,
          updated_at: cartAl.updated_at,
          cart_items: res_cartitem_set,
          price: cartAl.total_price,
          delivery: { price: 0 },
          render: true,
        }
      }

      setCart_contentOrder(newCartAlPerfomed);

      dispatch('stateValuePoly/change', { stateOrder: false });
    }


  }, [stateValuePoly.stateOrder, priceNowDilevery, fieldCountryOut])


  const testingBtn = () =>{
    orderApi
      .getOrderItemsList()
      .then(res=>console.log('Получен ответ с данными',res))
      .catch(err=>console.error(`ERROR getOrderItemsList ${err}`))
    
  }

  return (
    <React.Fragment >

      <GxModal
        onGx-after-hide={closeModal}
        open={modalStates.show}
        className={classNames({
          [styleModal['modal_creator']]: true,
          [styleModal[modalStates.cusstomClassNameModalResize]]:
            modalStates.cusstomClassNameModalResize,
        })}
      >
        <ModalContentViews.CloseBtn closeModal={closeModal} />
        {modalStates.content}
      </GxModal>


      <Formik
        validationSchema={orderCreatePasportAndDelivery(errorsMessenge)}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue, touched }) => {
          //запускаем анимацию кнопки создания заказа и отправка на бэк запроса
          // handleChange = (data) => {
          // }
          const [fieldCountry, setFieldCountry] = useState('country')
          getNowCurrencyNowCountry();
          setFieldCountryOut(fieldCountry)

          // statusFildValue ? values = {...values, add_goods_order_id : statusFildValue} : null

          if (orderFunc) {
            const timerBtn = setTimeout(() => {
              creteOrder(values);
              dispatch('orderFunc/state', false);
              clearTimeout(timerBtn);

            }, 7000);
          } else {
            null;
          }

          return (
            <React.Fragment>
              <GxCol
                sizeLg={12}
                sizeMd={12}
                sizeSm={12}
                sizeXl={9}
                sizeXs={12}
                className="ordering__left"
              >
                <Link onClick={openModalGoBackToCart} to={cart_slug} className="linkblue">
                  {'<'} Назад в корзину
                </Link>
                <Title variant={'cart'} type={'h1'}>
                  <Text text="ordering" />
                </Title>
                  <>
                    <GxButton
                      onClick={testingBtn}
                      to='#'
                      variant='black_btn_full_width'
                    >
                      отправить запрос для тестирования  
                    </GxButton>
                  </>
                {

                  cart_contentOrder.render //сдесь добавим условие показа
                    ? (
                      <>
                        <OrderingCards
                          currenssies={currenssies}
                          cart_content={cart_contentOrder}
                          role_configuration={role_configuration}
                        />


                        { !statusFildValue
                        ?(
                        <>
                          <OrderingPay
                            setFieldValue={setFieldValue}
                            values={values.payment_methods}
                            payment_methods={payment_methods}
                          />
                          <OrderingDelivery
                            values={{
                              variant: values.variant,
                              lastname: values.lastname,
                              firstname: values.firstname,
                              patronomic: values.patronomic,
                              serias_and_number_passport: values.serias_and_number_passport,
                              issued_passport: values.issued_passport,
                              issued_date: values.issued_date,
                              comment: values.comment,
                              agree_personal_data: values.agree_personal_data,
                              waitForCall: values.waitForCall,
                              needPassport: values.needPassport,
                            }}
                            role_configuration={role_configuration}
                            errors={errors}
                            touched={touched}
                            delivery_methods={delivery_methods}
                            setFieldValue={setFieldValue}
                          />

                          <OrderingAddress
                            role={role_configuration.role.number}
                            selectedAdress={values.selectedAdress}
                            profileId={profile.id}
                            closeModal={closeModal}
                            setFieldValue={setFieldValue}
                            openModalAddAddress={openModalAddAddress}
                            setFieldCountry={setFieldCountry}
                          />
                        </>
                        ):<></>
                        }
                      </>
                    ) : (<>

                      <Title variant={'cart'} type={'h1'}>
                        <Text text="Не создан ни один заказ" />
                      </Title>
                    </>
                    )
                  // <div className={styleModal['message__order']}>Небыло создано не одного заказа для продолжения добавте товар в корзину и оформите новый заказ</div>
                }
              </GxCol>
              <GxCol
                sizeLg={12}
                sizeMd={12}
                sizeSm={12}
                sizeXl={3}
                sizeXs={12}
                className="ordering__right"
              >
                <CartViews.WrapperRightSide>
                  <CartViews.BlockRightSide mb={20}>
                    <CartViews.Text type={'text-title'}>
                      <Text text={'you.order'} />
                    </CartViews.Text>
                    <CartViews.Text type={'text-sub'}>
                      {/* {cart_contentOrder.cartitem_set.length + cart_contentOrder.in_stock.length}&nbsp; */}
                      {cart_contentOrder.render ? cart_contentOrder.selected : null}&nbsp;
                      <Text text={'product.s'} />
                    </CartViews.Text>
                  </CartViews.BlockRightSide>
                  <CartViews.BlockRightSide>
                    <CartViews.Text type={'text-default'}>
                      <Text text={'order.cost'} />
                    </CartViews.Text>
                    <CartViews.Text type={'text-default_currency'}>
                      {cart_contentOrder.price}&nbsp;
                      {currenssies}
                    </CartViews.Text>
                  </CartViews.BlockRightSide>
                  {/* { ROLE.RETAIL === role?( */}
                  {ROLE.RETAIL === role ? (
                    <>
                      <CartViews.BlockRightSide>
                        <CartViews.Text type={'text-default'}>
                          <Text text={'sale'} />
                        </CartViews.Text>

                        <CartViews.Text type={'text-red'}>
                          {cart_contentOrder.total_discount ?
                            `${cart_contentOrder.total_discount} 
                          ${currenssies}`
                            : null
                          }
                        </CartViews.Text>
                      </CartViews.BlockRightSide>

                      <CartViews.BlockRightSide>
                        {cart_contentOrder.delivery ? (
                          <>
                            <CartViews.Text type={'text-default'}>
                              <Text text={'shipping'} />
                            </CartViews.Text>
                            <CartViews.Text type={'text-default_currency'}>
                              {cart_contentOrder.delivery.price ? (
                                `${cart_contentOrder.delivery.price}
                            ${currenssies}`
                              ) : null}
                            </CartViews.Text>
                          </>) : null}
                      </CartViews.BlockRightSide>
                    </>) : null
                  }

                  <CartViews.Line />
                  <CartViews.BlockRightSide mb={20}>
                    <CartViews.Text type={'text-title'}>
                      <Text text={'total.payable'} />:
                    </CartViews.Text>
                    <CartViews.Text type={'text-title'}>
                      {/* добавляем к сумме стоимость доставки */}
                      {/* { <>
                    {ROLE.RETAIL === role?(
                      cart_contentOrder.delivery.price?
                          (
                            (cart_contentOrder.price + cart_contentOrder.delivery.price).toFixed(2)
                          ):(
                              cart_contentOrder.price.toFixed(2)
                            )  
                    ):(
                      cart_contentOrder.price 
                    )
                    }&nbsp;
                    {currenssies}
                        </>} */}

                    </CartViews.Text>
                  </CartViews.BlockRightSide>
                  <CartViews.CommentOrder
                    name={'comment_order'}
                    handleChange={handleChange}
                    value={values.comment_order}
                    placeholder={'Написать комментарий к заказу...'}
                  />
                  {/* <CartViews.LinkToFirmalization
                  type={'btn'}
                  onClick={() => creteOrder(values)}
                  enabled={getEnabledToPayments(values, errors)}
                  // to={checkout_slug}
                >
                  <Text text="proceedCheckout" />
                </CartViews.LinkToFirmalization> */}

                  {/* выподающий список для добавления товара в существующий заказ */}

                  <div className={style["old-order"]}>
                    <GxTooltip
                      content="Добавить товары к существующему заказу "
                      placement="top"
                    // open={openTooltip}
                    >


                      <Select
                        onFocus={focuseSelector}
                        autoFocus
                        //onFocus={e => e.currentTarget.select()}
                        variant='black'
                        value={statusFildValue}
                        placeholder='Добавить товары к существующему заказу'
                        options={options}
                        onGx-change={changeStatusOrder}
                      ></Select>
                    </GxTooltip>
                  </div>
                  {/* новая версия кнопки оформит заках */}
                  <OrderCar
                    enabled={getEnabledToPayments(values, errors)}
                  />

                  <CartViews.BlockRightSide mt={20} mb={20}>
                    <CheckBox
                      checked={agreeWitheRegulations}
                      onGx-change={() => {
                        setAgreeWitheRegulations(!agreeWitheRegulations);
                      }}
                      label={
                        <CartViews.Text type={'text-label'}>
                          Согласен с <Link to={'#'}>условиями оформления заказа </Link>
                          на торговой бизнес-платформе и с <Link to={'#'}>правилами возврата</Link>
                        </CartViews.Text>
                      }
                    />
                  </CartViews.BlockRightSide>
                </CartViews.WrapperRightSide>
              </GxCol>
            </React.Fragment>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
export default React.memo(OrderComponent);

