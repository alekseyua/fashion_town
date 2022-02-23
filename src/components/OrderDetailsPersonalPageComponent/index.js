import React, { useEffect, useState } from 'react';
import Title from '../../Views/Title';
import OrderDetailsPersonalPageViews from '../../Views/OrderDetailsPersonalPageViews';
import Chat from './Chat';
import dayjs from '../../utils/dayjs';
import api from '../../api';
import { ROLE } from '../../const';
import { useStoreon } from 'storeon/react';


const orderApi = api.orderApi;

const OrderDetailsPersonalPageComponent = ({
  order,
  slug,
  currentCurrcensies,
  role_configuration,
  setModalStates,
}) => {

  // components -> OrderDetailsPersonalPageComponent
  const { userPage } = useStoreon('userPage');
  const { role } = userPage.profile;
  const {
    cart,
    correspondence,
    created_at,
    delivery_address,
    delivery_method,
    id,
    order_items,
    order_cost,
    payment_method,
    status,
    comment,
    track_number,
    delivery_cost,
    total,
    weight,
    updated_at,
    discount,
    specification,
  } = order;
  const [orderItems, setOrderItems] = useState([]);
  const [dataOrder, setDataOrder] = useState({});
  const [newOrderItems, setNewOrderItems] = useState([]);
  const [orderItemLength, setOrderItemLength] = useState(0);
  const [enableBtn, setEnableBtn] = useState(true)

  const [dataOrderItem, setDataOrderItem] = useState([]);

  const { currenssies, dispatch } = useStoreon('currenssies');

  const getOrderItem = () => { 
    console.log('res id', id)

    orderApi
      .getOrderItems({ order_id: id })
      .then((res) => {
        setOrderItems(res);
        console.log('res orders', res[0])
        res[0]?.items?getAmountGoods(res):null
      })
      .catch(err => console.log(`Ошибка получения списка товаров находящихся в заказе №${id}`, err));
  };

  const getAmountGoods = (res) => {
    const amount = res.reduce((acc,cur)=>{
      acc += cur?.items.length
      return acc
    },0)
    // console.log('amount', amount)
        setOrderItemLength(amount);

  }


  useEffect(() => {
    getOrderItem();
  }, [slug, currenssies, enableBtn]);


  //сделать если опт
  useEffect(()=>{
    if (role === ROLE.WHOLESALE) {
      let res = [];
      orderItems.map(items => {
        items.items.map(item => {
          res.push(item)
        })
      })
      setNewOrderItems(res);
    }
  }, [orderItems, currenssies])
  // *****************************************************************************************
  //
  const deleteElementOrder = (id_goods, order) => {
    const params = {
      order_id: order,
      id: id_goods,
    }
    api
      .orderApi
      .cancelOrderItem(params)
      .then(res => {

        setEnableBtn(!enableBtn)
        console.log('cancelOrderItem --', res)
           // history.push('/orders')
      })
      .catch(err => console.log('ERROR btnDelOrder dont work', err));
  }
  // *****************************************************************************************
  useEffect(() => {
    console.log('change currency')
    orderApi
      .getOrders()
      .then(res => {
        let result = {
          id : 111,
          status : "in_process",
          total: 18.22, 
        }
        let massiveOrder = [];

        res.results.map(orders=>{
          result = {
            id : orders.id,
            status : orders.status.status,
            total: orders.total,
          }
          massiveOrder.push(result)
        });

        setDataOrderItem(massiveOrder)
      })
      .catch(err => console.error(`ERROR from request getOrders`, err))
  }, [currenssies])

    useEffect(()=>{
      let resData={};
      dataOrderItem.map(order=>{
        order.id === id ?
        resData = order
        :null
        setDataOrder(resData)
      })
    }, [dataOrderItem])


  return (
    <>
      <OrderDetailsPersonalPageViews.Wrapper>
        <Title variant="cabinet_orders_details__title" type={'h1'}>
          Заказ № {slug}
          <OrderDetailsPersonalPageViews.SubTitleContent>
            от {dayjs(api.language, created_at).format('DD.MM.YYYY')}
          </OrderDetailsPersonalPageViews.SubTitleContent>
        </Title>
        {track_number ? (
          <OrderDetailsPersonalPageViews.TrackDetails nubmerTrack={track_number} />
        ) : null}
        <OrderDetailsPersonalPageViews.OrderBaseDetails
          delivery_address={delivery_address}
          payment_method={payment_method}
          delivery_method={delivery_method}
          comment={comment}
          status={status}
          delivery_cost={delivery_cost}
          weight={weight}
          order_cost={dataOrder.total}
          discount={discount}
          currentCurrcensies={currentCurrcensies}
          setModalStates={setModalStates}
          numberOrder={slug}
        />

        <OrderDetailsPersonalPageViews.ListTable
          count={role !== ROLE.WHOLESALE ? orderItems.length : orderItemLength}
          specification={specification}
        />
        <OrderDetailsPersonalPageViews.CardSectionWrapper>
          <OrderDetailsPersonalPageViews.LeftSideCol>
            {role !== ROLE.WHOLESALE ? (
              orderItems.map((el, i) => {
                return ( 
                  <OrderDetailsPersonalPageViews.Card
                    {...el}
                    key={el.id}
                    title={el.title}
                    size={el.size}
                    color={el.color}
                    status={el.status}
                    prices={el.prices}
                    order={el.order}
                    brand={el.brand}
                    change_agreement={el.change_agreement}
                    comment={el.comment}
                    image={el.image}
                    deleteElementOrder={deleteElementOrder}
                    setModalStates={setModalStates}
                  />
                );
              })
            ) : (
              <React.Fragment>
                {orderItems.map((el, i) => {
                  return (
                    <OrderDetailsPersonalPageViews.WrapperWhoosaleCard key={i} brand={el.title}>
                      {el.items.map((item) => {
                        return (
                          <OrderDetailsPersonalPageViews.Card
                            {...item}
                            key={item.id}
                            title={item.title}
                            size={item.size}
                            color={item.color}
                            status={item.status}
                            prices={item.prices}
                            order={item.order}
                            brand={item.brand}
                            change_agreement={item.change_agreement}
                            comment={item.comment}
                            image={item.image}
                            deleteElementOrder={deleteElementOrder}
                            id={item.id}
                            setModalStates={setModalStates}

                          />
                        );
                      })}
                    </OrderDetailsPersonalPageViews.WrapperWhoosaleCard>
                  );
                })}
              </React.Fragment>
            )}
          </OrderDetailsPersonalPageViews.LeftSideCol>
          <OrderDetailsPersonalPageViews.RightSideCol>
            <Chat order_id={id} setModalStates={setModalStates} />
          </OrderDetailsPersonalPageViews.RightSideCol>
        </OrderDetailsPersonalPageViews.CardSectionWrapper>
      </OrderDetailsPersonalPageViews.Wrapper>
    </>
  );
};

export default React.memo(OrderDetailsPersonalPageComponent);
