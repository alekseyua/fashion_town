import React, { useState } from 'react';
import CartViews from '../../Views/CartViews';
import Text from '../../components/Text';
import { ROLE } from '../../const'
import {
  addressIcon,
  wallet,
  truck,
  statusWait,
  statusSend,
  statusWork,
  statusOrdered,
  statusPackage,
  statusClosed,
  statusReturn,
  statusCancel,
  toolTipIcon,
} from '../../images';
import { GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import { useStoreon } from 'storeon/react';
import style from './styles/index.module.scss';
import ModalContentViews from '../../Views/ModalContentViews';

const OrderBaseDetails = ({
  payment_method,
  delivery_method,
  delivery_address,
  comment,
  discount,
  order_cost,
  weight,
  status,
  delivery_cost,
  currentCurrcensies,
  setModalStates,
  numberOrder,
}) => {
  const {
    city,
    country,
    first_name,
    flat,
    house,
    id,
    last_name,
    middle_name,
    phone,
    post_code,
    profile,
    street,
  } = delivery_address;

  const getIconFromStatus = (id) => {
    const statusIcons = {
      work: statusWork,
      created: statusOrdered,
      sended: statusSend,
      payment_waiting: statusSend,
      in_process: statusWork,
      packaging: statusPackage,
      delivery_payment_waiting: statusWait,
      closed: statusClosed,
      canceled: statusCancel,
      return: statusReturn,
      default: statusWait,
    };


    if (statusIcons.hasOwnProperty(id)) {
      return statusIcons[id];
    } else {
      return statusIcons.default;
    }
  };
  const { userPage }  = useStoreon('userPage');
  const { role }      = userPage.profile;

  const closeModal = () => {
    setModalStates({
      content: null,
      show: false,
      addClass: null,
    });
  };
  const sumFromDilivery = (delivery_cost + order_cost).toFixed(2);
  const heandlerClickInfo = () => {
    setModalStates({
      content: (<>
        <ModalContentViews.CloseBtn closeModal={closeModal} />
            <p
              style={
                {
                  fontSize: '18px',
                  padding: '10px 25px',

                }
              }
            >
          {
          status.id === 'payment_waiting'?
              `Ваш заказ №${numberOrder} уже получен нами, ожидаем поступление оплаты за заказ. В течении суток необходимо прикрепить чек оплаты, либо заказ будет отменен.`
              : status.id === 'in_process' ?
                <>Ваш заказ {numberOrder} оплачен и передан в работу Менеджеру по закупкам. Вас будут информировать о ходе закупки. Если товар в статусе "Заказано"-товар заказан у поставщика. Ожидаем поступления на склад. {role === ROLE.RETAIL ? '' : ' Если товар в статусе "В сборе" это значит, что идет сбор на размерный ряд. Как только ряд будет собран совместно всеми участниками сбора, статус товара изменится на "Товар оплачен". С этого момента отмена всего заказа возможна только через Администрацию сайта'} </>
                  : status.id === 'packaging' ?
                    `Ваш заказ  №${numberOrder} находится на упаковке и будет отправлен в течении двух рабочих дней`
                    : status.id === 'delivery_payment_waiting' && role === ROLE.DROPSHIPPER ?
                      `На Вашем балансе не хватает средств для оплаты стоимости доставки заказа №${numberOrder}. Пожалуйста, пополните баланс.`
                      : status.id === 'delivery_paid' ?
                        `Ваш заказ №${numberOrder} готов к отправке.`
                        : status.id === 'sended' ?
                          `Ваш заказ №${numberOrder} отправлен. Трек номер доступен в личном кабинете`
                          : status.id === 'canceled' ?
                            `Заказ №${numberOrder} был отменен по причине ${comment ? comment : 'нужен авто ответ'}.`
                            : 'no bla-bla-bla'
          }
            </p>

      </>),
      show: true,
      addClass: 'modal-info-order',
    });
  }


  return (
    <div className={style['cabinet_orders_details__ordercard']}>
      <div className={style['cabinet_orders_details__wrapper']}>
        <div className={style['cabinet_orders_details__leftside']}>
          <div className={style['cabinet_orders_details__paystatus']}>
            <GxIcon
              src={getIconFromStatus(status.id)}
              className={style['cabinet_orders_details__icon']}
            />
            {status.title}
            <GxButton
              circle
              size="sm"
              variant="info"
              className={style['cabinet_orders_details__tooltipicon']}
              onClick={heandlerClickInfo}
            >
              <GxIcon src={toolTipIcon} />
            </GxButton>
          </div>
          <div className={style['cabinet_orders_details__middle']}>
            <div className={style['cabinet_orders_details__pay']}>
              <GxIcon src={wallet} className={style['cabinet_orders_details__icon']} />
              {payment_method}
            </div>
            <div className={style['cabinet_orders_details__delivery']}>
              <GxIcon src={truck} className={style['cabinet_orders_details__icon']} />
              {delivery_method}
            </div>
          </div>
          <div className={style['cabinet_orders_details__address']}>
            <GxIcon src={addressIcon} alt="address" className={style['cabinet-address__icon']} />
            <div className={style['cabinet-address__desc']}>
              <div className={style['cabinet-address__value']}>
                {country}, {post_code} {city}, {street},{house}, {flat}
              </div>
              <div className={style['cabinet-address__name']}>
                {last_name} {first_name} {middle_name}
              </div>
              <div className={style['cabinet-address__phone']}>{phone}</div>
            </div>
          </div>
        </div>
        <CartViews.WrapperRightSide>
          <CartViews.BlockRightSide>
            <CartViews.Text type={'text-default'}>Вес посылки:</CartViews.Text>
            <CartViews.Text type={'text-default_currency'}>{weight} кг</CartViews.Text>
          </CartViews.BlockRightSide>
          <CartViews.BlockRightSide>
            <CartViews.Text type={'text-default'}>
              <Text text={'order.cost'} />&nbsp;
            </CartViews.Text>
            <CartViews.Text type={'text-default_currency'}>
            {order_cost}&nbsp;{currentCurrcensies}
              {/* 980 {currentCurrcensies} */}
            </CartViews.Text>
          </CartViews.BlockRightSide>

          {(role === ROLE.RETAIL)
          ?( <>  
            <CartViews.BlockRightSide>
              <CartViews.Text type={'text-default'}>
                <Text text={'sale'} />
              </CartViews.Text>
              <CartViews.Text type={'text-red'}>
                {discount} {currentCurrcensies}
              </CartViews.Text>
            </CartViews.BlockRightSide>
            <CartViews.BlockRightSide>
              <CartViews.Text type={'text-default'}>
                <Text text={'shipping'} />
              </CartViews.Text>
              <CartViews.Text type={'text-default_currency'}>
                              {delivery_cost ? (
                                <>
                                &nbsp;                                
                                  {delivery_cost}&nbsp;
                                  {currentCurrcensies}{' '}
                                </>
                              ):( 
                                <>
                                  {null}
                                </>
                              )}
                            
                {/* 130 {currentCurrcensies} */}
              </CartViews.Text>
            </CartViews.BlockRightSide>
          </>)
          :null
        }   
          <CartViews.Line />
          <CartViews.BlockRightSide mb={20}>
            <CartViews.Text type={'text-title'}>
              Итого:
            </CartViews.Text>
            <CartViews.Text type={'text-title'}>
              {' '}
              {(role === ROLE.RETAIL)
              ?(
                <>
                {sumFromDilivery}&nbsp;{currentCurrcensies}
                </>
                ):(
                <>
                  {order_cost}&nbsp;{currentCurrcensies}
                </>
                )}
                           
            </CartViews.Text>
          </CartViews.BlockRightSide>
        </CartViews.WrapperRightSide>
      </div>
      {comment ? (
        <div className={style['cabinet_orders_details__comment']}>
          <div className={style['cabinet_orders_details__commentleft']}>Комментарий:</div>
          <div className={style['cabinet_orders_details__commentright']}>
            <div dangerouslySetInnerHTML={{ __html: comment }}></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(OrderBaseDetails);
