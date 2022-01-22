import React, { useState } from 'react';
import api from '../../api';
import PersonalPageViews from '../../Views/PersonalPageViews';
import { GxForm } from '@garpix/garpix-web-components-react';
import Input from '../../Views/Input';
import { Formik } from 'formik';
import { changePasswordSchema } from '../../utils/schemesFormic';
import Text from '../Text';
import ErrorField from '../../Views/ErrorField';
import Button from '../../Views/Button';
import ModalContentViews from '../../Views/ModalContentViews';

const apiContent = api.userApi;

const defaultParamsInitData = {
  currentPassword: null,
  newPassword: null,
  confirmPassword: null,
};

const ModalChangePassword = ({ closeModal, userId, title: titleProp }) => {
  const [initialValues, setInititalValues] = useState(defaultParamsInitData);

  const [correctNewPassword, SetCorrectNewPassword] = useState('');

  const [correctOldPassword, SetCorrectOldPassword] = useState('');

  const [title, settitle] = useState(titleProp);

  const [success, SetSuccess] = useState(false);

  const [modal, SetModal] = useState(false);

  const [content, SetContent] = useState('');

  const errorsMessenge = {
    currentPassword: 'currentPassword',
    newPassword: 'newPassword',
    confirmPassword: 'confirmPassword',
    requiredField: 'Обязательное поле',
    match: 'Пароли не совпадают',
    shortPass: 'Слишком короткий пароль',
    longPass: 'Слишком длинный пароль',
    newToOld: 'Новый пароль не должен совпадать со старым',
  };

  const resetPassword = () => {
    SetCorrectOldPassword('');
    SetCorrectNewPassword('');
  };

  const onSubmit = (data, { resetForm }) => {
    apiContent
      .updatePassword({
        old_password: data.currentPassword,
        new_password: data.newPassword,
      })
      .then((res) => {
        SetCorrectOldPassword('');
        SetCorrectNewPassword('');
        SetSuccess(true);
        SetModal(true);
        SetContent('Пароль успешно изменён');
        settitle("")
      })
      .catch((err) => {
        try {
          const {
            response: { data },
          } = err;
          let kindOfErr = 1;
          let password;

          if (data.old_password) password = data.old_password[0];
          else {
            password = data.new_password[0];
            kindOfErr = 2;
          }

          // console.log('ОШИБКА');

          password = password.slice(0, password.indexOf('.'));
          kindOfErr === 1 ? SetCorrectOldPassword(password) : SetCorrectNewPassword(password);
          resetForm();
        } catch (error) {
          SetSuccess(false);
          SetModal(true);
          settitle("")
          SetContent('Ошибка сервера');
          console.log("error",error);
        }
      });
  };

  return (
    <PersonalPageViews.ModalProfileViews title={title} closeModal={closeModal}>
      {!modal ? (
        <Formik
          enableReinitialize
          validationSchema={changePasswordSchema(errorsMessenge)}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, handleChange, values, errors, setFieldValue, touched }) => {
            return (
              <GxForm novalidate onGx-submit={handleSubmit}>
                <Input
                  value={values.currentPassword}
                  name={'currentPassword'}
                  onGx-input={(e) => {
                    handleChange(e);
                    if (correctOldPassword !== '') SetCorrectOldPassword('');
                  }}
                  variant={'largeCustomLabel'}
                  className={'input-mt_20'}
                  type={'password'}
                  // className={errors.currentPassword && touched.currentPassword ? 'error' : ''}
                  helpText={
                    errors.currentPassword ? (
                      <ErrorField message={errors.currentPassword} />
                    ) : correctOldPassword !== '' ? (
                      <ErrorField message={correctOldPassword} />
                    ) : null
                  }
                  label={Text({ text: 'current.password' })}
                  placeholder={Text({ text: 'current.password' })}
                />
                <Input
                  value={values.newPassword}
                  name={'newPassword'}
                  variant={'largeCustomLabel'}
                  className={'input-mt_20'}
                  type={'password'}
                  onGx-input={(e) => {
                    handleChange(e);
                    if (correctNewPassword !== '') SetCorrectNewPassword('');
                  }}
                  // className={errors.newPassword && touched.newPassword ? 'error' : ''}
                  helpText={
                    errors.newPassword ? (
                      <ErrorField message={errors.newPassword} />
                    ) : correctNewPassword !== '' ? (
                      <ErrorField message={correctNewPassword} />
                    ) : null
                  }
                  label={Text({ text: 'new.password' })}
                  placeholder={Text({ text: 'new.password' })}
                />
                <Input
                  value={values.confirmPassword}
                  name={'confirmPassword'}
                  onGx-input={handleChange}
                  variant={'largeCustomLabel'}
                  className={'input-mt_20'}
                  type={'password'}
                  // className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
                  helpText={
                    errors.confirmPassword ? <ErrorField message={errors.confirmPassword} /> : null
                  }
                  label={Text({ text: 'repeat.password' })}
                  placeholder={Text({ text: 'repeat.password' })}
                />
                <Button type={'submit'} variant={'black_btn_full_width'}>
                  изменить пароль
                </Button>
              </GxForm>
            );
          }}
        </Formik>
      ) : (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <ModalContentViews.SuccessOrError
                closeModal={closeModal}
                success={success}
                content={content}
              />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      )}
    </PersonalPageViews.ModalProfileViews>
  );
};
export default React.memo(ModalChangePassword);
