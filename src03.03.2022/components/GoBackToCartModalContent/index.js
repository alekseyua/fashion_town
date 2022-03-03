import { Formik } from 'formik';
import React from 'react';
import ModalContentViews from '../../Views/ModalContentViews';
import Button from '../../Views/Button';
import WarningBlock from '../../Views/ModalContentViews/WarningBlock';

const GoBackToCartModalContent = ({ closeModal, page_type_cart = { page_type_cart }, gotoCartFunc}) => {
  return (
    <ModalContentViews.ModalWrapper customClassName={'modal-refusing'}>
      <ModalContentViews.CloseBtn closeModal={closeModal} />
      <ModalContentViews.HeaderBlock mb={'20px'} title={'Вы уверены, что хотите отменить заказ?'} />
      <WarningBlock>Введённые вами данные не сохранятся!</WarningBlock>
      <ModalContentViews.ContentBlock>
        <Formik>
          {({ handleSubmit, handleChange, values, errors, setFieldValue, touched }) => {
            return (
              <ModalContentViews.GoBackToCartContent closeModal={closeModal} to={page_type_cart} gotoCartFunc={gotoCartFunc}/>
            );
          }}
        </Formik>
      </ModalContentViews.ContentBlock>
    </ModalContentViews.ModalWrapper>
  );
};

export default React.memo(GoBackToCartModalContent);
