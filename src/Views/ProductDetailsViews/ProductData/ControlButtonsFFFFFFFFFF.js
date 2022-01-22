import React, {useState, useCallback, useReducer, useEffect} from 'react';
import { GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import { shoppingIcon } from '../../../images';
import style from '../styles/index.module.scss';
import Button from '../../Button';
import { getCookie } from '../../../utils';
import { useStoreon } from 'storeon/react';
import api from '../../../api/CartApi/index';
import { ROLE } from '../../../const';
import classnNames from 'classnames';
import { useHistory } from 'react-router-dom';

const ControlButtons = ({
  in_cart_count,
  openModalSucces,
  addToCart,
  currentSize,
  currentColor,
  successCallback,
  modalView,
  url,
  collections,
  clickBtnColorCart,
  stateActiveBtn,
}) => {
  
  const [ valueCount, setValueCount]                                        = useState(1)


    if (valueCount > 0) {
      return (
        <div className={`${style[disableBtn]}`}>
          <div className={style['prodpage-control-buttons__counter']}>
            <GxButton
              onClick={() => { goToAddCartAl({valueCount}, false)}}
              className={style['prodpage-control-buttons__add-button']}
            >
              -
            </GxButton>
              <p className={`${style[colorBtnClick]}`}>
                <span> в корзине: {valueCount} шт. </span>
              </p>
            <GxButton

              onClick={() => { goToAddCartAl({valueCount }, true)}}
              className={style['prodpage-control-buttons__down-button']}
            >
              +
            </GxButton>
          </div>
          {linkToProductPage()}
        </div>
      );
    }else{
      return (
        <div className={`${style[disableBtn]}`}>
          <div className={style['prodpage-control-buttons__add']}>
            <GxButton
              onClick={() => { goToAddCartAl({valueCount}, true) }}
              className={`${style[disableBtn]}`}
            >
              <GxIcon slot="icon-left" src={shoppingIcon}></GxIcon>
              добавить в корзину
            </GxButton>
          </div>
          {linkToProductPage()}
        </div>
      );
    }
}           
export default React.memo(ControlButtons);



//   //************************************************ */
//   const linkToProductPage = () => {
//     if (!modalView) return null;
//     return (
//       <Button href={url} full variant={'catalog-link-transparent__modal'}>
//         перейти на страницу товара
//       </Button>
//     );
//   };
//   /*****************************************************/  
//   //Views -> ControlButtons
//   //openModalSucces = !!collections.length;
//   const { cartAl, dispatch }                                                = useStoreon('cartAl');
//   const { userPage }                                                        = useStoreon('userPage');
//   const { currenssies }                                                     = useStoreon('currenssies'); //currenssies
//   const { stateValuePoly }                                                  = useStoreon('stateValuePoly');
//   const { dataProductFromId }                                               = useStoreon('dataProductFromId');
  
//   const [ tooltipNoSelectedProductsOpen, setTooltipNoSelectedProductsOpen]  = useState(false);
//   const [ values, setValue ]                                                = useState({});
//   const [ modalStatesAl, setmodalStates]                                    = useState({
//     show: false,
//     callback: null,
//   });
//   const history = useHistory();
//   const role = userPage.profile.role
  
//   // const {role_configuration} = useStoreon("role_configuration");
//   // const [fullItemCartCheckedAl, setFullItemCartChecked] = useState(false);
//   // const [agreeWitheRegulationsAl, setAgreeWitheRegulations] = useState(true);
//   // const currentCurrcensies = String(currenssies).toUpperCase();
//   //const [ countAl, setCountAl ] = useState(in_cart_count)
  
//   const initialCartData = {
//     cartitem_set: [],
//     delivery_price: 300,
//     id: 14,
//     in_cart: 4,
//     in_stock: [],
//     is_performed: true,
//     selected: 4,
//     total_discount: 692.45,
//     total_price: '0',
//   };
//   //Формируем новый массив с изменениями количества добавленого в корзину в карточке товара
//   const serializeCardDataToFormValue = (data) => {
//     let results = {};
//     data.map((el) => {
//       results[el.id] = {
//         selected: el.selected,
//         qty: el.qty,
//         id: el.id,
//       };
//     });
//     return results;
//   };
//   const serializeCardDataToFormValueWoosale = (data) => {
//     let results = {};
//     data.map((el) => {
//       results[el.id] = {
//         id: el.id,
//         items: el.items,
//         title: el.title,
//       };
//     });
//     return results;
//   };
  
  
//   const setValuesDecoration = (res) => {
    
//     if (role === ROLE.WHOLESALE) {
//       setValue(serializeCardDataToFormValueWoosale(res.cartitem_set));
//     } else {
//       setValue(serializeCardDataToFormValue(res.cartitem_set));
//     }
//   };
  
//   const contextUpdateProductFromCard = (data) => {
//     updateProductFromCart([data]);
//     setTooltipNoSelectedProductsOpen(false);
//   };
  
// /*****************************************************/  

// const [colorBtnClick, setColorBtnClick] = useState('prodpage-control-buttons__indicator');

// const goToAddCartAl = (count, state) =>{
//   console.log('eveevevevev*-*-*-*-', count);
  
//   // count = count.in_cart_count;
//     let oldCount = count;
//    state? count++ : count--;

//    //*****************меняем состояние подсветки при клики добавить или удалить товар********************** */
//    !state? dispatch('stateValuePoly/change', {stateColorIncrement : false,stateColorDiscrement : true}): dispatch('stateValuePoly/change', {stateColorIncrement : true,stateColorDiscrement : false})
//    let timerState = setInterval(()=>{
//     dispatch('stateValuePoly/change', {stateColorDiscrement : false,stateColorIncrement : false})
//     stopSeccessAdd(timerState);
//    },1300);   
//   function stopSeccessAdd(intervAdd) {
//     clearInterval(intervAdd);
//     intervAdd = null; 
//   };
//    //******************************************************************************************************* */
//    console.log('state-',state,'count-',count);
//    setValueCount(count)
//    if (role !==0){
//      if ( count > 0 ){
//        if (count === 1){
//          openModalSucces = true;
//          addToCart({ count, currentSize, currentColor, successCallback, openModalSucces, oldCount});       
//         }else{
//           openModalSucces = false;
//           addToCart({ count, currentSize, currentColor, successCallback, openModalSucces, oldCount});
//         }  
//       }else{
//         history.push('cart')  
//       }
//     }else{
//       setValueCount(0)
//       alert("Вы должны обязательно зарегестриговаться ")
//       history.push('registration')
//     }
//   };

// //******************************************************************************** */

//     useEffect(()=>{
//       //setValueCount(dataProductFromId.in_cart_count)
//       console.log('dataProductFromId inside' , dataProductFromId);
//     },[stateValuePoly.stateCart])
//     //console.log('dataProductFromId  outside', dataProductFromId);

//     //*******************************активная или не активная кнопка добавить в карзину********************** */    
//    let disableBtn = 'prodpage-control-buttons__add-to-cart';
//    useEffect(()=>{
//      disableBtn = classnNames({
//        ['prodpage-control-buttons__add-to-cart'] : stateValuePoly.stateBtnDisable,
//        ['prodpage-control-buttons__add-to-cart-disable'] : !stateValuePoly.stateBtnDisable,
//        }
//      )
//    },[stateValuePoly.stateBtnDisable])
//     //******************************************************************************************************* */

//     //*******************меняем стиль на кнопке зелёный или красный******************************************** */
//     useEffect(()=>{
//       let styleColor = (classnNames({
//         ['prodpage-control-buttons__indicator--color__red'] : stateValuePoly.stateColorDiscrement ,
//         ['prodpage-control-buttons__indicator--color__green'] : stateValuePoly.stateColorIncrement,
//       })
//       ) 
//       setColorBtnClick(styleColor)

//     },[stateValuePoly.stateColorIncrement, stateValuePoly.stateColorDiscrement])
//     //******************************************************************************************************* */
