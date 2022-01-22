import React, { useEffect, useState } from 'react';
import { GxRow, GxForm } from '@garpix/garpix-web-components-react';
import AuthorizationAndRegViews from '../../Views/AuthorizationAndRegViews';
import ModalContentViews from '../../Views/ModalContentViews';
import { Formik, ErrorMessage } from 'formik';
import Grid from '../../Views/Grid';
import Coll from '../../Views/Coll';
import api from '../../api';
import Input from '../../Views/Input';
import ErrorField from '../../Views/ErrorField';
import Button from '../../Views/Button';
import CheckBox from '../../Views/CheckBox';
import Text from '../Text';
import { withRouter } from 'react-router-dom';
import { signInSchemaByUsername } from '../../utils/schemesFormic';
import { serializeErrorResponse } from '../../utils/serializers';
import RestorePasswordSetPassword from './RestorePasswordSetPassword';
import ModalRestorePassword from './ModalRestorePassword';
import ModalNewPassword from './ModalNewPassword';
import ModalSubmitCode from './ModalSubmitCode';

const apiUser = api.userApi;
const initialState = {
  step: 0,
  allSteps: 3,
};
const initialValues = {
  id: '',
  is_active: false,
  last_name: '',
  first_name: '',
  middle_name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  submitCode: '',
  confirm_password: '',
};

const Authorization = ({ history, site_configuration, setModalStates }) => {
  const [serverError, setServerError] = useState('');
  const [state, setState] = useState(initialState);
  const [values, setValues] = useState(initialValues);
  const { page_type_reg, page_type_catalog } = site_configuration;

  const errorsMessenge = {
    longUsername: 'Слишком длинный никнейм',
    notValidPass: Text({ text: 'notValidPass' }),
    shortPass: Text({ text: 'shortPass' }),
    longPass: Text({ text: 'longPass' }),
    requiredField: Text({ text: 'requiredField' }),
    invalidAuthData: Text({ text: 'invalid.auth.data' }),
  };
  const onSaveFormData = (data, callbacks = {}) => {
    setValues(data);
    setNextStep();
  };
  const setNextStep = () => {
    setState((prevState) => ({ ...prevState, step: prevState.step + 1 }));
  };
  const closeModal = () => {
    setState(initialState);
    setModalStates({
      content: null,
      show: false,
    });
  };
  const openModalFinallyRestorePassword = (data) => {
    return setModalStates({
      content: (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={() => closeModal(data)} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <ModalContentViews.SuccessOrError
                closeModal={() => closeModal(data)}
                success={data}
                content={data ? 'Ваш пароль успешно изменен' : 'Ошибка при смене пароля'}
              />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      ),
      show: true,
      addClass: 'modal-success_error',
    });
  };

  const openModalRestorePassword = () => {
    setModalStates({
      content: (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.CenterPosition>
            <ModalContentViews.ContentBlock>
              {
                {
                  0: (
                    <ModalRestorePassword setNextStep={setNextStep} initialValues={initialValues} />
                  ),
                  1: <ModalSubmitCode setNextStep={setNextStep} initialValues={initialValues} />,
                  2: (
                    <ModalNewPassword
                      onSaveFormData={onSaveFormData}
                      initialValues={initialValues}
                      openModalFinallyRestorePassword={openModalFinallyRestorePassword}
                    />
                  ),
                }[state.step]
              }
            </ModalContentViews.ContentBlock>
          </ModalContentViews.CenterPosition>
        </ModalContentViews.ModalWrapper>
      ),
      show: true,
      addClass: 'modal-reset-password',
    });
  };

  const onSubmit = (data, { setFieldError }) => {
    apiUser
      .loginByUsername(
        {
          username: data.username,
          password: data.password,
        },
        data.remember,
      )
      .then((res) => {
        window.location.href = page_type_catalog;
      })
      .catch((err) => {
        if (err.response) {
          setFieldError('serverError', errorsMessenge.invalidAuthData);
        }
      });
  };
  useEffect(() => {
    if (state.step === 0) return;
    openModalRestorePassword();
  }, [state.step]);
  return (
    <Grid>
      <GxRow>
        <Coll sizeLg={6} sizeMd={12} sizeSm={12} sizeXl={6} sizeXs={12}>
          <AuthorizationAndRegViews.LeftSide />
        </Coll>
        <Coll sizeLg={6} sizeMd={12} sizeSm={12} sizeXl={6} sizeXs={12}>
          <AuthorizationAndRegViews.RightSide>
            <AuthorizationAndRegViews.RegistrationBlock to={page_type_reg} />
            <AuthorizationAndRegViews.FormSingnIn>
              <Formik
                validationSchema={signInSchemaByUsername(errorsMessenge)}
                initialValues={{ username: '', password: '', remember: false }}
                onSubmit={onSubmit}
              >
                {({ handleSubmit, handleChange, values, errors, setFieldValue }) => {
                  return (
                    <GxForm noValidate onGx-submit={handleSubmit}>
                      <Input
                        value={values.username}
                        variant={'largeCustomLabel'}
                        className={'input-mt_20'}
                        name={'username'}
                        autocomplete={'off'}
                        onGx-input={handleChange}
                        data-cy={'authorization_username'}
                        label={Text({ text: 'username' })}
                        helpText={errors.username ? <ErrorField message={errors.username} /> : null}
                      />
                      <Input
                        type={'password'}
                        className={'input-mt_20'}
                        value={values.password}
                        variant={'largeCustomLabel'}
                        autocomplete={'off'}
                        name={'password'}
                        label={Text({ text: 'password' })}
                        data-cy={'authorization_password'}
                        onGx-input={handleChange}
                        helpText={errors.password ? <ErrorField message={errors.password} /> : null}
                      />
                      <AuthorizationAndRegViews.GroupBlock>
                        <CheckBox
                          checked={values.remember}
                          name={'remember'}
                          onGx-change={(e) => setFieldValue('remember', e.target.checked)}
                          label={Text({ text: 'remember' })}
                          data-cy={'authorization_check_box_remember'}
                        />
                        <Button
                          variant={'looksLikeLink'}
                          type={'button'}
                          onClick={openModalRestorePassword}
                          data-cy={'authorization_forgot_password'}
                        >
                          <Text text={'forgotYourPassword'} />
                        </Button>
                      </AuthorizationAndRegViews.GroupBlock>
                      <AuthorizationAndRegViews.ErrorBlock helpText={errors.serverError} />
                      <Button
                        variant={'black_btn_full_width'}
                        type={'submit'}
                        data-cy={'authorization_button'}
                      >
                        <Text text={'toComeIn'} />
                      </Button>
                    </GxForm>
                  );
                }}
              </Formik>
            </AuthorizationAndRegViews.FormSingnIn>
          </AuthorizationAndRegViews.RightSide>
        </Coll>
      </GxRow>
    </Grid>
  );
};

export default React.memo(withRouter(Authorization));
