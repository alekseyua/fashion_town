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
