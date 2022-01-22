import { GxForm, GxButton } from '@garpix/garpix-web-components-react';
import React from 'react';
import Text from '../../components/Text';
import ButtonsWrapper from './ButtonsWrapper';
import style from './styles/index.module.scss';

const GoBackToCartContent = ({ closeModal, to = '#',gotoCartFunc }) => {

//console.log('ModalContentViews -> GoBackToCartContent--!!!!  ')
  return (
    <ButtonsWrapper
      leftBtn={
        <GxButton
          // href={to}
          gxVariant={'link'}
          type="submit"
          className={style['productreviews__form-submit-marginbtndark']}
          onClick={(e)=>{
            // e.preventDefault();
            gotoCartFunc(e,true);
          }}
        >
          <Text text={'yes'} />
        </GxButton>
      }
      rightBtn={
        <GxButton onClick={()=>closeModal} className={style['productreviews__form-submit-btndark']}>
          <Text text={'cancellation'} />
        </GxButton>
      }
    />
  );
};
export default React.memo(GoBackToCartContent);
