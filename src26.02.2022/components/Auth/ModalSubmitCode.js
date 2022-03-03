import { GxForm } from '@garpix/garpix-web-components-react';
import { Formik } from 'formik';
import React from 'react';
import api from '../../api';
import AuthorizationAndRegViews from '../../Views/AuthorizationAndRegViews';
import Button from '../../Views/Button';
import Input from '../../Views/Input';
import Text from '../Text';

const ModalSubmitCode = ({ initialValues, setNextStep }) => {
  const handleSubmit = (params, { setSubmitting }) => {
    //todo: обращение к апи с целью отправить код смены пароля
    setNextStep();
  };
  return (
    <>
      <AuthorizationAndRegViews.ModalRestorePasswordTitle title={'Введите код'} mb={'10px'} />
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ handleSubmit, handleChange, values, touched, isSubmitting, errors }) => {
          return (
            <GxForm noValidate onGx-submit={handleSubmit} className="form-horizontal">
              <AuthorizationAndRegViews.ModalRestorePasswordDesc mb={'35px'}>
                Мы отправили код подтверждения на ваш e-mail
              </AuthorizationAndRegViews.ModalRestorePasswordDesc>
              <Input
                type={'text'}
                className={''}
                value={values.submitCode}
                variant={'largeCustomLabel'}
                autocomplete={'off'}
                name={'submit_code'}
                placeholder={'Введите код'}
                label={''}
                onGx-input={handleChange}
                helpText={errors.submitCode ? <ErrorField message={errors.submitCode} /> : null}
              />
              <AuthorizationAndRegViews.ModalSubmitCodeView />
            </GxForm>
          );
        }}
      </Formik>
    </>
  );
};

export default React.memo(ModalSubmitCode);
