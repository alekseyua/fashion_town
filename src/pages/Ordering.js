import React from 'react';
import Layout from '../Views';
import { GxRow } from '@garpix/garpix-web-components-react';
import Container from '../Views/Container';
import OrderComponent from '../components/OrderComponent';
import { ROLE } from '../const';
import { useStoreon } from 'storeon/react';

const Ordering = (props) => {
  let {
    payment_methods,
    delivery_methods,
    cart_content,
    profile,
    role_configuration,
    site_configuration,
  } = props;
const { currenssies, dispatch }       = useStoreon('currenssies');
const { userPage }                    = useStoreon('userPage');
const { cartAl }                      = useStoreon('cartAl');
const { orderCreate }                 = useStoreon('orderCreate');
const { role }                        = userPage.profile;

// if(role === ROLE.WHOLESALE){
//   let newCartAlPerfomed = {};
//   if (cartAl.is_performed){       
//     let res_cartitem_set = [];
//     let res_in_stock =  [];
//     let cart_items = [];
//     //********************************** */

//     const createDataItems = (data) => {
//       // console.log('createDataItems; --- ', data);
//       let res = [];
//         data.items.map(el=>{
//         // условия сборки выброных позиций
//         if (el.selected){
//           el={
//             brand: el.product.brand,
//             change_agreement:el.change_agreement,
//             color:el.color,
//             comment: "",
//             discount: 1,
//             id: el.id,
//             image: el.product.image,
//             is_pack: el.is_pack,
//             old_price: el.old_price,
//             price: el.price,
//             qty: el.qty,
//             size: el.size,
//             title: el.product.title,
//             total_price: el.total_price,
//             url : el.url,
//           } 
//           res.push(el)
//         }
//       })
//       return {
//         id: data.id,
//         is_performed: data.is_performed,
//         items: res,
//         title: data.title,
//         condition: data.condition,
//       };
//     }
//     // здесь мы перебираем все элементы в массиве которые имеют отметку и соответствуют условиям збора
//     cartAl.cartitem_set.map(el=>{
//         el.is_performed
//         ? res_cartitem_set.push(createDataItems(el)) 
//         : null
//       }
//       )
 
//     //************************************ */
//     const creteDataInstock = (data) => {
//       let   res=[];
//       return res = {
//         color: data.color,
//         discount: 1,
//         id: data.product.id,
//         old_price : data.old_price,
//         price: data.price,
//         brand : data.product.brand,
//         qty : data.qty,
//         image: data.product.image,
//         size: data.size,
//         title: data.product.title,
//         change_agreement: data.change_agreement,
//         total_price: data.total_price,
//         currenssies : currenssies,
//         url : data.url,
//         }
//     }
//     //собираем данные по категории товар в наличии
//       cartAl.in_stock.map(el=>{
//         el.selected? res_in_stock.push(creteDataInstock(el)) : null;
//       })
//     //************************************ */
//     /**
//    * is_pack не предусмотрен пока в заказах если что добавить
//    */
//     //************************************ */
//         newCartAlPerfomed={
//         cartitem_set : res_cartitem_set,
//         created_at: cartAl.created_at,
//         delivery_price: cartAl.delivery_price,
//         id: cartAl.id,
//         in_cart: cartAl.in_cart,
//         in_stock: res_in_stock,
//         is_performed: cartAl.is_performed,
//         selected: cartAl.selected,
//         total_discount: cartAl.total_discount,
//         total_order_price: cartAl.total_order_price,
//         total_price: cartAl.total_price,
//         updated_at: cartAl.updated_at,
//         cart_items: res_cartitem_set,
//         price: cartAl.total_price,
//         delivery: {price : null},

//       }
//   }
//   cart_content = newCartAlPerfomed;
//   // dispatch('orderCreate/add',cart_content);
//   //orderCreate/add
// }

//console.log('Ordering cart_content', dispatch);

  return (
    <Layout main {...props}>
      <Container>
        <GxRow>
          <OrderComponent
            payment_methods={payment_methods}
            delivery_methods={delivery_methods}
            cart_content={cart_content}
            profile={profile}
            role_configuration={role_configuration}
            site_configuration={site_configuration}
          />
        </GxRow>
      </Container>
    </Layout>
  );
};

export default React.memo(Ordering);
