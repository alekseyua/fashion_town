import { GxForm } from '@garpix/garpix-web-components-react';
import { Formik } from 'formik';
import React from 'react';
import api from '../../api';
import AuthorizationAndRegViews from '../../Views/AuthorizationAndRegViews';
import Button from '../../Views/Button';
import Input from '../../Views/Input';
import Text from '../Text';

const ModalNewPassword = ({ initialValues, setNextStep, openModalFinallyRestorePassword }) => {
  const handleSubmit = (params) => {
    //todo: обращение к апи чтобы изменить пароль
    openModalFinallyRestorePassword(true);
  };
  return (
    <>
      <AuthorizationAndRegViews.ModalRestorePasswordTitle
        title={'Введите новый пароль'}
        mb={'30px'}
      />
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ handleSubmit, handleChange, values, touched, isSubmitting, errors }) => {
          return (
            <GxForm noValidate onGx-submit={handleSubmit} className="form-horizontal">
              <Input
                type={'password'}
                className={'input-mt_20'}
                value={values.password}
                variant={'largeCustomLabel'}
                autocomplete={'off'}
                name={'password'}
                label={'Новый пароль'}
                onGx-input={handleChange}
                helpText={errors.password ? <ErrorField message={errors.password} /> : null}
              />
              <Input
                type={'password'}
                className={'input-mt_20'}
                value={values.confirm_password}
                variant={'largeCustomLabel'}
                autocomplete={'off'}
                name={'confirm_password'}
                label={'Подтвердите новый пароль'}
                onGx-input={handleChange}
                helpText={
                  errors.confirm_password ? <ErrorField message={errors.confirm_password} /> : null
                }
              />
              <Button variant={'black_btn_full_width'} type={'submit'}>
                Изменить пароль
              </Button>
            </GxForm>
          );
        }}
      </Formik>
    </>
  );
};

export default React.memo(ModalNewPassword);
