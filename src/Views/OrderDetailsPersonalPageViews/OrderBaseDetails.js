import React from 'react';
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
import style from './styles/index.module.scss';
import { useStoreon } from 'storeon/react';




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


  const sumFromDilivery = (delivery_cost + order_cost).toFixed(2);



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
              <Text text={'order.cost'} />
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
                                &nbsp;По тарифам КАРГО&nbsp;
                                
                                  {delivery_cost}&nbsp;
                                  {currentCurrcensies}{' '}
                                </>
                              ):( 
                                <>
                                  &nbsp;Уточните у менеджера
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
